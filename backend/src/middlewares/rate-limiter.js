import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("my-limit-key");

    if (!success) {
      return res.status(429).json({ message: "To many request" });
    }

    next();
  } catch (error) {
    console.error("Rate limiter middleware error:", error);

    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
    next(error);
  }
};

export default rateLimiter;
