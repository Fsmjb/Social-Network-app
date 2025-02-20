import jwt from "jsonwebtoken";


const verifyJwt = (req, res, next) => {
    try {
        const secretKey = process.env.JWT_SECRET;
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).redirect("/reg");
        }

        jwt.verify(token, secretKey, (err, decode) => {
            if (err) {
                return res.status(401).redirect("/reg");
            }
            req.user = decode;
            next();
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default verifyJwt;