import "./eventBody.css";
import PropTypes from "prop-types";
const baseURL = import.meta.env.VITE_APP_BACKEND;

const EventBody = ({ description, image, theme, city, date }) => {
  return (
    <div className="event-body">
      <div>
        <p>{description}</p>
        {image && (
          <img
            className="event-image"
            src={`${baseURL}/${image}`}
            alt={"imagen de portada"}
          />
        )}
        <p>
          {theme} {city} {date}
        </p>
      </div>
    </div>
  );
};

EventBody.propTypes = {
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  theme: PropTypes.string,
  city: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default EventBody;
