import React, { useEffect, useState, useRef, useCallback } from "react";
import { Spinner } from "@chakra-ui/react";

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
import { BASE_URL2 } from "../utils/Utils";
import { BASE_URL3 } from "../utils/Utils";


function DepositModal({ isOpen, onOpen, onClose }) {
  // const initialRef = (us/eRef < null) | (HTMLElement > null);
  const finalRef = React.useRef(null);

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const { token, accountBalance } = useAppCtx();

  const [amount, setAmount] = useState(100);
  const [code, setCode] = useState("");

  const [lowAmount, setLowAmount] = useState(false);

  const { addToast } = useToasts();

  const initialRef = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const handleDeposit = async () => {
    if (amount < 10) {
      onClose();
      addToast("Amount must be 10 and above", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    if (amount < 1) {
      onClose();
      addToast("Amount must be 10 and above", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    setLoading(true);

    let data = {
      phone: window.sessionStorage.getItem("phone"),
      amount: amount,
      userId: window.sessionStorage.getItem("userId"),
    };
    await fetch(BASE_URL2, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          setAmount(100);
          setLoading(false);
          onClose();
          addToast(
            "Request sent on your phone. Enter MPESA pin to complete the transaction.",
            {
              appearance: "info",
              autoDismiss: true,
            }
          );

          return;
        }
        onClose();
        addToast("Could not process your request", {
          appearance: "error",
          autoDismiss: true,
        });
      })
      .catch((err) => console.log(err?.message));
  };

  const handleCheckTransaction = async () => {
    if (code === "") {
      onClose();
      addToast("Enter a valid transaction code to proceed", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    setLoading2(true);
    let data = {
      code: code,
    };

    await fetch(BASE_URL3, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          setCode("");
          setLoading2(false);
          onClose();
          addToast(result.message, {
            appearance: "info",
            autoDismiss: true,
          });
          window.localStorage.setItem("hrm", accountBalance);
          return;
        }
        onClose();
        addToast("Transaction already credited", {
          appearance: "warning",
          autoDismiss: true,
        });
      })
      .catch((err) => console.log(err?.message));
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
            <span className="text-[25px] text-white">Deposit</span>
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
                Amount
              </FormLabel>
              <input
                className="block w-full px-4 py-2 mt-2 text-[#000] bg-white border rounded-md focus:border-[#000] focus:ring-[#000] focus:outline-none focus:ring focus:ring-opacity-40"
                ref={initialRef}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setLowAmount(false);
                }}
                type="number"
                placeholder="Enter amount"
              />
              {lowAmount && (
                <span className="text-white font-bold text-xs">
                  Amount must be greater than 50
                </span>
              )}
            </FormControl>
            <div className="mt-2">
              <span className="font-bold text-[12px]">NOTE:</span>
              <ul className="ml-5 list-disc text-[11px] font-semibold">
                <li>Minimum deposit amount is KES 10</li>
                <li>Make sure your phone is on and screen unlocked</li>
              </ul>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              style={{
                background: "#000",
                color: "#fff",
                width: "100px",
              }}
              mr={3}
              onClick={handleDeposit}
              disabled={loading ? true : false}
            >
              {loading ? <Spinner /> : "Deposit"}
            </Button>
          </ModalFooter>

          <div className="bg-black bg-opacity-50 mt-5 w-[90%] mx-auto text-white flex flex-col justify-center p-3 gap-2 mb-10">
            <h1 className="text-[16px] font-bold">Manual Deposit</h1>
            <div>
              <span className="font-bold text-[16px]">STEPS:</span>
              <ul className="ml-5 list-disc	 text-[13px] font-semibold">
                <li>Go to M-PESA on your phone</li>
                <li>Select Pay Bill option</li>
                <li>Enter Business no. 4097295</li>
                <li>Enter Account no. in the format (254XXXXXXXXX)</li>
                <li> Enter the Amount</li>
                <li> Enter your M-PESA PIN and Send</li>
              </ul>
            </div>
          </div>
          <div className="bg-black bg-opacity-50 mt-5 w-[90%] mx-auto text-white flex flex-col justify-center p-3 gap-5 mb-10">
            <h1 className="text-[16px] font-semibold ">Verify Transaction</h1>
            <FormControl>
              <FormLabel
                style={{
                  color: "#fff",
                  fontSize: "12px",
                }}
              >
                {" "}
                <div className="text-[13px]">
                  <span className="font-bold text-[12px]">
                    If there is a delay of more than 3 minutes with your balance
                    update, try:
                  </span>
                  <ul className="ml-5 list-disc	 text-sm font-semibold text-[10px]">
                    <li className="text-[13px]">
                      Refresh your browser to reload the page. If still
                      pending...
                    </li>
                    <li className="text-[13px]">
                      Enter the MPESA transaction code below and 'Verify'
                    </li>
                  </ul>
                </div>
              </FormLabel>
              <input
                className="block w-full px-4 py-2 mt-2 text-[#000] bg-white border rounded-md focus:border-[#000] focus:ring-[#000] focus:outline-none focus:ring focus:ring-opacity-40"
                // ref={initialRef}
                value={code}
                placeholder="Transaction code e.g. QJC6PTT544 "
                onChange={(e) => {
                  setCode(e.target.value);
                  setLowAmount(false);
                }}
                type="text"
              />
            </FormControl>
            <Button
              style={{
                background: "#000",
                color: "#fff",
                width: "100px",
              }}
              mr={3}
              onClick={handleCheckTransaction}
            >
              {loading2 ? <Spinner /> : "Verify"}
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DepositModal;
