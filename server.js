import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import cors from 'cors';
import orderController from "./routes/orderRoutes.js";
import likeRoutes from "./routes/likeRoute.js";
import masterRoutes from "./routes/masterRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import clubRoutes from "./routes/clubRoutes.js";
import courcesRoutes from "./routes/courcesRoutes.js";
import mongoose from "mongoose";
//import newsRoutes from "./routes/newsRoutes.js";
//import orderRoutes from "./routes/orderRoutes";
// import orderController from "./controllers/orderController.js";
// import orderController from "./controllers/orderController.js";

import payController from "./controllers/payController.js";
import { createOrder, getOrder, getOrders, getUserOder, updateOder } from "./controllers/orderController.js";
import upload from "./utils/multer.js";
//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express()

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/user', userRoutes);
//app.use('api/v1/news', newsRoutes);
//app.use('/api/v1/orders', orderRoutes);

app.use('/api/v1/master', masterRoutes);
app.use('/api/v1/service', serviceRoutes);
app.use('/api/v1/club', clubRoutes);
app.use('/api/v1/cource', courcesRoutes);
// app.use('/api/v1', emailRoutes);
// app.use('/api', courcesRoutes);



// app.use('/api/v1/like', likeProduct);
// app.use('/api/v1/orders', orderController);
app.post('/api/v1/orders', createOrder);
app.get('/api/v1/orders/:uid', getUserOder);
app.get('/api/v1/orders', getOrders);
app.get("/api/v1/orders/get/:id", getOrder);
app.put("/api/v1/orders/:id", updateOder);

app.post('/api/v1/orders/payment/momo', payController.momoMethod)
app.use('/api/v1/like', likeRoutes)

//rest api
app.get('/', (req, res) => {
    res.send("<h1>Hello, world!!! GUYS</h1>");
})

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on PORT ${PORT}`.bgCyan.white);
});

