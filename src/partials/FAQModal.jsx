import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

function FAQModal({ isOpen, onOpen, onClose }) {
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <span className="text-[25px] text-black">FAQ</span>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Accordion>
              <AccordionItem>
                <h2 className="font-semibold">
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      What's SAFARIBUST?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  SAFARIBUST is an online multiplayer game consisting of an
                  increasing number that can crash anytime. It's fun and
                  thrilling. It can also make you thousands!
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2 className="font-semibold">
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      HOW DOES IT WORK?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <p>
                    In order to play, you will first need to deposit to your
                    account via MPESA.{" "}
                  </p>
                  <p className="mt-2">
                    First, choose how much you want to bet and which payout
                    multiplier (cash out) you want to target.{" "}
                  </p>
                  <p className="mt-2">
                    Click "START" to place your bet and watch the multiplier
                    rise from 1.00x upwards! You can click "cash out" at any
                    time in order to multiply your wager with the current
                    multiplier. But be careful: The game can end at any time,
                    and if you haven't cashed out by then, you get nothing! If
                    you don't attempt to cash out manually, you will
                    automatically be cashed out if the game reaches your chosen
                    payout.
                  </p>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2 className="font-semibold">
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      HOW DO I DEPOSIT?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <p>
                    You can deposit to your account by clicking on the DEPOSIT
                    button at the top of the page, when logged in. Enter the
                    amount and prompt will be sent to your phone to enter the
                    MPESA PIN and complete the transaction.
                  </p>
                  <p className="mt-2">
                    Alternatively, you can deposit manually from MPESA Paybill
                    using 4097295 as the paybill number and your phone number as
                    the account number. Make sure the phone number format is
                    2547XXXXXXXX without the + sign.
                  </p>
                  <p className="mt-2">
                    Always use the phone number registered to your SAFARIBUST
                    account to make deposits. Any other number will result in a
                    transaction failure and the funds will be reversed within 48
                    hours.
                  </p>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2 className="font-semibold">
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      HOW HIGH CAN THE MULTIPLIER GO?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Currently, the multiplier can go as high as 30x.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2 className="font-semibold">
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      MY WITHDRAWAL HASN'T ARRIVED.
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  We process your withdrawals immediately, but should you wait
                  more than ten minutes without receiving withdrawn funds in
                  your MPESA account, reach us through +254 791 560962 any time
                  or day.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2 className="font-semibold">
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      I FOUND A BUG.
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  If you believe you found a bug, please email a description to{" "}
                  <span className="font-semibold">info@safaribust.co.ke</span>.
                  Even though we test our software carefully, sometimes minor
                  issues go unnoticed, so your help is greatly appreciated!
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FAQModal;
