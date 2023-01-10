import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { useAppCtx } from "../context/AppContext";
import CurrencyFormat from "react-currency-format";

import { BASE_URL } from "../utils/Utils";

function OverviewModal({ isOpen, onClose }) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [data, setData] = useState(null);
  const [deposits, setDeposits] = useState(null);
  const [withdrawal, setWithDrawal] = useState(null);

  const { token, accountBalance } = useAppCtx();

  const requestBodyTotals = {
    query: `
        query{
          userTT(userId:"${window.sessionStorage.getItem("userId")}"){
            tax
            won
            lost
          }
        }      
    `,
  };

  const handleFetchTotals = async () => {
    await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(requestBodyTotals),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.data !== null) {
          // console.log(resp);
          setData(resp.data.userTT);
        }
      });
  };

  let reqDeposits = {
    query: `query{
        totalDeposits(userId:"${window.sessionStorage.getItem("userId")}"){
        amount
        }
      } `,
  };

  const handleFetchDeposits = async () => {
    await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(reqDeposits),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.data !== null) {
          // console.log(resp);
          setDeposits(resp.data.totalDeposits);
        }
      });
  };

  let reqWithdrawal = {
    query: `
      query{
          totalWidrawal(phone:"${window.sessionStorage.getItem("phone")}"){
            amount
          }
        } 
    `,
  };

  const handleFetchWidthdrawal = async () => {
    await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(reqWithdrawal),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.data !== null) {
          // console.log(resp);
          setWithDrawal(resp.data.totalWidrawal);
        }
      });
  };

  useEffect(() => {
    handleFetchTotals();
    handleFetchDeposits();
    handleFetchWidthdrawal();
  }, []);

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
            background: "white",
          }}
        >
          <ModalHeader>
            <span className="text-[25px] text-black ">Account Overview</span>
          </ModalHeader>

          <ModalBody pb={6}>
            <div className="grid grid-cols-2 gap-10 justify-center">
              <div className="flex justify-center flex-col shadow-md gap-4  px-2 py-1">
                <div className="text-gray-400 text-[12px] flex justify-between">
                  Current Balance
                  <svg
                    className="w-4 h-4 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    ></path>
                  </svg>
                </div>
                <div className="text-[18px] font-medium">
                  {" "}
                  <CurrencyFormat
                    value={parseFloat(accountBalance).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"KSH"}
                  />
                </div>
              </div>
              <div className="flex justify-center flex-col shadow-md gap-4  px-2 py-1">
                <div className="text-gray-400 text-[12px] flex justify-between">
                  Total Deposits
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 text-red-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                    />
                  </svg>
                </div>
                <div className="text-[18px] font-medium">
                  {" "}
                  <CurrencyFormat
                    value={deposits && deposits.amount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"KSH"}
                  />
                </div>
              </div>
              <div className="flex justify-center flex-col shadow-md gap-4  px-2 py-1">
                <div className="text-gray-400 text-[12px] flex justify-between">
                  Total Withdrawal
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 text-red-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                    />
                  </svg>
                </div>
                <div className="text-[18px] font-medium">
                  {" "}
                  <CurrencyFormat
                    value={withdrawal && withdrawal.amount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"KSH"}
                  />
                </div>
              </div>
              <div className="flex justify-center flex-col shadow-md gap-4  px-2 py-1">
                <div className="text-gray-400 text-[12px] flex justify-between">
                  Total Tax Paid
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 text-red-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-[18px] font-medium">
                  {" "}
                  <CurrencyFormat
                    value={data && data.tax}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"KSH"}
                  />
                </div>
              </div>
              <div className="flex justify-center flex-col shadow-md gap-4  px-2 py-1">
                <div className="text-gray-400 text-[12px] flex justify-between">
                  Total Bets Won
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 text-red-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg>
                </div>
                <div className="text-[18px] font-medium">
                  {" "}
                  <CurrencyFormat
                    value={data && data.won}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </div>
              </div>
              <div className="flex justify-center flex-col shadow-md gap-4  px-2 py-1">
                <div className="text-gray-400 text-[12px] flex justify-between">
                  Total Bets Lost
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 text-red-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
                    />
                  </svg>
                </div>
                <div className="text-[18px] font-medium">
                  {" "}
                  <CurrencyFormat
                    value={data && data.lost}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export default OverviewModal;
