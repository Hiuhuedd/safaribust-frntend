import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/react";
import Verification4 from "./Verification4";

const BASE_URL = "https://backend.safaribust.co.ke/graphql";

function ForgotPasswordModal({ isOpen, onClose }) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [username, setUsername] = useState("");

  const {
    isOpen: isOpenVer,
    onOpen: onOpenVer,
    onClose: onCloseVer,
  } = useDisclosure();

  let requestBodyVerify = {
    query: `
        mutation{
        generateOtp(username:"${username}"){
          verified
      }
    }
        
      `,
  };

  const generateOtp = async () => {
    await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBodyVerify),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.data.generateOtp) {
          onOpenVer();
          onClose();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Verification4
        onClose={onCloseVer}
        isOpen={isOpenVer}
        username={username}
        generateOtp={generateOtp}
      />
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          style={{
            background: "#DD2222",
          }}
        >
          <ModalHeader>
            <span className="text-[25px] text-white">Change Password</span>
          </ModalHeader>
          <ModalCloseButton
            style={{
              color: "#fff",
            }}
          />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel
                style={{
                  color: "#fff",
                }}
              >
                Username
              </FormLabel>
              <input
                className="block w-full px-4 py-2 mt-2 text-[#000] bg-white border rounded-md focus:border-[#000] focus:ring-[#000] focus:outline-none focus:ring focus:ring-opacity-40"
                ref={initialRef}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </FormControl>
            {/* <FormControl>
              <FormLabel
                style={{
                  color: "#fff",
                }}
              >
                New Password
              </FormLabel>
              <input
                className="block w-full px-4 py-2 mt-2 text-[#000] bg-white border rounded-md focus:border-[#000] focus:ring-[#000] focus:outline-none focus:ring focus:ring-opacity-40"
                ref={initialRef}
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Enter new password"
              />
            </FormControl> */}
          </ModalBody>

          <ModalFooter>
            <Button
              style={{
                background: "#000",
                color: "#fff",
              }}
              mr={3}
              onClick={generateOtp}
            >
              Change
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default ForgotPasswordModal;
