import productModel from "../models/productModel.js";
import categoryModel from '../models/categoryModel.js';
import fs from "fs";
import slugify from "slugify";
import unidecode from "unidecode";

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        //alidation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Tên là bắt buộc" });
            case !description:
                return res.status(500).send({ error: "Mô tả là bắt buộc" });
            case !price:
                return res.status(500).send({ error: "Giá là bắt buộc" });
            case !category:
                return res.status(500).send({ error: "Danh mục là bắt buộc" });
            case !quantity:
                return res.status(500).send({ error: "Số lượng là bắt buộc" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "ảnh bắt buộc phải nhỏ hơn 1Mb" });
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Sản phẩm được tạo thành công",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Lỗi khi tạo sản phẩm",
        });
    }
};

//get all products
export const getProductController = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .populate("category")
            .select("-photo")
            .sort({ createdAt: -1 });


        const productUpdated = products.map(product => ({
            ...product.toObject(),
            imageUrl: `/api/v1/product/product-photo/${product._id}`
        })); res.status(200).send({
            success: true,
            counTotal: products.length,
            message: "ALLProducts ",
            products: productUpdated,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Lỗi khi nhận sản phẩm",
            error: error.message,
        });
    }
};
// get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Sản phẩm duy nhất đã được truy xuất",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Lỗi khi nhận một sản phẩm",
            error,
        });
    }
};

// get photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Lỗi khi tải ảnh",
            error,
        });
    }
};

//delete controller
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Sản phẩm đã được xóa thành công",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Lỗi khi xóa sản phẩm",
            error,
        });
    }
};

//upate product
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        //alidation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Tên là bắt buộc" });
            case !description:
                return res.status(500).send({ error: "Mô tả là bắt buộc" });
            case !price:
                return res.status(500).send({ error: "Giá là bắt buộc" });
            case !category:
                return res.status(500).send({ error: "Danh mục là bắt buộc" });
            case !quantity:
                return res.status(500).send({ error: "Số lượng là bắt buộc" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "bắt buộc ảnh phải nhỏ hơn 1mb" });
        }

        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Sản phẩm được cập nhật thành công",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Lỗi cập nhật sản phẩm",
        });
    }
};

export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Lỗi khi lọc sản phẩm",
            error,
        });
    }
};

// product count
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Lỗi đếm sản phẩm",
            error,
            success: false,
        });
    }
};

// product list base on page
export const productListController = async (req, res) => {
    try {
        const perPage = 12;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "lỗi trên mỗi trang",
            error,
        });
    }
};

// search product
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;

        // Tạo một biến để chứa cả từ khóa có dấu và không dấu
        const unaccentedKeyword = removeDiacritics(keyword);

        const resutls = await productModel
            .find({
                $or: [
                    // Tìm kiếm theo từ khóa có dấu
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                    // Tìm kiếm theo từ khóa không dấu
                    { unaccentedName: { $regex: unaccentedKeyword, $options: "i" } },
                    { unaccentedDescription: { $regex: unaccentedKeyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(resutls);
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Lỗi khi tìm kiếm API sản phẩm",
            error,
        });
    }
};

// Hàm loại bỏ dấu
function removeDiacritics(str) {
    return unidecode(str);
}

// similar products
export const realtedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel
            .find({
                category: cid,
                _id: { $ne: pid },
            })
            .select("-photo")
            .limit(4)
            .populate("category");
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "lỗi khi nhận sản phẩm liên quan",
            error,
        });
    }
};

// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category }).populate("category");
        res.status(200).send({
            success: true,
            category,
            products,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error,
            message: "Lỗi khi lấy sản phẩm",
        });
    }
};

export const getProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}