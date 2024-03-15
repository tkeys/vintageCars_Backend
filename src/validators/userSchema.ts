import Joi from "joi";

const userSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  userName: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.min": "Username must be at least {#limit} characters long",
    "string.max": "Username cannot be longer than {#limit} characters",
    "any.required": "Username is required",
    "string.alphanum": "Username must contain only alphanumeric characters",
  }),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one letter, one number, and be at least 6 characters long.",
      "any.required": "Password is required",
    }),
  firstName: Joi.string().min(2).max(20).required().messages({
    "string.min": "First name must be at least {#limit} characters long",
    "string.max": "First name cannot be longer than {#limit} characters",
    "any.required": "First name is required",
  }),
  lastName: Joi.string().min(2).max(20).required().messages({
    "string.min": "Last name must be at least {#limit} characters long",
    "string.max": "Last name cannot be longer than {#limit} characters",
    "any.required": "Last name is required",
  }),
});

export default userSchema;
