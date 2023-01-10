import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { useToasts } from "react-toast-notifications";

const BASE_URL = "https://backend.safaribust.co.ke/graphql";

function Verification3({ isOpen, onClose, generateOtp }) {
  const [verified, setVerified] = React.useState(false);

  const { addToast } = useToasts();

  const [otp, setOtp] = useState("");

  let verifyRequest = {
    query: `
    query{
        verifyOtp(otp:"${otp.toUpperCase()}"){
        otp
        verified
        createdAt
        user
        {
        username
      }
        }
    }`,
  };

  const handleVerify = async () => {
    await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(verifyRequest),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.data.verifyOtp.verified) {
          setVerified(true);
          onClose();
          setOtp("");
          return;
        } else {
          addToast(result.errors[0].message, {
            appearance: "error",
            autoDismiss: true,
          });
          setOtp("");
        }
      })
      .catch((err) => {
        addToast("Invalid OTP!!!", {
          appearance: "error",
          autoDismiss: true,
        });
        setOtp("");
        onClose();
      });
  };

  return (
    <>
      <Modal
        isCentered
        // onClose={}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent className="flex justify-center">
          <div className="flex flex-col gap-7 p-4 items-center">
            <div className="w-full flex flex-col items-center gap-5">
              <div className="bg-red-500 text-white p-2 rounded-full flex justify-center items-center">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
              </div>
              <div className="text-[25px] font-medium  ">Verification</div>
              <div className="text-center">
                Please enter the verification code sent to your mobile
              </div>
            </div>
            <div>
              <input
                type="text"
                className="w-full rounded-md border px-4 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-600"
                placeholder="Enter OTP"
                value={otp.toUpperCase()}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />
            </div>
            <div className=" select-none flex w-full justify-center">
              <button
                onClick={handleVerify}
                className="bg-red-500 px-5 py-1 text-white shadow-lg hover:bg-red-700 rounded-sm"
              >
                {" "}
                Verify
              </button>
            </div>
            <div
              className="text-sm py-1 hover:underline hover:cursor-pointer text-red-700 "
              onClick={() => {
                addToast("OTP resent successfully", {
                  appearance: "success",
                  autoDismiss: true,
                });
                generateOtp();
              }}
            >
              Resend OTP
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Verification3;
