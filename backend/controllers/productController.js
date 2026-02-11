import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../model/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
  const { name, description, brand, price, category, quantity } = req.fields;

  try {
    switch (true) {
      case !name:
        return res.status(400).json({ message: "Name is required." });
      case !description:
        return res.status(400).json({ message: "Description is required." });
      case !brand:
        return res.status(400).json({ message: "Brand is required." });
      case !price:
        return res.status(400).json({ message: "Price is required." });
      case !category:
        return res.status(400).json({ message: "Category is required." });
      case !quantity:
        return res.status(400).json({ message: "Quantity is required." });
    }
    const product = new Product({ ...req.fields });
    await product.save();
    res.status(201).json({ message: "Product Added Successfully.", product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.fields, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Product Updated Successfully.", product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "Product Deleted Successfully.", product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);
    if (products) {
      res.status(200).json({
        message: "Products Fetched Successfully.",
        products,
        page: 1,
        pages: Math.ceil(count / pageSize),
        hasMore: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res
        .status(200)
        .json({ message: "Product Fetched Successfully.", product });
    } else {
      return res.status(404).json({ message: "Product Not Found." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    if (products) {
      return res
        .status(200)
        .json({ message: "Products Fetched Successfully.", products });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    if (!rating) {
      return res.status(400).json({ message: "Rating is required" });
    }

    if (!comment) {
      return res.status(400).json({ message: "Comment is required" });
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString(),
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "Product already reviewed" });
    }

    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    return res.status(201).json({ message: "Review Added", review });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    if (products) {
      return res
        .status(200)
        .json({ message: "Products Fetched Successfully.", products });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }).limit(5);
    if (products) {
      return res
        .status(200)
        .json({ message: "Products Fetched Successfully.", products });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};

    if (checked.length > 0) {
      args.category = checked;
    }

    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }

    const products = await Product.find(args);

    if (products) {
      return res
        .status(200)
        .json({ message: "Products Fetched Successfully.", products });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
};
