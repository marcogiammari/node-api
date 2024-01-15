import prisma from "../db";

// Get all
export const getProducts = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
		include: {
			products: true,
		},
	});

	res.json({ data: user.products });
};

export const getOneProduct = async (req, res) => {
	const id = req.params.id;
	const product = await prisma.product.findUnique({
		where: {
			id,
			belongsToId: req.user.id,
		},
	});

	res.json({ data: product });
};
