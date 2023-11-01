const express = require("express");
const app = express();
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {
  vendorRoutes,
  customerRoutes,
  vendorAuthRoutes,
  customerAuthRoutes,
  productRoutes,
  cartRoutes,
  homePageRoute,
  orderRoutes,
  categoryRoutes,
} = require("./routes");

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static("uploads"));

const verifyJwt = require("./middlewares/verifyJWT");
const handler404 = require("./middlewares/404handler");

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Bajabazaar API",
  });
});

app.use("/api/v1/home", homePageRoute);
app.use("/api/v1/vendor-auth", vendorAuthRoutes);
app.use("/api/v1/customer-auth", customerAuthRoutes);
app.use("/api/v1/category", categoryRoutes);

app.use(verifyJwt);

app.use("/api/v1/vendor", vendorRoutes);
app.use("/api/v1/customer", customerRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use(errorHandler);
app.use("*", handler404);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
