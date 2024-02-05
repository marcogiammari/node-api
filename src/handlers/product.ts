import prisma from "../db";

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

export const addProduct = async (req, res) => {

	const existingProduct = await prisma.product.findFirst({
		where: {
			name: req.body.name,
			belongsToId: req.user.id
		}
	})

	if (existingProduct) {
		const updatedProduct = await prisma.product.update({
			where: {
				id: existingProduct.id
			},
			data: {
				quantity: {
					increment: 1
				}
			},
		})
		res.json({ data: updatedProduct })
	} else {
		const product = await prisma.product.create({
			data: {
				name: req.body.name,
				description: req.body.description,
				belongsToId: req.user.id,
			}
		})
		res.json({ data: product })
	}

}

export const addProducts = async (req, res) => {
	const productsWithId = req.body.products.map((product) => ({
			...product,
			belongsToId: req.user.id
		})
	)
	const products = await prisma.product.createMany({
		data: productsWithId
	})
	res.json({ data: products })
}

export const updateProduct = async (req, res) => {
	const updated = await prisma.product.update({
		where: {
			id: req.params.id,
		},
		data: {
			name: req.body.name,
			description: req.body.description,
			quantity: req.body.quantity
		}
	})

	res.json({ data: updated })
}

export const deleteProduct = async (req, res) => {
	const deleted = await prisma.product.delete({
		where: {
			id: req.params.id,
		}
	})

	res.json({ data: deleted })
}