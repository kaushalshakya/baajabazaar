const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const {
    vendorRoutes,
    customerRoutes,
    vendorAuthRoutes
} = require('./routes');

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) =>{
    res.status(200).json(
        {
            status: 200,
            message: 'Bajabazaar API'
        }
    )
})

app.use('/api/v1/vendor', vendorRoutes);
app.use('/api/v1/customer', customerRoutes);
app.use('/api/v1/vendor-auth', vendorAuthRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})