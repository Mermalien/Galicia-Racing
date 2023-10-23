require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

//Controllers de los users
const {
  createUser,
  activateUser,
  loginUser,
  getUser,
  getMe,
} = require("./src/controllers/users");

//Controllers de los eventos
const {
  createEvent,
  getEvents,
  getSingleEvent,
  deleteEvent,
} = require("./src/controllers/events");

//Controller inscripciones
const { attendeeController } = require("./src/controllers/attendees");

//Middlewares
const {
  handleError,
  handleNotFound,
  validateAuth,
} = require("./src/middlewares");
const { selectEventById } = require("./src/repositories/events");

const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("src/uploads/events"));
app.use(express.static("src/uploads/users"));

//Endpoints de los users
app.post("/register", createUser);
app.post("/login", loginUser);
app.get("/activate/:registrationCode", activateUser);
app.get("/users/:id", validateAuth, getUser);
app.get("/user", validateAuth, getMe);

//Endpoints de los eventos
app.get("/events", getEvents);
app.get("/events/:eventId", getSingleEvent);

app.post("/createEvent", validateAuth, createEvent);
app.post("/attendees/:eventId", validateAuth, attendeeController);

app.delete("/deleteEvent/:eventId", validateAuth, deleteEvent);

//Middlewares de errores
app.use(handleNotFound);
app.use(handleError);

// Lanzamos el server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
