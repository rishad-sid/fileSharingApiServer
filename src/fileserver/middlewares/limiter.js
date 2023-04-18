const config = require("../configs/config");
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: config.WINDOW_SIZE * 60 * 1000,
  max: config.MAX_API_CALL,
  message: "Too many requests!! Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res.status(options.statusCode || 400).send({
      status: "FAILED",
      data: {
        error: options.message,
      },
    });
  },
});

module.exports = apiLimiter;
