import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../model/userModel.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  //read jwt from 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized, Token Failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, No Token.");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not Authorized as an Admin." });
  }
};
export { authenticate, authorizeAdmin };
