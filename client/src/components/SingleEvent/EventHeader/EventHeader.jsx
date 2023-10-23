import PropTypes from "prop-types";
import "./EventHeader.css";

const EventHeader = ({ title }) => {
  return (
    <header className="event-header">
      <div>
        <p>{title}</p>
      </div>
    </header>
  );
};

EventHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default EventHeader;
