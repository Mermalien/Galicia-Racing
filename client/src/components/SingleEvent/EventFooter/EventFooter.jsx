import "./EventFooter.css";
import PropTypes from "prop-types";
import { useState } from "react";

const EventFooter = ({ eventId, attendees }) => {
  const [seeAttendeesList, setSeeAttendeesList] = useState(false);
  const handleSeeAttendees = () => {
    setSeeAttendeesList(!seeAttendeesList);
  };
  return (
    <footer className="event-footer">
      <div key={eventId} className="event-footer-data">
        <button
          onClick={handleSeeAttendees}
          className={`show-inscriptions ${
            seeAttendeesList ? "ocultar" : "mostrar"
          }`}
        >
          Inscritos
        </button>
        {seeAttendeesList && <ol className="attendees-list">{attendees}</ol>}
      </div>
    </footer>
  );
};
EventFooter.propTypes = {
  attendees: PropTypes.any,
  eventId: PropTypes.number,
};
export default EventFooter;
