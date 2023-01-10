import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Redirector({ isOpen, onOpen, onClose }) {
  const router = useNavigate();

  return (
    <>
      <Modal isCentered isOpen={isOpen} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <span className="text-[25px] text-black">Not logged in?</span>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>You are not logged!!! Would you like to login?</div>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                window.location.reload();
                onClose();
              }}
            >
              No
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                return router("/login", { replace: true });
              }}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Redirector;
