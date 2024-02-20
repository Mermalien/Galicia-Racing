const getDb = require("./getDb");

async function main() {
  let connection;

  try {
    connection = await getDb();

    console.log("Borrando tablas");

    await connection.query("DROP TABLE IF EXISTS attendees, events, users");

    console.log("Creando tablas");

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(200) UNIQUE NOT NULL,
        password VARCHAR(200) NOT NULL,
        biografia VARCHAR(2000),
        avatar VARCHAR(500),
        registrationCode VARCHAR(500),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS events (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        userId INT UNSIGNED NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id),
        title VARCHAR(200) NOT NULL,
        description VARCHAR(1500) NOT NULL,
        image VARCHAR(500),
        theme ENUM('clasicos', 'ocasion', 'rally', 'tunning', 'moto', 'otro') NOT NULL,
        city VARCHAR(50) NOT NULL,
        date DATETIME NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS attendees(
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        userId INT UNSIGNED NOT NULL,
        eventId INT UNSIGNED NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (eventId) REFERENCES events(id)
      )
    `);

    console.log("Tablas creadas");
  } catch (error) {
    console.error(error.message);
  } finally {
    process.exit();
  }
}

main();
