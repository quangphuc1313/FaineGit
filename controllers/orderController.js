import mongoose from "mongoose";

import orderModel from "../models/orderModel.js";

// const orderSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'users',
//         required: true
//     },
//     products: [
//         {
//             product: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'Product',
//                 required: true
//             },
//             quantity: {
//                 type: Number,
//                 required: true
//             }
//         }
//     ],
//     totalAmount: {
//         type: Number,
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
//         default: 'Pending'
//     },
//     address: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// const orderModel = mongoose.model('Order', orderSchema)



export const createOrder = async (req, res) => {
    try {
        const order = await orderModel.create(req.body);
        return res.status(201).json(order);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Không tạo được đơn hàng' });
    }
}

export const getUserOder = async (req, res) => {
    try {
        const orders = await orderModel.find({ user: req.params.uid })
        return res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const getOrder = async (req, res) => {
    try {
        const orders = await orderModel.findById(req.params.id).populate('products.product')
        return res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate('user')
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}
export const updateOder = async (req, res) => {
    try {
        const orders = await orderModel.findByIdAndUpdate(req.params.id, {
            status: req.body.status
        })
        return res.status(200).json(true)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const order = await Order.findById(orderId);
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;

        await order.save();

        // Cập nhật khóa học của người dùng nếu đơn hàng được giao thành công
        if (status === 'Delivered') {
            await order.updateUserCources();
        }

        res.status(200).json({ message: "Order status updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// export default orderController

// export const getOrderById = async (req, res) => {
//     // Lấy thông tin đơn hàng theo ID
//     try {
//         const order = await orderModel.findById(req.params.orderId).populate('user products.product');
//         if (!order) {
//             return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
//         }
//         return res.status(200).json(order);
//     } catch (error) {
//         return res.status(500).json({ error: 'Không nhận được đơn hàng' });
//     }
// };

// export const getAllOrders = async (req, res) => {
//     // Lấy danh sách tất cả đơn hàng
//     try {
//         const orders = await orderModel.find().populate('user products.product');
//         return res.status(200).json(orders);
//     } catch (error) {
//         return res.status(500).json({ error: 'Không nhận được đơn đặt hàng' });
//     }
// };

// export const updateOrderStatus = async (req, res) => {
//     // Cập nhật trạng thái của đơn hàng
//     try {
//         const order = await orderModel.findByIdAndUpdate(
//             req.params.orderId,
//             { $set: { status: req.body.status } },
//             { new: true }
//         );
//         if (!order) {
//             return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
//         }
//         return res.status(200).json(order);
//     } catch (error) {
//         return res.status(500).json({ error: 'Không cập nhật được trạng thái đơn hàng' });
//     }
// };
