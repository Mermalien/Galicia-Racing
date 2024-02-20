//URL base del backend
const baseURL = import.meta.env.VITE_APP_BACKEND;
import { getToken } from "../utils/getToken";

// Lista de publicaciones
export const listEventsService = async (theme = "", city = "") => {
  const response = await fetch(`${baseURL}/events?theme=${theme}&city=${city}`);

  const body = await response.json();

  return body.data;
};

// Publicaciones de una en una
export const singleEventService = async (eventId) => {
  const response = await fetch(`${baseURL}/events/${eventId}`);

  const body = await response.json();

  return body;
};

// Crear publicación
export const createEventService = async (formData) => {
  const token = getToken();

  const response = await fetch(`${baseURL}/createEvent`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await response.json();

  return body.data;
};

// Eliminar publicación
export const deleteEventService = async (eventId) => {
  const token = getToken();

  const response = await fetch(`${baseURL}/deleteEvent/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await response.json();
  return body;
};

// Inscribirse o quitarse de un evento
export const attendeeService = async (eventId) => {
  const token = getToken();

  const response = await fetch(`${baseURL}/attendees/${eventId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await response.json();
  return body;
};
// Lista de inscritos
export const totalAttendeesService = async (eventId) => {
  const token = getToken();
  const response = await fetch(`${baseURL}/attendees/${eventId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await response.json();
  return body;
};
