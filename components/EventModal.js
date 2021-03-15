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
import { Heading, HStack, Spacer, Text, VStack } from "@chakra-ui/layout";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { getEventByID } from "../utils";

const EventModal = (props) => {
  const router = useRouter();
  const { onOpen } = useDisclosure();
  const { isOpen, currentEvent, onClose, events } = props;
  const finalRef = React.useRef();
  console.log(currentEvent.speakers);

  const handleClick = (e) => {
    e.preventDefault();
    const href = currentEvent.public_url || currentEvent.private_url;
    router.push(href);
  };
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
            <Heading size="md" my="2">
              Related Events
            </Heading>
            <VStack spacing={4} align="left">
              {relatedEventList?.map((event, i) => (
                <Text>{event?.name}</Text>
              ))}
            </VStack>
            <Button backgroundColor="transparent">
              <HStack>
                <Text>Watch Video</Text>
                <ExternalLinkIcon w={8} h={8} onClick={handleClick} />
              </HStack>
            </Button>
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
