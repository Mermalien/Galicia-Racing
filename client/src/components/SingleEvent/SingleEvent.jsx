import PropTypes from "prop-types";
import "./SingleEvent.css";
import {
  eventItemPropTypes,
  deleteEventPropTypes,
} from "../../utils/customPropTypes";
import EventHeader from "./EventHeader/EventHeader";
import EventBody from "./EventBody/EventBody";
import {
  attendeeService,
  deleteEventService,
} from "../../services/eventService";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import EventFooter from "./EventFooter/EventFooter";

export const SingleEvent = ({ eventItem, removeEvent, events, setEvents }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [attendees, setAttendees] = useState([]);
  const [marked, setMarked] = useState(() => {
    const storedValue = localStorage.getItem(`attendees_${eventItem.id}`);
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const [errorMsg, setErrorMsg] = useState("");

  const eventId = eventItem.id;
  //Manejador de inscripciones a los eventos
  const handleAttendee = async (e) => {
    try {
      e.preventDefault();
      setErrorMsg("");
      const body = await attendeeService(eventItem.id);

      // Actualizamos el evento concreto para agregar o eliminar un asistente.
      setEvents(
        events.map((currentEvent) => {
          // Actualizamos únicamente el evento que estamos modificando.
          if (currentEvent.id === eventItem.id) {
            if (marked) {
              currentEvent.attendees -= 1;
            } else {
              currentEvent.attendees += 1;
            }
          }
          return currentEvent;
        })
      );

      setMarked(!marked);
      localStorage.setItem(
        `attendees_${eventItem.id}`,
        JSON.stringify(!marked)
      );
      setAttendees(!attendees);

      // Si hay algún error lo lanzamos.
      if (body.status === "error") {
        throw new Error(body.message);
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  //Eliminar una publicación si es tuya
  const deleteEvent = async (eventId, user) => {
    try {
      await deleteEventService(eventId);

      if (user) {
        removeEvent(eventId);
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <>
      <div className="single-event">
        <EventHeader title={eventItem.title} className="event-header" />
        <EventBody
          image={eventItem.image}
          description={eventItem.description}
          theme={eventItem.theme}
          city={eventItem.city}
          date={eventItem.date}
          className="event-body"
        />

        <div className="if-user-btns">
          <Link to={`/events/${eventId}`}>
            <p className="p-link">VER MÁS</p>
          </Link>

          <EventFooter
            attendees={eventItem.attendees}
            eventId={eventItem.id}
            className="single-event-footer"
          />
          {currentUser ? (
            <div className="attendees-count">
              <button className="attendee-btn" onClick={handleAttendee}>
                {marked ? "YA NO ME INTERESA" : "ME INTERESA"}
              </button>
            </div>
          ) : null}
          {currentUser?.id === eventItem.userId ? (
            <button
              className="delete-btn"
              onClick={() => {
                if (
                  window.confirm("Parece que quieres eliminar una publicación")
                )
                  deleteEvent(eventItem.id);
                window.location.reload();
                navigate("/");
              }}
            >
              ELIMINAR
            </button>
          ) : null}
        </div>
      </div>

      {errorMsg && <p>{errorMsg}</p>}
    </>
  );
};

SingleEvent.propTypes = {
  eventItem: eventItemPropTypes,
  removeEvent: deleteEventPropTypes,
  events: PropTypes.arrayOf(eventItemPropTypes),
  setEvents: PropTypes.func,
};
