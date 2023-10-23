import PropTypes from "prop-types";

const EventFooter = ({ eventId, attendees }) => {
  return (
    <footer className="event-footer">
      <div>
        <p>{attendees} inscritos</p>
      </div>
    </footer>
  );
};

EventFooter.propTypes = {
  eventId: PropTypes.number.isRequired,
  attendees: PropTypes.number,
};

export default EventFooter;
