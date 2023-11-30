import "./eventBody.css";
// Usamos moment para formatear la fecha
import moment from "moment/moment";
import PropTypes from "prop-types";
const baseURL = import.meta.env.VITE_APP_BACKEND;

const EventBody = ({ description, image, theme, city, date }) => {
  const formattedDate = moment(date).format("DD-MM-YYYY");
  return (
    <div className="event-body">
      <div>
        {image && (
          <img
            className="event-image"
            src={`${baseURL}/${image}`}
            alt={"imagen de portada"}
          />
        )}
        <p className="descriptionP">{description}</p>
        <div className="dataP">
          <p>Temática: {theme}</p>
          <p>Ciudad: {city}</p>
          <p>Fecha: {formattedDate}</p>
        </div>
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
