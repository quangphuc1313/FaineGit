import userModel from "../models/userModel.js";
import slugify from "slugify";

//update user
export const updateUserController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const users = await userModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        res.status(200).send({
            success: true,
            messsage: "Người dùng được cập nhật thành công",
            users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Lỗi khi cập nhật người dùng",
        });
    }
};

// get all User
export const userController = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).send({
            success: true,
            message: "Tất cả danh sách người dùng",
            users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Lỗi khi tải tất cả người dùng",
        });
    }
};

//delete user
export const deleteUserCOntroller = async (req, res) => {
    try {
        const { id } = req.params;
        await userModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Người dùng đã được xóa thành công",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "lỗi khi xóa Người dùng",
            error,
        });
    }
};

export default userController;