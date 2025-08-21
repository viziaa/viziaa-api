import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 60*1000, //1 menit
    max: 1000, // maximal 1000 requens per ip
    message: "request terlalu banyak silahkan coba lagi nanti"
})