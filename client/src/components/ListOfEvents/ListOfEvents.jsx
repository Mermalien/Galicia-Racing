import "./ListOfEvents.css";
import PropTypes from "prop-types";
import { eventItemPropTypes } from "../../utils/customPropTypes";
import { SingleEvent } from "../SingleEvent/SingleEvent";

export const ListOfEvents = ({ events, setEvents }) => {
  // Verificamos si la fecha del evento ya pasó
  const currentDate = new Date();
  const availableEvents = events.filter((eventItem) => {
    const itemDate = new Date(eventItem.date);
    return itemDate >= currentDate;
  });

  // Los ordenamos para que aparezcan primero las publicaciones más recientes
  const sortedEvents = availableEvents
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="list-container">
      <ul className="list-of-events">
        {sortedEvents.map((eventItem) => (
          <li key={eventItem.id}>
            <SingleEvent
              eventItem={eventItem}
              events={events}
              setEvents={setEvents}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

ListOfEvents.propTypes = {
  events: PropTypes.arrayOf(eventItemPropTypes),
  setEvents: PropTypes.func,
};
