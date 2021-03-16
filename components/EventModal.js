import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import * as React from "react";
import { Button } from "@chakra-ui/button";
import {
  Divider,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { ExternalLinkIcon, LockIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { getEventByID } from "../utils";
import { EventContext } from "./../context/EventContext";

const EventModal = (props) => {
  const { currentState } = React.useContext(EventContext);
  const { isLoggedIn } = currentState;
  const { onOpen } = useDisclosure();
  const { isOpen, currentEvent, onClose, events } = props;
  const finalRef = React.useRef();
  console.log(currentEvent.speakers);

  // const handleClick = (e) => {
  //   e.preventDefault();
  const eventPublicLink = currentEvent.public_url;
  const eventPrivateLink = currentEvent.private_url;
  //   router.push(href);
  // };
  const relatedEventList = currentEvent?.related_events?.map((id) =>
    getEventByID(id, events)
  );
  console.log(relatedEventList);
  return (
    <>
      <Modal
        size="2xl"
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentEvent.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{currentEvent.description}</Text>
            <HStack my={4} spacing={4} align="left" width="fit-content">
              {eventPublicLink && (
                <Button backgroundColor="youtube">
                  <a href={`${eventPublicLink}`} target="_blank">
                    <HStack spacing={4} my={4}>
                      <ExternalLinkIcon w={4} h={4} />
                      <Text>Youtube</Text>
                    </HStack>
                  </a>
                </Button>
              )}
              {eventPrivateLink && isLoggedIn && (
                <Button backgroundColor="youtube">
                  <a href={`${eventPrivateLink}`} target="_blank">
                    <HStack spacing={4} my={4}>
                      <LockIcon w={4} h={4} />
                      <Text>Hopin</Text>
                    </HStack>
                  </a>
                </Button>
              )}
            </HStack>
            <Divider my={4} />
            <Heading size="sm" my="2">
              Related Events
            </Heading>
            {relatedEventList?.length ? (
              <VStack spacing={4} align="left">
                {relatedEventList?.map((event, i) => (
                  <Text>{event?.name}</Text>
                ))}
              </VStack>
            ) : (
              <Text> No Related Events 😢</Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventModal;
