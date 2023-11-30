const bcrypt = require("bcrypt");
const uuid = require("uuid");

const {
  selectUserByEmail,
  insertUserInDDBB,
} = require("../../repositories/users");

const { createUserSchema } = require("../../schemas/users");

const { generateError, saveImg, validateSchema } = require("../../utils");

const createUser = async (req, res, next) => {
  try {
    // Nos traemos los datos de la petición
    const { name, email, password, bio } = req.body;

    // Validamos el body de la petición
    await validateSchema(createUserSchema, req.body);

    // Verificamos que el email no esté ya en uso, si lo está lanzamos un error
    const sameUserEmail = await selectUserByEmail(email);

    if (sameUserEmail) {
      generateError("Already exists that email", 400);
    }

    // Variable que almacenará el nombre del avatar (si hay).
    let avatarName;

    // Si hay avatar lo guardamos en la carpeta de subida de archivos y obtenemos su nombre.
    if (req.files?.avatar) {
      avatarName = await saveImg(req.files.avatar.data, 150);
    }

    // Encriptamos la contraseña del user
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Generamos un código de registro aleatorio para el usuario. Si este código aparece en la BBDD el usuario aún no está activado
    const registrationCode = uuid.v4();

    // Añadimos a la BBDD los datos del user
    const insertId = await insertUserInDDBB({
      name,
      email,
      encryptedPassword,
      biografia: bio,
      avatarName,
      registrationCode,
    });

    res.status(201).send({
      status: "Usuario registrado correctamente",
      data: { id: insertId, name, email, biografia: bio, avatar: avatarName },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
