"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
        return res.status(400).json({ message: "Validation failed", details: error.details.map((item) => item.message) });
    }
    next();
};
exports.validate = validate;
//# sourceMappingURL=validation.middleware.js.map