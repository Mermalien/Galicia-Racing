const handleNotFound = (req, res) => {
  res.status(404).send({
    status: "error",
    message: "Ruta no encontrada",
  });
};

module.exports = handleNotFound;
