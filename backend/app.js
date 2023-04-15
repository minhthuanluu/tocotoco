const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler')

app.use(cors());
app.options('*', cors())

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const cartsRoutes = require('./routes/carts');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');
const router = express.Router();

const api = process.env.API_URL;

app.use(cors());
app.options('*', cors());
app.use(cors({ origin: true, credentials: true }));
//middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('tiny'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

app.get("/", (req, res) => {
    res.send("Toco Toco API");
});

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/carts`, cartsRoutes);
app.use(`${api}/orders`, ordersRoutes);
// app.use(authJwt());
app.use((err, req, res, next) => errorHandler(err, req, res, next))


//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'tocotoco'
})
    .then(() => {
        console.log('Database Connection is ready...')
    })
    .catch((err) => {

    })

//Server
app.listen(3000, () => {
    console.log('server is running http://localhost:3000');
})