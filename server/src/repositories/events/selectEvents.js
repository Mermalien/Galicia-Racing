const getPool = require("../../database/getDb");

const selectEvents = async (queryParams) => {
  const pool = getPool();

  //Consulta inicial de SQL
  let sqlQuery =
    "SELECT e.*, COUNT(a.id) attendees FROM events e LEFT JOIN attendees a ON e.id = a.eventId";

  //Array de valores que sustituye los ? de la consulta a la bbdd
  let values = [];

  //Cláusula que se va a usar la primera vez
  let clause = "WHERE";

  //Recorremos las propiedades del queryParams(filtros que envía el cliente)
  for (const key in queryParams) {
    //El valor de cada propiedad
    const value = queryParams[key];

    //Añadimos otro filtro a la consulta sql
    sqlQuery += `${clause} ${key} LIKE ?`;

    //Añadimos al array de values el valor del ?
    values.push(`%${value}%`);

    //Cambiamos la cláusula para añadir más filtros
    clause = "AND";
  }

  sqlQuery += " GROUP BY e.id";

  const [events] = await pool.query(sqlQuery, values);
  return events;
};

module.exports = selectEvents;
