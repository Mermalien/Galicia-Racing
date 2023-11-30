import { useEffect, useState } from "react";
import { singleEventService } from "../services/eventService";

export const useEvent = (eventId) => {
  const [eventItem, setEventItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const data = await singleEventService(eventId);
        setEventItem(data);
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [eventId]);

  return { eventItem, loading, errorMsg };
};
