import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

function HistoryModal({ isOpen, onClose, data }) {
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent style={{ background: "#DD2222" }}>
          <ModalHeader>
            <span className="text-[25px] text-white">
              Reference Point ({data?.point}x){" "}
            </span>
          </ModalHeader>
          <ModalCloseButton color={"#fff"} />
          <ModalBody className="flex-col flex justify-center gap-4">
            <div className="">
              <label className="text-white text-[14px] font-medium">
                Client Seed
              </label>
              <div className="bg-white px-4 h-[35px] flex overflow-x-scroll scrollbar-hide py-1 shadow-lg rounded-md items-center">
                {data?.clientSeed}
              </div>
            </div>
            <div className="">
              <label className="text-white text-[14px] font-medium">
                Server Seed
              </label>
              <div className="bg-white px-4 h-[35px] items-center flex overflow-x-scroll scrollbar-hide py-1 shadow-lg rounded-md">
                {data?.serverSeed}
              </div>
            </div>
            <div className="">
              <label className="text-white text-[14px] font-medium">
                Nonce
              </label>
              <div className="bg-white px-4 h-[35px] items-center flex overflow-x-scroll scrollbar-hide py-1 shadow-lg rounded-md">
                {data?.nonce}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              background="black"
              color="#fff"
              _hover={{
                background: "#000",
              }}
              mr={3}
            >
              Verify
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default HistoryModal;
