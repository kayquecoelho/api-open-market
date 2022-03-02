import connection from "../db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function register(req, res) {
  const { nome, email, senha } = req.body;

  const hashSenha = bcrypt.hashSync(senha, 10);
  
  try {
    await connection.query(`
      INSERT INTO usuarios (nome, email, senha)
        VALUES ($1, $2, $3)
    `, [nome, email, hashSenha]);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function login(req, res) {
  const { email, senha } = req.body;

  try {
    const user = await connection.query(`
      SELECT * FROM usuarios
        WHERE email=$1
    `, [email]);

    if (user.rowCount > 0 && bcrypt.compareSync(senha, user.rows[0].senha)) {
      const token = uuid();

      await connection.query(`
        INSERT INTO sessoes ("idUsuario", token)
          VALUES($1, $2)      
      `, [user.rows[0].id, token]);

      return res.send({ token, username: user.rows[0].nome});
    }

    return res.sendStatus(401);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
