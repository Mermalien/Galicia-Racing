import { useEffect, useState } from "react";
import { listEventsService } from "../services/eventService";

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //Usamos useEffect para obtener la lista de eventos
  useEffect(() => {
    //Petición que obtiene las publicaciones
    const getEvents = async () => {
      try {
        const data = await listEventsService();
        setLoading(true);

        setEvents(data);
      } catch (err) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getEvents();
  });

  const createEvent = (data) => {
    setEvents([data, ...events]);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((item) => item.id !== id));
  };

  return { events, loading, error, createEvent, deleteEvent };
};
