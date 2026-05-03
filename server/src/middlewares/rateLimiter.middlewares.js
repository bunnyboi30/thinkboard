import ratelimit from "../config/upstash.js";

const rateLimter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key"); //usually we use userID or IP address to rate limit per person

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later" });
    }

    next();
  } catch (error) {
    console.log("Rate limit Error", error);
    next();
  }
};

export default rateLimter;
