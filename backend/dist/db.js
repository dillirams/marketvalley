"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviwModel = exports.productModel = exports.shopModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const userSchema = new mongoose_2.Schema({
    uername: String,
    email: String,
    password: String,
    profile: String,
    phonenumber: Number,
    address: String,
    document: String,
});
const shopSchema = new mongoose_2.Schema({
    shopName: String,
    address: String,
    description: String,
    image: String,
    category: String,
    userId: { type: mongoose_1.default.Schema.ObjectId, ref: "user" }
});
const productSchema = new mongoose_2.Schema({
    name: String,
    photo: String,
    price: Number,
    details: String,
    shopId: { type: mongoose_1.default.Schema.ObjectId, ref: "shop" }
});
const reviewSchema = new mongoose_2.Schema({
    name: String,
    review: String,
    date: Date,
    productId: { type: mongoose_1.default.Schema.ObjectId, ref: "product" }
});
exports.userModel = mongoose_1.default.model("user", userSchema);
exports.shopModel = mongoose_1.default.model("shop", shopSchema);
exports.productModel = mongoose_1.default.model("product", productSchema);
exports.reviwModel = mongoose_1.default.model("review", reviewSchema);
