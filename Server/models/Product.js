import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  ram: String,
  
});

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required:true,
    set: (value) => value.toLowerCase()
  },
  variants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Variant" }],
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, set: (value) => value.toLowerCase() },
  subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }],
});

export const Variant = mongoose.model("Variant", variantSchema);
export const SubCategory = mongoose.model("SubCategory", subCategorySchema);
export const Category = mongoose.model("Category", categorySchema);
