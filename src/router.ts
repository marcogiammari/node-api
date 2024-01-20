import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { createProduct, getOneProduct, getProducts } from "./handlers/product";

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
	(req, res) => {}
);

router.post(
	"/product",
	body("name").isString(),
	handleInputErrors,
	createProduct
);

router.delete("/product/:id", () => {});

/**
 * Update
 */

router.get("/updates", () => {});

router.get("/update/:id", () => {});

router.put(
	"/update/:id",
	body("title").optional(),
	body("body").optional(),
	body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
	body("version").optional(),
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400);
			res.json({ errors: errors.array() });
		}
	}
);

router.post(
	"/update",
	body("title").exists().isString(),
	body("body").exists().isString(),
	() => {}
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
