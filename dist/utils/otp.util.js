"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOtp = void 0;
const createOtp = (digits = 6) => {
    const min = 10 ** (digits - 1);
    const max = 10 ** digits - 1;
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
};
exports.createOtp = createOtp;
//# sourceMappingURL=otp.util.js.map