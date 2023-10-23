const getDb = require("./getDb");

async function main() {
  let connection;

  try {
    connection = await getDb();
    console.log(`Te has conectado a la BBDD exitosamente :)`);
    /*
    await connection.query(`CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(200) UNIQUE NOT NULL,
            password VARCHAR(200) NOT NULL,
            biografia VARCHAR(2000),
            avatar VARCHAR(500),
            registrationCode VARCHAR(500)
        )`);

    await connection.query(`CREATE TABLE IF NOT EXISTS events (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            userId INT UNSIGNED NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id),
            title VARCHAR(200) NOT NULL,
            description VARCHAR(1500) NOT NULL,
            image VARCHAR(500),
            theme ENUM('clasicos', 'ocasion', 'rally', 'tunning', 'moto', 'otro'),
            city ENUM("Santiago de Compostela","A Coruña","Vigo","Ourense","Lugo","Pontevedra","Ferrol","Narón","Oleiros","Ribeira","Carballo","Ames","Teo","Culleredo","Redondela","Vilagarcía de Arousa","Sanxenxo","Marín","Poio","O Grove","Lalín","Tui","A Estrada","A Pobra do Caramiñal","Ribadeo","Viveiro","Betanzos","Cangas","Moaña","Nigrán","Porriño","Arteixo","Vimianzo","Noia","Rianxo","Vilalba","Sarria","Monforte de Lemos","O Rosal","Sada","Ribeira de Piquín","Ortigueira","Boiro","Cee","Fisterra","Cervo","Muros","Negreira","Allariz","Verín","O Carballiño","Ribadavia","Oímbra","Rodeiro","Caldas de Reis","Vilanova de Arousa","A Illa de Arousa","Cambados","Tomiño","A Guarda","Ponteareas","Mondariz","Gondomar","Bueu","Ares","Mugardos","Neda","Fene","Pontedeume","Curtis","As Pontes de García Rodríguez","Foz","Burela","Xove","O Valadouro","Mondoñedo","Fonsagrada","Trives","O Barco de Valdeorras","Rubiá","Vilamartín de Valdeorras","Pobra de Trives","Quiroga"),
            date DATETIME NOT NULL
        )`);

    await connection.query(`CREATE TABLE IF NOT EXISTS attendees(
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      userId INT UNSIGNED NOT NULL,
      eventId INT UNSIGNED NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (eventId) REFERENCES events(id)
    )`);

    console.log(`Tablas creadas exitosamente`);
    */
  } catch (error) {
    console.error(error.message);
  } finally {
    process.exit();
  }
}

main();
