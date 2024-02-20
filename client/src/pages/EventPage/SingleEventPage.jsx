import "./SingleEventPage.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  singleEventService,
  totalAttendeesService,
} from "../../services/eventService";
import EventHeader from "../../components/SingleEvent/EventHeader/EventHeader";
import EventBody from "../../components/SingleEvent/EventBody/EventBody";
import EventFooter from "../../components/SingleEvent/EventFooter/EventFooter";

export const SingleEventPage = () => {
  const { eventId } = useParams();
  const [eventItem, setEventItem] = useState();
  const [attendees, setAttendees] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setErrorMsg("");
        const body = await singleEventService(eventId);
        const attendeesList = await totalAttendeesService(eventId);

        if (body.status === "error") {
          throw new Error(body.message);
        }
        setEventItem(body.data);
        setAttendees(attendeesList.data);
      } catch (error) {
        setErrorMsg(error.message);
      }
    };

    fetchEvent();
  }, [eventId]);

  return (
    <>
      {eventItem && (
        <div className="single-event-page">
          <div key={eventItem.id} className="single-event-item">
            <EventHeader
              title={eventItem.title}
              className="single-event-header"
            />
            <EventBody
              description={eventItem.description}
              image={eventItem.image}
              theme={eventItem.theme}
              city={eventItem.city}
              date={eventItem.date}
              className="single-event-item-body"
            />
            {attendees && (
              <EventFooter
                attendees={eventItem.attendees}
                eventId={eventItem.id}
                className="event-page-footer"
              />
            )}
          </div>
        </div>
      )}
      {errorMsg && <p>{errorMsg}</p>}
    </>
  );
};
