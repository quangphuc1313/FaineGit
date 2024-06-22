import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
//import { compare } from "bcrypt";


export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        //validations
        if (!name) {
            return res.send({ message: 'Yêu cầu nhập tên' })
        }
        if (!email) {
            return res.send({ message: 'Yêu cầu nhập email' })
        }
        if (!password) {
            return res.send({ message: 'Yêu cầu nhập mật khẩu' })
        }
        if (!phone) {
            return res.send({ message: 'Yêu cầu nhập số điện thoại' })
        }
        if (!address) {
            return res.send({ message: 'Yêu cầu nhập địa chỉ' })
        }
        if (!answer) {
            return res.send({ message: 'Yêu cầu nhập câu trả lời' })
        }
        //check user
        const exisitingUser = await userModel.findOne({ email })
        //exisiting user
        if (exisitingUser) {
            return res.status(200).send({
                success: true,
                message: 'Đã đăng ký vui lòng đăng nhập',
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword, answer }).save();

        res.status(201).send({
            success: true,
            message: 'Người dùng đăng ký thành công',
            user,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Lỗi khi đăng ký',
            error,
        })
    }
};

//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'email hoặc mật khẩu không hợp lệ',
            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return response.status(404).send({
                success: false,
                message: 'Email không được đăng ký',
            });
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'mật khẩu không hợp lệ'
            });
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "Đăng nhập thành công",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'đăng nhập thất bại',
            error,
        });
    }
};

//forgot password controller
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body
        if (!email) {
            res.status(400).send({ message: 'Yêu cầu nhập Email' });
        }
        if (!answer) {
            res.status(400).send({ message: 'Yêu cầu nhập câu trả lời' });
        }
        if (!newPassword) {
            res.status(400).send({ message: 'Yêu cầu nhập mật khẩu mới' });
        }
        //check
        const user = await userModel.findOne({ email, answer })
        //validate
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'Câu trả lời hoặc Email không chính xác'
            })
        }

        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: 'Đặt lại mật khẩu thành công',
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Đã xảy ra sự cố',
            error,
        })
    }
};

//test controller
export const testController = (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};

//update prfole
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Mật khẩu phải dài 6 kí tự " });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Hồ sơ được cập nhật thành công",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Lỗi khi cập nhật hồ sơ",
            error,
        });
    }
};