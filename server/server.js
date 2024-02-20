require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// Controllers de los users
const {
  createUser,
  loginUser,
  getUser,
  getMe,
  updateUserData,
  deleteUser,
} = require("./src/controllers/users");

// Controllers de los eventos
const {
  createEvent,
  getEvents,
  getSingleEvent,
  getEventByCity,
  deleteEvent,
} = require("./src/controllers/events");

// Controller inscripciones
const { attendeeController } = require("./src/controllers/attendees");

// Otros
const { handleError, handleNotFound } = require("./src/controllers/errors");
const getEventByTheme = require("./src/controllers/events/getEventByTheme");
const validateAuth = require("./src/middlewares/validateAuth");

const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static(process.env.UPLOADS_DIR));

// Endpoints de los users
app.post("/register", createUser);
app.post("/login", loginUser);
app.get("/users/:id", validateAuth, getUser);
app.get("/user", validateAuth, getMe);
app.put("/user/update", validateAuth, updateUserData);
app.delete("/deleteUser/:id", validateAuth, deleteUser);

// Endpoints de los eventos
app.get("/events", getEvents);
app.get("/events/:eventId", getSingleEvent);
app.get("/events/filterByCity/:city", getEventByCity);
app.get("/events/filterByTheme/:theme", getEventByTheme);
app.post("/createEvent", validateAuth, createEvent);
app.delete("/deleteEvent/:eventId", validateAuth, deleteEvent);

// Endpoints de inscritos
app.get("/attendees/:eventId", validateAuth, attendeeController);
app.post("/attendees/:eventId", validateAuth, attendeeController);

// Middlewares de errores
app.use(handleError);
app.use(handleNotFound);

// Lanzamos el server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
