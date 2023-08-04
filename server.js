const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const {
    vendorRoutes,
    customerRoutes,
    vendorAuthRoutes,
    customerAuthRoutes
} = require('./routes');

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
const verifyJwt = require('./middlewares/verifyJWT');

app.get('/', (req, res) =>{
    res.status(200).json(
        {
            status: 200,
            message: 'Bajabazaar API'
        }
    )
})
app.use('/api/v1/vendor-auth', vendorAuthRoutes);
app.use('/api/v1/customer-auth', customerAuthRoutes);

app.use(verifyJwt);

app.use('/api/v1/vendor', vendorRoutes);
app.use('/api/v1/customer', customerRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})