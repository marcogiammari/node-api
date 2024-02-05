import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { addProduct, addProducts, deleteProduct, getOneProduct, getProducts, updateProduct } from "./handlers/product";
import { createUpdate, getOneUpdate, getUpdates } from "./handlers/update";

const router = Router();

/**
 * Product
 */

router.get("/products", getProducts);

router.get("/product/:id", getOneProduct);

router.put(
	"/product/:id",
	body("name").isString(),
	handleInputErrors,
	updateProduct
);

router.post(
	"/product",
	body("name").isString(),
	body("description").optional().isString(),
	handleInputErrors,
	addProduct
);

router.post(
	"/products",
	body('products').isArray(),
	body('products.*.name').isString(),
	handleInputErrors,
	addProducts
)

router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/updates", getUpdates);

router.get("/update/:id", getOneUpdate);

router.put(
	"/update/:id",
	body("title").optional(),
	body("body").optional(),
	body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
	body("version").optional(),
	handleInputErrors,
	// updateUpdate
);

router.post(
	"/update",
	body("title").exists().isString(),
	body("body").exists().isString(),
	createUpdate
);

router.delete("/update/:id", () => {});

/**
 * Update Point
 */

router.get("/updatepoints", () => {});

router.get("/updatepoint/:id", () => {});

router.put(
	"/updatepoint/:id",
	body("name").optional().isString(),
	body("description").optional().isString(),
	() => {}
);

router.post(
	"/updatepoint",
	body("name").exists().isString(),
	body("description").exists().isString(),
	body("updateId").exists().isString(),
	() => {}
);

router.delete("/updatepoint/:id", () => {});

export default router;
