"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const zod_1 = __importStar(require("zod"));
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("./middleware");
const JWT_SECRET = "ajfldakaksfo";
const multer_1 = __importDefault(require("multer"));
const util_1 = require("./util");
exports.userRouter = (0, express_1.Router)();
const requestBody = zod_1.default.object({
    username: (0, zod_1.string)().min(4).max(8),
    email: (0, zod_1.string)().email(),
    password: (0, zod_1.string)().min(4)
});
exports.userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const inputValidation = requestBody.safeParse(req.body);
    if (!inputValidation.success) {
        res.status(400).json({
            message: "invalid input format",
            error: inputValidation.error
        });
        return;
    }
    const user = yield db_1.userModel.findOne({
        uername: username
    });
    if (user) {
        res.status(400).json({
            message: "user already exsist"
        });
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 5);
    try {
        yield db_1.userModel.create({
            uername: username,
            email: email,
            password: hashedPassword
        });
        res.status(200).json({
            message: "you signed up successfully"
        });
    }
    catch (e) {
        res.status(400).json({
            message: "something went wrong"
        });
    }
}));
exports.userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const user = yield db_1.userModel.findOne({
        uername: username
    });
    if (!user) {
        res.status(400).json({
            message: "user do not exist"
        });
        return;
    }
    try {
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, JWT_SECRET);
        res.status(200).json({
            message: "you successfully signed in",
            token: token
        });
    }
    catch (e) {
        res.status(400).json({
            message: "something went wrong"
        });
    }
}));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        console.log(file);
        return cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        return cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
exports.userRouter.post("/shop", middleware_1.authentication, upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { shopname, address, description, category } = req.body;
    let newadress = JSON.parse(address);
    const response = yield fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${newadress.latitude}&lon=${newadress.longitude}`);
    const data = yield response.json();
    const file = req.file;
    //@ts-ignore
    const userId = req.id;
    const user = yield db_1.userModel.findOne({
        _id: userId
    });
    if (!user) {
        res.status(400).json({
            message: "please login"
        });
        return;
    }
    try {
        yield db_1.shopModel.create({
            shopName: shopname,
            address: data.display_name,
            latitude: newadress.latitude,
            longitude: newadress.longitude,
            description: description,
            image: file === null || file === void 0 ? void 0 : file.originalname,
            category: category,
            userId: userId
        });
        res.status(200).json({
            message: "you successfully opned the shop"
        });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            message: "something went wrong"
        });
        return;
    }
}));
exports.userRouter.get('/shop', middleware_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shop = yield db_1.shopModel.find({});
        res.status(200).json({
            shop: shop
        });
    }
    catch (e) {
        res.status(400).json({
            message: "something went wrong"
        });
    }
}));
exports.userRouter.post("/additems/:id", middleware_1.authentication, upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shopId = req.params.id;
    const itemInfo = req.body;
    const image = req.file;
    try {
        yield db_1.productModel.create({
            name: itemInfo.name,
            photo: image === null || image === void 0 ? void 0 : image.originalname,
            price: itemInfo.price,
            details: itemInfo.description,
            shopId: shopId
        });
        res.status(200).json({
            message: "item added successfully"
        });
    }
    catch (e) {
        res.status(400).json({
            message: "something went wrong",
        });
    }
}));
exports.userRouter.get("/viewitems/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shopId = req.params.id;
    try {
        const items = yield db_1.productModel.find({
            shopId: shopId
        });
        console.log(items);
        res.status(200).json({
            message: "item fetched successfully",
            items: items
        });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            message: "something went wrong"
        });
    }
}));
exports.userRouter.post("/searchItem", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { currentLocation, viewitem } = req.body;
        try {
            let availableProduct = yield db_1.productModel.find({
                name: { $regex: viewitem, $options: 'i' } // 'i' for case-insensitive
            });
            let shops = [];
            for (const item of availableProduct) {
                let shop = yield db_1.shopModel.findOne({
                    _id: item.shopId
                });
                shops.push(shop);
            }
            let newShop = [];
            for (const shop of shops) {
                //@ts-ignore
                let distance = (0, util_1.getDistanceInMeters)(shop === null || shop === void 0 ? void 0 : shop.latitude, shop === null || shop === void 0 ? void 0 : shop.longitude, currentLocation.latitude, currentLocation.longitude);
                console.log(distance);
                if (distance < 102) {
                    newShop.push(shop);
                }
            }
            console.log(newShop);
            res.status(200).json({
                shops: newShop,
            });
        }
        catch (error) {
            console.log(error);
        }
    });
});
