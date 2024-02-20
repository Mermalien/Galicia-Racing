import { useEffect, useState } from "react";
import { totalAttendeesService } from "../services/eventService";
import { useParams } from "react-router-dom";

export const useAttendees = () => {
  const { eventId } = useParams();
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getAttendees = async () => {
      try {
        const totalAttendees = await totalAttendeesService(eventId);
        console.log("asistentes totales", totalAttendees);
        setLoading(true);
        setAttendees(totalAttendees);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getAttendees();
  }, [eventId, error]);
  return { attendees, setAttendees, loading, error };
};
