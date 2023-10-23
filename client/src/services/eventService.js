//URL base del backend
const baseURL = import.meta.env.VITE_APP_BACKEND;

import { getToken } from "../utils/getToken";

// Lista de publicaciones
export const listEventsService = async () => {
  const response = await fetch(`${baseURL}/events`);

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

// Publicaciones de una en una
export const singleEventService = async (id) => {
  const response = await fetch(`${baseURL}/events/${id}`);

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

// Crear publicación
export const createEventService = async ({ data }) => {
  const token = getToken();

  const response = await fetch(`${baseURL}/createEvent`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json.data;
};

// Eliminar publicación
export const deleteEventService = async ({ eventId, token }) => {
  const response = await fetch(`${baseURL}/deleteEvent/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
};

//Filtrar publicación
export const filterEventCityService = async (city) => {
  const response = await fetch(`${baseURL}/events?${city}`);
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body.data;
};

export const filterEventThemeService = async (theme) => {
  const response = await fetch(`${baseURL}/events?${theme}`);
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body.data;
};

// Inscribirse o quitarse de un evento

export const attendeeService = async ({ token, eventId }) => {
  const response = await fetch(`${baseURL}/attendees/${eventId}`, {
    method: "POST",
    body: eventId,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body.data;
};
