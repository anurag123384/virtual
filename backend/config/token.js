import jwt from "jsonwebtoken";

const genToken = (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing");
    }

    const token = jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return token;
  } catch (error) {
    console.error("JWT Token Error:", error.message);
    throw error;
  }
};

export default genToken;