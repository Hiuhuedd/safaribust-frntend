import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useAppCtx } from "../context/AppContext";

import logo from "../images/LogoBust.png";
import AffiliateModal from "../partials/Affiliate";
import ChangePasswordModal from "../partials/ChangePasswordModal";
import FAQModal from "../partials/FAQModal";
import HelpModal from "../partials/HelpModal";
import Verification2 from "../partials/Verification2";
import WithdrawModal from "../partials/WithdrawModal";

const BASE_URL = "https://backend.safaribust.co.ke/graphql";

function Sidebar({ isOpen, onClose, btnRef }) {
  const [placement] = React.useState("left");
  const navigate = useNavigate();
  const { token, clearToken } = useAppCtx();
  const { addToast } = useToasts();

  const {
    isOpen: withdrawIsOpen,
    onOpen: withdrawOnOpen,
    onClose: withdrawOnClose,
  } = useDisclosure();
  const {
    isOpen: passIsOpen,
    onOpen: passOnOpen,
    onClose: passOnClose,
  } = useDisclosure();

  const {
    isOpen: helpIsOpen,
    onOpen: helpOnOpen,
    onClose: helpOnClose,
  } = useDisclosure();

  const {
    isOpen: faqIsOpen,
    onOpen: faqOnOpen,
    onClose: faqOnClose,
  } = useDisclosure();

  const {
    isOpen: affiliateIsOpen,
    onOpen: affiliateOnOpen,
    onClose: affiliateOnClose,
  } = useDisclosure();

  const {
    isOpen: verifierIsOpen2,
    onOpen: verifierOnOpen2,
    onClose: verifierOnClose2,
  } = useDisclosure();

  let requestBodyVerify = {
    query: `
        mutation{
        generateOtp(username:"${window.sessionStorage.getItem("username")}"){
          otp
          verified
          user{
          username
       }
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
      .catch((err) => console.log(err));
  };

  return (
    <>
      <WithdrawModal
        isOpen={withdrawIsOpen}
        onOpen={withdrawOnOpen}
        onClose={withdrawOnClose}
      />
      <AffiliateModal
        isOpen={affiliateIsOpen}
        onOpen={affiliateOnOpen}
        onClose={affiliateOnClose}
      />
      <FAQModal isOpen={faqIsOpen} onOpen={faqOnOpen} onClose={faqOnClose} />
      <ChangePasswordModal
        isOpen={passIsOpen}
        onOpen={passOnOpen}
        onClose={passOnClose}
      />
      <HelpModal
        isOpen={helpIsOpen}
        onOpen={helpOnOpen}
        onClose={helpOnClose}
      />
      <Verification2
        isOpen={verifierIsOpen2}
        onOpen={verifierOnOpen2}
        onClose={verifierOnClose2}
        withdrawOnOpen={withdrawOnOpen}
      />
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent
          style={{
            background: "#DD2222",
          }}
        >
          <DrawerHeader
            borderBottomWidth="1px"
            style={{
              background: "#f7f7f7",
            }}
            color={"#fff"}
          >
            <img src={logo} alt="Safaribust Logo" />
          </DrawerHeader>
          <DrawerBody>
            <div className="w-full flex flex-col">
              {token && (
                <div className="flex ">
                  <div
                    onClick={() => {
                      onClose();
                      if (!token) {
                        addToast("To withdraw, you need to login!!!", {
                          appearance: "info",
                          autoDismiss: true,
                        });
                        return navigate("/login");
                      }
                      // generateOtp();
                      // verifierOnOpen2();
                      withdrawOnOpen();
                    }}
                    className={
                      "text-white hover:text-gray-200 duration-200 cursor-pointer font-medium justify-center px-8 py-2 rounded-md flex items-center select-none uppercase text-[20px]"
                    }
                  >
                    Withdraw
                  </div>
                </div>
              )}
              <div className="flex ">
                <div
                  onClick={() => {
                    affiliateOnOpen();
                    onClose();
                  }}
                  className={
                    "text-white hover:text-gray-200 duration-200 cursor-pointer font-medium justify-center px-8 py-2 rounded-md flex items-center select-none uppercase text-[20px]"
                  }
                >
                  Affiliate
                </div>
              </div>
              <div className="flex">
                <div
                  onClick={() => {
                    helpOnOpen();
                    onClose();
                  }}
                  className={
                    "text-white gap-1 first-letter: hover:text-gray-200 duration-200 cursor-pointer uppercase font-medium justify-center px-8 py-2 rounded-md flex items-center select-none text-[20px]"
                  }
                >
                  Help
                </div>
              </div>
              <div className="flex">
                <div
                  onClick={() => {
                    faqOnOpen();
                    onClose();
                  }}
                  className={
                    "text-white gap-1 hover:text-gray-200 duration-200 cursor-pointer uppercase font-medium justify-center px-8 py-2 rounded-md flex items-center select-none text-[20px]"
                  }
                >
                  FAQ
                </div>
              </div>
            </div>
          </DrawerBody>
          <DrawerFooter>
            <div
              className={
                token
                  ? "w-full flex justify-between items-center text-white font-medium"
                  : "w-full flex justify-end items-center text-white font-medium"
              }
            >
              {token ? (
                <div
                  onClick={() => {
                    passOnOpen();
                    onClose();
                  }}
                  className="flex gap-1 items-center border border-black px-2 py-2 justify-center shadow-lg rounded-md"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Change password
                </div>
              ) : (
                ""
              )}
              {token ? (
                <div className=" flex justify-center">
                  <Tooltip label="Logout">
                    <div
                      onClick={() => {
                        clearToken();
                      }}
                      className="h-12 w-12 flex justify-center text-[14px] shadow-md items-center cursor-pointer rounded-md text-[#fff] hover:bg-[#080a0e]"
                    >
                      <svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        ></path>
                      </svg>
                    </div>
                  </Tooltip>
                </div>
              ) : (
                <div className="flex justify-center">
                  <Tooltip label="Login">
                    <div
                      onClick={() => navigate("/login")}
                      className="h-12 w-12 shadow-md flex justify-center text-[14px] items-center cursor-pointer rounded-md text-[#fff]"
                    >
                      <svg
                        className="h-12 w-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        ></path>
                      </svg>
                    </div>
                  </Tooltip>
                </div>
              )}
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default Sidebar;
