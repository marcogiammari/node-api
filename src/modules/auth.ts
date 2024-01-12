import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = (password, hashedPassword) => {
	return bcrypt.compare(password, hashedPassword);
};

export const hashPassword = (password) => {
	// 5 is the salt, meaning how many times the password is hashed
	return bcrypt.hash(password, 5);
};

export const createJWT = (user) => {
	const token = jwt.sign(
		{ id: user.id, username: user.username },
		process.env.JWT_SECRET
	);
	return token;
};

export const protect = (req, res, next) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		res.status(401);
		res.json({ message: "Not authorized" });
		return;
	}

	const [, token] = bearer.split(" "); // Bearer <token>

	if (!token) {
		res.status(401);
		res.json({ message: "Not valid token" });
		return;
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		// attach user to request for future routes
		req.user = user;
		next();
	} catch (e) {
		console.error(e);
		res.status(401);
		res.json({ message: "Not valid token" });
		return;
	}
};
