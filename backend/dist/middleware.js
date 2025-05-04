"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = authentication;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "ajfldakaksfo";
function authentication(req, res, next) {
    const token = req.headers.token;
    const decodedData = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    if (decodedData) {
        //@ts-ignore
        req.id = decodedData.id;
        //@ts-ignore
        next();
    }
    else {
        res.status(400).json({
            message: "something went wrong"
        });
        return;
    }
}
