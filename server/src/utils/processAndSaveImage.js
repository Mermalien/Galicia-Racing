const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");
const uuid = require("uuid");

//Generamos un path para guardar las imágenes de los eventos
const uploadsPath = path.join(
  __dirname,
  "..",
  process.env.UPLOADS_DIR,
  "events"
);

//Procesamos y guardamos los datos binarios de la imagen
const processAndSaveImage = async (imageBuffer) => {
  console.log(imageBuffer);
  //Creamos una carpeta uploads
  await fs.mkdir(uploadsPath, { recursive: true });

  //Procesamos la imagen (con sharp) y obtenemos sus metadatos
  const image = sharp(imageBuffer);
  const imageMetadata = await image.metadata();

  //Resizeamos el ancho de la imagen en caso de que supere los 1000px
  if (imageMetadata.width > 1000) {
    image.resize(1000);
  }

  //Utilizamos uuid para generar un id único para cada imagen y así cada una tenga su nombre
  const imageName = `${uuid.v4()}.${imageMetadata.format}`;

  //Generamos el path donde se creará la imagen
  const imagePath = path.join(uploadsPath, imageName);

  //Metemos la imagen en ese path
  await image.toFile(imagePath);

  return imageName;
};

module.exports = processAndSaveImage;
