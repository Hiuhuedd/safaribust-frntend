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
import { useToasts } from "react-toast-notifications";
import { useAppCtx } from "../context/AppContext";
import { Spinner } from "flowbite-react";

import { BASE_URL4 } from "../utils/Utils";

function WithdrawModal({ isOpen, onOpen, onClose }) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [amount, setAmount] = useState(0);
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);

  const { accountBalance, token, handleCaller } = useAppCtx();
  const [insufficient, setInsufficient] = useState(false);
  const handleWithdraw = async () => {
    if (amount < 100 || amount === "") {
      addToast("Amount must be greater than 100 ", {
        appearance: "warning",
        autoDismiss: true,
      });
      onClose();
      return;
    }
    if (amount > 70000 || amount === "") {
      addToast("Amount must be less than 70000 ", {
        appearance: "warning",
        autoDismiss: true,
      });
      onClose();
      return;
    }
    if (parseFloat(amount) > parseFloat(accountBalance)) {
      addToast("Insufficient amount in your wallet", {
        appearance: "warning",
        autoDismiss: true,
      });
      onClose();
      setInsufficient(true);
      return;
    }
    setLoading(true);
    window.localStorage.setItem("hrm", +accountBalance - +amount);
    let body = {
      userId: window.sessionStorage.getItem("userId"),
      phone: window.sessionStorage.getItem("phone"),
      amount: amount,
    };

    await fetch(BASE_URL4, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          handleCaller();
          addToast("Request succesfull", {
            appearance: "success",
            autoDismiss: true,
          });
          onClose();
          setLoading(false);
          window.location.reload();
          return;
        } else {
          setLoading(false);
          addToast(result.errors[0].message, {
            appearance: "error",
            autoDismiss: true,
          });
          onClose();
        }
      })
      .catch((err) => {
        setLoading(false);
        addToast(err.message, {
          appearance: "error",
          autoDismiss: true,
        });
        onClose();
      });
  };

  // let requestBody = {
  //   query: `
  //         query{
  //           accountBalance(userId:"${window.sessionStorage.getItem("userId")}"){
  //             balance
  //             user{
  //               phone
  //               username
  //             }
  //           }
  //         }
  //      `,
  // };
  // const getData = () => {
  //   fetch(BASE_URL, {
  //     method: "POST",
  //     body: JSON.stringify(requestBody),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       balanceHandler(parseFloat(result?.data?.accountBalance?.balance));
  //       handleUserNumber(result?.data?.accountBalance?.user?.phone);
  //       handleUserName(result?.data?.accountBalance?.user?.username);
  //     })
  //     .catch((err) => console.log(err?.message));
  // };

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
            <span className="text-[25px] text-white">Withdraw</span>
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
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setInsufficient(false);
                }}
              />
            </FormControl>

            {insufficient && (
              <span className="text-black text-sm font-semibold">
                Insufficient amount in your wallet!!!
              </span>
            )}
            <p className="text-xs mt-1 text-white">
              <span>*</span>Amount must be between 100 and 70,000
            </p>
          </ModalBody>

          <ModalFooter>
            {loading ? (
              <Spinner />
            ) : (
              <Button
                onClick={() => handleWithdraw()}
                style={{
                  background: "#000",
                  color: "#fff",
                }}
                mr={3}
              >
                Withdraw
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default WithdrawModal;
