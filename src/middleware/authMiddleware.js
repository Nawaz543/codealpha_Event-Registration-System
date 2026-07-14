const jwt= require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
     if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided."
        });
    }
    const jwtToken = token.split(" ")[1];

    try {

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.user = decoded;

    next();

} catch (error) {

    return res.status(401).json({
        success: false,
        message: "Invalid or expired token."
    });

}
};

module.exports = authMiddleware;