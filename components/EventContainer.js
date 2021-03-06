import { VStack, SimpleGrid, ButtonGroup, Button } from "@chakra-ui/react";
import EventComponent from "./EventComponent";
import axios from "axios";
import * as React from "react";
import { EventContext } from "./../context/EventContext";
import { filterEvents } from "../utils";
import { HStack, Text } from "@chakra-ui/layout";
import { CircleIcon } from "../styles/CircleIcon";

const EventContainer = (props) => {
  const { currentState, dispatch } = React.useContext(EventContext);
  const { isLoggedIn, events, allEvents } = currentState;
  const fetchEventData = () => {
    axios
      .get(
        `https://api.hackthenorth.com/v3/graphql?query={ events { id name event_type permission start_time end_time description speakers { name profile_pic } public_url private_url related_events } }`
      )
      .then((res) => {
        let sortedEvents = res.data.data.events?.sort((a, b) =>
          a.start_time > b.start_time ? 1 : -1
        );
        let publicEvents = sortedEvents?.filter(
          (word) => word.permission !== "private"
        );
        dispatch({
          type: "setEvents",
          payload: isLoggedIn ? sortedEvents : publicEvents,
        });
      });
  };
  const handleFilterClick = (props) => {
    const { eventType } = props;
    const filteredEvents = filterEvents(eventType, allEvents);
    dispatch({
      type: "filterEvents",
      payload: filteredEvents,
    });
  };
  const showAll = () => {
    dispatch({
      type: "filterEvents",
      payload: allEvents,
    });
  };

  React.useEffect(() => {
    fetchEventData();
  }, [isLoggedIn]);
  return (
    <div>
      {events && (
        <>
          <HStack
            style={{
              overflow: "auto",
              whiteSpace: "nowrap",
            }}
            spacing="8"
            my="4"
          >
            <Button py="4" px="50" variant="outline" onClick={() => showAll()}>
              Show All
            </Button>
            <Button
              className="workshop"
              py="4"
              px="50"
              variant="outline"
              onClick={() => handleFilterClick({ eventType: "workshop" })}
            >
              <HStack spacing="2">
                <CircleIcon color="#73c6b6" boxSize={6} />
                <Text>Workshop</Text>
              </HStack>
            </Button>
            <Button
              className="activity"
              py="4"
              px="50"
              variant="outline"
              onClick={() => handleFilterClick({ eventType: "activity" })}
            >
              <HStack spacing="2">
                <CircleIcon color="#ffbf74" boxSize={6} />
                <Text>Activity</Text>
              </HStack>
            </Button>
            <Button
              className="tech_talk"
              variant="outline"
              py="4"
              px="50"
              onClick={() => handleFilterClick({ eventType: "tech_talk" })}
            >
              <HStack spacing="2">
                <CircleIcon color="#276897" boxSize={6} />
                <Text>Tech Talk</Text>
              </HStack>
            </Button>
          </HStack>
          {events[0] ? (
            <SimpleGrid
              justifyContent="center"
              columns={[null, 2, 4]}
              spacingX="40px"
              spacingY="20px"
            >
              {events?.map((event, i) => (
                <EventComponent key={i} event={event} />
              ))}
            </SimpleGrid>
          ) : (
            <Text>No Events To Show ????</Text>
          )}
        </>
      )}
    </div>
  );
};

export default EventContainer;
