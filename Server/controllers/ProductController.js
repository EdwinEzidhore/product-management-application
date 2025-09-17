import { Category, SubCategory, Variant } from '../models/Product.js';

export const createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;

        if (!categoryName) {
            return res.status(400).json({ success: false, message: "Category name is required" });
        }

        const isCategoryExist = await Category.find({ name: categoryName });
        // console.log(isCategoryExist);

        if (isCategoryExist.length > 0) {
            return res.status(400).json({ success: false, message: "Category already exists" });
        }

        const newCategory = Category.create({ name: categoryName });
        if (!newCategory) {
            return res.status(500).json({ success: false, message: "Failed to create category" });
        }

        return res.status(200).json({ success: true, message: "Category added successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).populate({
            path: "subCategories",
            select: "name",
        });

        return res.status(200).json({ success: true, categories });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


export const createSubCategory = async (req, res) => {
    try {
        const { categoryId, sub_categoryName } = req.body;

        if (!categoryId || !sub_categoryName) {
            return res.status(400).json({ success: false, message: "Fields are required" });
        }

        const category = await Category.findById({ _id: categoryId });

        if (category.length === 0) {
            return res.status(404).json({ success: false, message: "No such Category found!" })
        }

        const isSubCategoryExists = await SubCategory.findOne({ name: sub_categoryName });
        if (isSubCategoryExists) {
            return res.status(409).json({ success: false, message: "Sub Category already exists!" });
        }

        const newSubCategory = await SubCategory.create({ name: sub_categoryName });

        if (!newSubCategory) {
            return res.status(400).json({ success: false, message: "Sub Category creation failed!" });
        }

        category.subCategories.push(newSubCategory._id);
        await category.save();

        return res.status(201).json({ success: true, message: `Sub category created for category : ${category.name}` });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


export const getSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find({});
        return res.status(200).json({ success: true, subCategories });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
}


export const addProduct = async (req, res) => {

    try {
        const { title, description, subCategory, variants } = req.body;
        console.log(req.body);

        if (!variants[0].ram || !variants[0].price || !variants[0].quantity) {
            return res.status(400).json({ message: "At least one variant is required" });
        }


        // check if the subcategory exists
        const sub_Category = await SubCategory.findById({ _id: subCategory });

        if (!sub_Category) {
            return res.status(404).json({ success: false, message: "Invalid sub category name" })
        }

        const createdVariants = await Variant.insertMany(
            variants.map(v => ({
                name: title,
                description,
                ram: v.ram,
                price: v.price,
                quantity: v.quantity
            }))
        );

        if (createdVariants) {
            sub_Category.variants.push(...createdVariants.map(v => v._id));
            await sub_Category.save();

            return res.status(201).json({
                success: true,
                message: "Product  added successfully",
            });
        }

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


export const getProducts = async (req, res) => {
    try {
        // nested populating the sub categories and variants data
        const products = await Category.find({})
            .populate({
                path: "subCategories",
                select: "name variants",
                populate: {
                    path: "variants",
                }
            });

        if (products) {
            res.status(200).json({ success: true, message: "products fetched", products });
        }

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}