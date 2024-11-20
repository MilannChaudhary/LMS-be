import Joi from "joi";

const STR = Joi.string();
const STR_REQUIRED = STR.required();
const EMAIL = STR_REQUIRED.email({ minDomainSegments: 2 });
const NUM = Joi.number();
const NUM_REQUIRED = NUM.required();
const BOOLEAN = Joi.boolean();

const joiValidator = (req, res, next, schema) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.json({ message: error.message, status: "error" });
    } else {
      next();
    }
  } catch (error) {
    return res.json({ message: error, status: "error" });
  }
};
// Login
const loginSchema = Joi.object({
  email: EMAIL,
  password: STR_REQUIRED,
});

// signup

const signUpSchema = Joi.object({
  fname: STR_REQUIRED,
  lname: STR_REQUIRED,
  phone: Joi.string().default(""),
  email: EMAIL,
  password: STR_REQUIRED,
});

const bookSchema = Joi.object({
  title: STR_REQUIRED,
  author: STR_REQUIRED,
  genre: STR_REQUIRED,
  isbn: STR_REQUIRED.pattern(/^\d{10}(\d{3})?$/), // ISBN-10 or ISBN-13
  thumbnail: STR.default("defaultimg"),
  publishedYear: NUM_REQUIRED.min(0),
  summary: STR_REQUIRED,
  availability: BOOLEAN.default(true),
  status: Joi.string().valid("active", "inactive").default("inactive"),
  averageRating: Joi.number().min(0).max(5).default(0),
});

const bookUpdateSchema = Joi.object({
  title: STR.optional(),
  author: STR.optional(),
  genre: STR.optional(),
  publishedYear: NUM.optional().min(0),
  summary: STR.optional(),
  availability: BOOLEAN.optional(),
  status: Joi.string().valid("active", "inactive").optional(),
  averageRating: NUM.optional().min(0).max(5),
});

export const loginValidator = (req, res, next) => {
  joiValidator(req, res, next, loginSchema);
};
export const signUpValidator = (req, res, next) => {
  joiValidator(req, res, next, signUpSchema);
};

// Validator Middleware for Book
export const bookValidator = (req, res, next) => {
  joiValidator(req, res, next, bookSchema);
};

export const bookUpdateValidator = (req, res, next) => {
  joiValidator(req, res, next, bookUpdateSchema);
};
