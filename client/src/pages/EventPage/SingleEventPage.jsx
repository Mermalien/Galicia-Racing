import "./SingleEventPage.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { singleEventService } from "../../services/eventService";
import EventHeader from "../../components/SingleEvent/EventHeader/EventHeader";
import EventBody from "../../components/SingleEvent/EventBody/EventBody";
import EventFooter from "../../components/SingleEvent/EventFooter/EventFooter";

export const SingleEventPage = () => {
  // Obtenemos el ID del evento al que queremos acceder.
  const { eventId } = useParams();

  const [event, setEvent] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setErrorMsg("");

        const body = await singleEventService(eventId);

        if (body.status === "error") {
          throw new Error(body.message);
        }

        setEvent(body.data);
      } catch (error) {
        setErrorMsg(error.message);
      }
    };

    fetchEvent();
  }, [eventId]);

  return (
    <>
      {event && (
        <div className="single-event-page">
          <div key={event.id} className="single-event-item">
            <EventHeader title={event.title} className="single-event-header" />
            <EventBody
              description={event.description}
              image={event.image}
              theme={event.theme}
              city={event.city}
              date={event.date}
            />
            <EventFooter attendees={event.attendees} />
          </div>
        </div>
      )}
      {errorMsg && <p>{errorMsg}</p>}
    </>
  );
};
