import * as React from "react";
import {
  VStack,
  Container,
  Heading,
  Badge,
  Text,
  Button,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { getEventByID } from "../utils";
import { EventContext } from "../context/EventContext";
import EventModal from "./EventModal";
import { CalendarIcon, InfoIcon, TimeIcon } from "@chakra-ui/icons";

const getEventType = ({ event_type }) => {
  switch (event_type) {
    case "activity":
      return { category: "Activity", color: "#ffbf74" };
      break;
    case "tech_talk":
      return { category: "Tech Talk", color: "#276897" };
      break;
    case "workshop":
      return { category: "Workshop", color: "#73c6b6" };
      break;
    default:
      return { category: "Default", color: "grey" };
  }
};

const EventComponent = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentState, dispatch } = React.useContext(EventContext);
  const { events, currentEvent } = currentState;
  const { event } = props;
  const { id, name, event_type, start_time, end_time } = event;
  const { category, color } = getEventType({ event_type });

  const showEventInfo = (id) => {
    const currEvent = getEventByID(id, events);
    dispatch({
      type: "setCurrentEvent",
      payload: currEvent,
    });
    onOpen();
  };

  // const milliseconds = start_time * 1000;

  const dateObject = new Date(start_time);
  const endDateObject = new Date(end_time);

  const dayOptions = {
    weekday: "long",
    // year: "numeric",
    month: "long",
    day: "numeric",
  };
  const hourOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  const timeString = dateObject.toLocaleDateString("en-US", dayOptions);
  const startTime = dateObject
    .toLocaleDateString("en-US", hourOptions)
    .split(",")[1];
  const endTime = endDateObject
    .toLocaleDateString("en-US", hourOptions)
    .split(",")[1];

  console.log(startTime);
  return (
    <VStack
      align="left"
      className={`${event_type}`}
      p={5}
      maxH="400px"
      maxW="320px"
      onClick={() => showEventInfo(id, onOpen)}
    >
      <EventModal
        onClose={onClose}
        isOpen={isOpen}
        currentEvent={currentEvent}
        events={events}
      />
      <Heading size="md">{name}</Heading>
      <Badge backgroundColor="#fff2e6" width="fit-content" borderRadius="xl">
        {category}
      </Badge>
      <HStack spacing={2}>
        <CalendarIcon />
        <Text>{timeString}</Text>
      </HStack>
      <HStack spacing={2}>
        <TimeIcon />
        <Text>
          {startTime} - {endTime}
        </Text>
      </HStack>
    </VStack>
  );
};

export default EventComponent;
