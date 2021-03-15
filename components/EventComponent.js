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
import { InfoIcon } from "@chakra-ui/icons";

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
  const { id, name, event_type, start_time } = event;
  const { category, color } = getEventType({ event_type });

  const showEventInfo = (id) => {
    const currEvent = getEventByID(id, events);
    dispatch({
      type: "setCurrentEvent",
      payload: currEvent,
    });
    onOpen();
  };
  const time = new Date(start_time);
  const timeString = time.toDateString();
  return (
    <VStack
      align="left"
      className={`${event_type}`}
      p={5}
      maxH="400px"
      maxW="320px"
    >
      <EventModal
        onClose={onClose}
        isOpen={isOpen}
        currentEvent={currentEvent}
        events={events}
      />
      <Heading size="lg">{name}</Heading>
      <Badge backgroundColor="#fff2e6" width="fit-content" borderRadius="xl">
        {category}
      </Badge>
      <Text>{timeString}</Text>
      <HStack>
        <Button
          colorScheme="black"
          size="sm"
          color="black"
          onClick={() => showEventInfo(id, onOpen)}
        >
          <InfoIcon w={4} h={4} align="right" />
        </Button>
      </HStack>
      <Container maxW="container.sm"></Container>
    </VStack>
  );
};

export default EventComponent;
