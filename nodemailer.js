const nodemailer = require('nodemailer');
require('dotenv').config();

const testAccount = nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // Use SSL/TLS
    auth: {
        user: 'miguel62@ethereal.email',
        pass: 'm7pN3Ve3nufaKxdUNp'
    }
});

module.exports = transporter