import "./SingleEvent.css";
import {
  eventItemPropTypes,
  deleteEventPropTypes,
} from "../../utils/customPropTypes";
import EventHeader from "./EventHeader/EventHeader";
import EventBody from "./EventBody/EventBody";
import EventFooter from "./EventFooter/EventFooter";
import {
  attendeeService,
  deleteEventService,
} from "../../services/eventService";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ErrorMessage } from "../ErrorMessage";
import { useNavigate } from "react-router-dom";

export const SingleEvent = ({ eventItem, removeEvent }) => {
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [attendee, setAttendee] = useState(false);
  const [error, setError] = useState("");

  if (error) return <ErrorMessage message={error} />;

  //Manejador de inscripciones a los eventos
  const handleAttendee = async (userId, eventId) => {
    try {
      await attendeeService({ token, eventId });
      if (userId) {
        setAttendee(!attendee);
      }
    } catch (error) {
      setError(error.message);
    }
    return console.log(
      `Hiciste click en inscribirse al evento ${eventItem.id}`
    );
  };

  //Eliminar una publicación si es tuya
  const deleteEvent = async (eventId, user) => {
    try {
      await deleteEventService({ eventId, token });

      if (user) {
        removeEvent(eventId);
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="single-event">
        <EventHeader title={eventItem.title} />
        <EventBody
          image={eventItem.image}
          description={eventItem.description}
          theme={eventItem.theme}
          city={eventItem.city}
          date={eventItem.date}
        />

        <EventFooter eventId={eventItem.id} attendees={eventItem.attendees} />
      </div>

      {user ? (
        <button
          className={`attendee-btn ${eventItem.attendee ? "asiste" : ""}`}
          onClick={() => handleAttendee(eventItem.id)}
        >
          Inscribirse
        </button>
      ) : null}

      {user?.id === eventItem.userId ? (
        <button
          className="delete-btn"
          onClick={() => {
            if (window.confirm("Parece que quieres eliminar una publicación"))
              deleteEvent(eventItem.id);
          }}
        >
          Eliminar
        </button>
      ) : null}
    </>
  );
};

SingleEvent.propTypes = {
  eventItem: eventItemPropTypes,
  removeEvent: deleteEventPropTypes,
};
