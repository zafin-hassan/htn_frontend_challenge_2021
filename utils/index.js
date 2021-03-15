export async function login({ username, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "zafin" && password === "password") {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
}

export const getEventByID = (id, events) => {
  const currentEvent = events.filter((event) => event.id === id);
  return currentEvent[0];
};

export const filterEvents = (eventType, events) => {
  const filteredEvents = events.filter(
    (event) => event.event_type === eventType
  );
  return filteredEvents;
};
