// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

export const ErrorMessage = ({ message }) => {
  return <div className="error-message">{message}</div>;
};
ErrorMessage.PropTypes = {
  message: PropTypes.string.isRequired,
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};
