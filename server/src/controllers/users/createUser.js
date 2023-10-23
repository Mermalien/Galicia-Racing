const bcrypt = require("bcrypt");
const uuid = require("uuid");

const {
  selectUserByEmail,
  insertUserInDDBB,
} = require("../../repositories/users");

const { createUserSchema } = require("../../schemas/users");

const {
  generateError,
  processAndSaveAvatar,
  sendMail,
} = require("../../utils");

const createUser = async (req, res, next) => {
  try {
    //Nos traemos los datos de la petición
    const { name, email, password, biografia } = req.body;

    //Traemos la imagen de avatar y la procesamos
    const image = req.files?.image;

    //Validamos el body de la petición
    await createUserSchema.validateAsync(req.body);

    if (!image) {
      generateError("Image is required", 400);
    }

    const imageName = await processAndSaveAvatar(image.data);

    //Verificamos que el email no esté ya en uso, si lo está lanzamos un error
    const sameUserEmail = await selectUserByEmail(email);

    if (sameUserEmail) {
      generateError("Already exists that email", 400);
    }

    //Encriptamos la contraseña del user
    const encryptedPassword = await bcrypt.hash(password, 10);

    //Generamos un código de registro aleatorio para el usuario. Si este código aparece en la BBDD el usuario aún no está activado
    const registrationCode = uuid.v4();

    //Añadimos a la BBDD los datos del user
    const insertId = await insertUserInDDBB({
      name,
      email,
      encryptedPassword,
      biografia,
      avatar: imageName,
      registrationCode,
    });

    //Enviamos un mail al usuario para que active su cuenta
    await sendMail(
      "Bienvenido a Galicia Racing !",
      `<p>Gracias por registrarte, :)</p> <a href="http://localhost:3001/activate/${registrationCode}">Activa aquí tu cuenta</a>`,
      { email }
    );

    res.status(201).send({
      status: "Usuario registrado correctamente",
      data: { id: insertId, name, email, biografia, avatar: imageName },
    });
    alert("Te hemos enviado un email de activación :)");
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
