import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    // Get Token from Cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login.",
      });
    }

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    // Store User ID
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Unauthorized access.",
    });
  }
};

export default isAuth;