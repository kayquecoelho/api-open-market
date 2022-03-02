import connection from "../db.js";
import userSchema from "../schemas/userSchema.js";

export async function validateUserSchema(req, res, next) {
  const validation = userSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const message = validation.error.details.map(d => d.message).join(", ");
    return res.status(422).send(message);
  }

  const userExists = await connection.query(`
    SELECT email FROM usuarios 
      WHERE email=$1
  `, [req.body.email]);

  if (userExists.rowCount > 0) {
    return res.sendStatus(409);
  }

  next();
}