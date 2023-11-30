import PropTypes from "prop-types";

export const eventItemPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  theme: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  attendees: PropTypes.number,
  marked: PropTypes.bool,
  userId: PropTypes.number.isRequired,
});

export const deleteEventPropTypes = PropTypes.shape({
  userId: PropTypes.number.isRequired,
  eventId: PropTypes.number.isRequired,
});

export const userPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  biografia: PropTypes.string,
  avatar: PropTypes.string,
});
