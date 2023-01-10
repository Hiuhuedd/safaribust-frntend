import * as React from "react";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useAppCtx } from "../context/AppContext";
import { useToasts } from "react-toast-notifications";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
};

import { BASE_URL } from "../utils/Utils"

export default function BalanceModal({ open, handleClose, data }) {
  const [value, setValue] = React.useState(0);
  const [add, setAdd] = React.useState(false);
  const [deduct, setDeduct] = React.useState(false);
  const [verified, setVerified] = React.useState(false);

  const { handleFetchAccounts } = useAppCtx();

  const { addToast } = useToasts();

  let requestBodyDeduct = {
    query: `
        query{
          deductAccountBalance(userId:"${data?.user?._id}", amount:"${value}"){
            balance
            user{
              phone
            }
          }
        }
        
      `,
  };

  const handleDeduct = async () => {
    setDeduct(true);
    await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(requestBodyDeduct),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setDeduct(false);
        if (result?.data?.deductAccountBalance) {
          addToast("Ruquest successful", {
            appearance: "success",
            autoDismiss: true,
          });
          setVerified(false);
          setValue(0);
          handleFetchAccounts();
          handleClose();
          return;
        }
        addToast("Request not successful", {
          appearance: "error",
          autoDismiss: true,
        });
      })
      .catch((err) => console.log(err.message));
  };

  let addRequest = {
    query: `
        query{
          refundAccount(userId:"${data?.user?._id}", amount:"${value}"){
            balance
            user{
              phone
            }
          }
        }
        
      `,
  };

  const handleAdd = async () => {
    setAdd(true);
    await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(addRequest),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //  console.log(result);
        setAdd(false);
        if (result?.data?.refundAccount) {
          addToast("Ruquest successful", {
            appearance: "success",
            autoDismiss: true,
          });
          setVerified(false);
          setValue(0);
          handleFetchAccounts();
          handleClose();
          return;
        }
        addToast("Request not successful", {
          appearance: "error",
          autoDismiss: true,
        });
      })
      .catch((err) => console.log(err.message));
  };
  const [otp, setOtp] = useState("");

  let verifyRequest = {
    query: `
    query{
        verifyOtp(otp:"${otp}"){
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
        console.log(result.data.verifyOtp.verified);
        if (result.data.verifyOtp.verified) {
          setVerified(true);
          addToast("Verification success", {
            appearance: "success",
            autoDismiss: true,
          });
          return;
        } else {
          addToast(result.errors[0].message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      })
      .catch((err) => {
        addToast("Invalid OTP!!!", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          setOtp("");
          setVerified(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}></Box>
      </Modal>
    </div>
  );
}

/**
 *
 */
