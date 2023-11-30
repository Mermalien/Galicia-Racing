const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");
const uuid = require("uuid");

// Procesamos y guardamos los datos binarios de la imagen
const saveImg = async (imageBuffer, width) => {
  // Generamos un path a la carpeta de subida de archivos.
  const uploadsPath = path.resolve(process.env.UPLOADS_DIR);

  try {
    // Si la ruta que pasamos como argumento a "access" no existe se genera un error.
    await fs.access(uploadsPath);
  } catch {
    // Si se genera un error en el bloque "try" entramos en el "catch". Eso querrá decir que la
    // carpeta no existe. La creamos.
    await fs.mkdir(uploadsPath);
  }

  // Procesamos la imagen (con sharp) y obtenemos sus metadatos
  const sharpImg = sharp(imageBuffer);

  // Redimensionamos la imagen a na cantidad de pixeles de ancho determinada.
  sharpImg.resize(width);

  // Utilizamos uuid para generar un id único para cada imagen y así cada una tenga su nombre
  const imageName = `${uuid.v4()}.jpg`;

  // Generamos el path donde se creará la
  const imagePath = path.resolve(uploadsPath, imageName);

  // Metemos la imagen en ese path
  await sharpImg.toFile(imagePath);

  return imageName;
};

module.exports = saveImg;
