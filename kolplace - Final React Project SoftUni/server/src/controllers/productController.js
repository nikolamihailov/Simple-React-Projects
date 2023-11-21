const productController = require("express").Router();
const { isAdmin } = require("../middlewares/isAdmin");
const productService = require("../services/productService");
const { extractErrors } = require("../utils/errParse");

const ITEMS_PER_PAGE = 8;


productController.get("/products", async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        if (Object.keys(req.query).length > 0) {
            const { page, filter, category } = req.query;
            const data = await productService.getAllWithFilters(ITEMS_PER_PAGE, page, filter, category);
            res.status(200).json(data);
        } else {
            const allProducts = await categoryService.getAllCategories();
            res.status(200).json(allProducts);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

productController.get("/products/:id", async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const product = await productService.getOneProduct(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});

productController.post("/products", isAdmin, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        let { promoPrice, ...body } = req.body;
        if (promoPrice) body.promoPrice = promoPrice;
        body.price = Number(body.price);
        const newProduct = await productService.addProduct(body);
        res.status(201).json(newProduct);
    } catch (error) {
        let errors = extractErrors(error);
        errors = errors.filter(e => e.includes("E11000") ? "" : e);
        if (error.code === 11000) {
            errors.push('Category with this name already exists!');
        }
        res.status(400).json({ errors });
    }
});

productController.put("/products/:id", isAdmin, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        let { promoPrice, ...body } = req.body;
        if (promoPrice) body.promoPrice = Number(promoPrice);
        body.price = Number(body.price);
        if (body.promoPrice >= body.price) throw new Error("Promo price must be a positive number and lower than the regular price!");
        const updatedProduct = await productService.editProduct(req.params.id, body);
        console.log(updatedProduct);
        res.status(200).json(updatedProduct);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});

productController.delete("/products/:id", isAdmin, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const deletedProduct = await productService.deleteProduct(req.params.id);
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




module.exports = productController;