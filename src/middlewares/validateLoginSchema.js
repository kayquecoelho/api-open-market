import loginSchema from "../schemas/loginSchema.js";

export async function validateLoginSchema(req, res, next) {
  const validation = loginSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const message = validation.error.details.map(d => d.message).join(", ");
    return res.status(422).send(message);
  }

  next();
}