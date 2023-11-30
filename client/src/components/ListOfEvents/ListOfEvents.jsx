import "./ListOfEvents.css";

import { eventItemPropTypes } from "../../utils/customPropTypes";
import { SingleEvent } from "../SingleEvent/SingleEvent";

export const ListOfEvents = ({ events, setEvents }) => {
  // Verificamos si la fecha del evento ya pasó
  const currentDate = new Date();

  const isAvailable = events.filter((eventItem) => {
    const itemDate = eventItem.date;
    if (itemDate >= currentDate) {
      return isAvailable;
    } else {
      <p>EL EVENTO YA HA PASADO</p>;
    }
  });

  // Los ordenamos para que aparezcan primero las publicaciones más recientes
  const sortedEvents = events
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="list-container">
      <ul className="list-of-events">
        {sortedEvents.map((eventItem) => {
          console.log(eventItem);
          return (
            <li key={eventItem.id}>
              <SingleEvent
                eventItem={eventItem}
                events={events}
                setEvents={setEvents}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ListOfEvents.propTypes = {
  events: eventItemPropTypes,
};
