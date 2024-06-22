import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: "Yêu Cầu Điền Tên" });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Danh Mục Đã Tồn Tại",
            });
        }
        const category = await new categoryModel({ name, slug: slugify(name), }).save()
        res.status(201).send({
            success: true,
            message: "Danh Mục Mới Được Tạo",
            category,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Lỗi Trong Danh Mục',
        });
    }
};

//update category
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            messsage: "Danh mục được cập nhật thành công",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Lỗi khi cập nhật danh mục",
        });
    }
};

// get all cat
export const categoryControlller = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "Tất cả danh sách danh mục",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Lỗi khi tải tất cả các danh mục",
        });
    }
};

// single category
export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Nhận danh mục đơn thành công",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Lỗi khi nhận được một danh mục",
        });
    }
};

//delete category
export const deleteCategoryCOntroller = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Danh mục đã được xóa thành công",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "lỗi khi xóa danh mục",
            error,
        });
    }
};