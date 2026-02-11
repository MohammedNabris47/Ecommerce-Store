import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../model/categoryModel.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(401).json({ message: "Name is required." });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(404).json({ message: "Category Name Already Exists." });
    }

    const category = await new Category({ name }).save();
    return res
      .status(201)
      .json({ message: "Category Added Successfully.", category });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      req.body,
      { new: true },
    );

    return res
      .status(200)
      .json({ message: "Category Updated Successfully.", updatedCategory });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

const removeCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.categoryId);
    return res
      .status(200)
      .json({ message: "Category Deleted Successfully.", category });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    return res
      .status(200)
      .json({ message: "Categories Fetched Successfully", categories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    return res
      .status(200)
      .json({ message: "Category Fetched Successfully.", category });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});
export {
  createCategory,
  updateCategory,
  removeCategory,
  getAllCategories,
  readCategory,
};
