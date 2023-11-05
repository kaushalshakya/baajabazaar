const {
  loginModel,
  setRefreshToken,
  logoutModel,
  registerModel,
} = require("../../models/auth/customerAuthModels");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const registerCustomer = asyncHandler(async (req, res) => {
  const image = req.file;
  const password = req.body.password;
  const confirmPassword = req.body.confirm_password;

  if (password !== confirmPassword) {
    return res.status(400).json({
      status: 400,
      message: "Password and confirm password fields do not match",
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const data = {
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    contact: req.body.contact,
    password: hash,
    image: image ? image.filename : null,
    role_id: 1,
  };

  const result = await registerModel(data);

  return res.status(200).json({
    status: 200,
    message: "Customer registered successfully",
  });
});

const customerLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Email and password is necessary for login",
    });
  }
  const response = await loginModel(email, password);
  if (!response) {
    return res.status(400).json({
      status: 400,
      message: "User does not exist",
    });
  }

  const dbPassword = response.password;

  if (!bcrypt.compareSync(password, dbPassword)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid credentials",
    });
  }

  const accessToken = jwt.sign(
    {
      email: response.email,
      contact: response.contact,
      firstName: response.first_name,
      role: response.role_id,
      id: response.id,
    },
    process.env.ACCESS_TOKEN
    // {expiresIn: 15s}
  );

  const refreshToken = jwt.sign(
    {
      email: response.email,
      contact: response.contact,
      firstName: response.first_name,
      role: response.role_id,
      id: response.id,
    },
    process.env.REFRESH_TOKEN
    // {expiresIn: 15m}
  );

  res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });

  setRefreshToken(email, refreshToken);

  return res.status(200).json({
    status: 200,
    message: "Logged In successfully!",
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
});

const customerLogout = asyncHandler(async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(400).json({
        status: 400,
        message: "Token expired or tampered",
      });
    }
    console.log(decoded);
    logoutModel(decoded.email);

    res.cookie("accessToken", "", { expires: new Date(0) });
    res.cookie("refreshToken", "", { expires: new Date(0) });

    return res.json({
      status: 400,
      message: "Logged out successfully",
    });
  });
});

module.exports = {
  customerLogin,
  customerLogout,
  registerCustomer,
};
