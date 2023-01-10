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
} from "@chakra-ui/react";
import { useAppCtx } from "../context/AppContext";
import { useToasts } from "react-toast-notifications";

const BASE_URL = "https://backend.safaribust.co.ke/graphql";

function ChangePasswordModal({ isOpen, onOpen, onClose }) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [pass, setPass] = useState("");
  const { userName, token } = useAppCtx();
  const { addToast } = useToasts();

  const requestBody = {
    query: `
        query{
          changePassword(username:"${userName}",password:"${pass},initiator:"${userName}"){
          phone
        }
      }        
    `,
  };

  const handleChangePass = async () => {
    await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res) {
        onClose();
        addToast("Password changed successfully", {
          appearance: "success",
          autoDismiss: true,
        });
      }
    });
  };

  return (
    <>
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
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              style={{
                background: "#000",
                color: "#fff",
              }}
              mr={3}
              onClick={handleChangePass}
            >
              Change
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChangePasswordModal;
