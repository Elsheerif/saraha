import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-z]).*$/).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required(),
  otpCode: Joi.string().length(6).required(),
});

export const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const googleLoginSchema = Joi.object({
  idToken: Joi.string().required(),
});
