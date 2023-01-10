import React, { useEffect, useState } from "react";
import { useAppCtx } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@chakra-ui/react";
import { useToasts } from "react-toast-notifications";
import { useDisclosure } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Button,
  MenuDivider,
} from "@chakra-ui/react";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";
import ChangePasswordModal from "./ChangePasswordModal";
import HelpModal from "./HelpModal";
import FAQ from "./FAQModal";
import Affiliate from "./Affiliate";
import logo from "../images/LogoBust.png";
import CurrencyFormat from "react-currency-format";
import Sidebar from "../components/Sidebar";
import Verification from "./Verification";
import Verification2 from "./Verification2";
import BetHistoryModal from "./BetHistoryModal";
import Verification3 from "./Verıfıcation3";
import OverviewModal from "./OverviewModal";

const BASE_URL = "https://backend.safaribust.co.ke/graphql";

function Header() {
  const { accountBalance, userName, token, clearToken, handleCaller } =
    useAppCtx();

  const navigate = useNavigate();
  const { addToast } = useToasts();

  let reqLogout = {
    query: `
      query{
        logout(username:"${window.sessionStorage.getItem(
          "username"
        )}",initiator:"${window.sessionStorage.getItem("username")}" ){
        active
        username
      }
    }`,
  };

  async function logout() {
    await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(reqLogout),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.data) {
          return;
        }
        addToast(result.errors[0].message, {
          appearance: "error",
          autoDismiss: true,
        });
      })
      .catch((err) => console.log(err));
  }

  const {
    isOpen: menuIsOpen,
    onOpen: menuOnOpen,
    onClose: menuOnClose,
  } = useDisclosure();
  const btnRef = React.useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: withdrawIsOpen,
    onOpen: withdrawOnOpen,
    onClose: withdrawOnClose,
  } = useDisclosure();

  const {
    isOpen: overviewIsOpen,
    onOpen: overviewOnOpen,
    onClose: overviewOnClose,
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
    isOpen: verifierIsOpen,
    onOpen: verifierOnOpen,
    onClose: verifierOnClose,
  } = useDisclosure();
  const {
    isOpen: verifierIsOpen2,
    onOpen: verifierOnOpen2,
    onClose: verifierOnClose2,
  } = useDisclosure();
  const {
    isOpen: verifierIsOpen3,
    onOpen: verifierOnOpen3,
    onClose: verifierOnClose3,
  } = useDisclosure();
  const {
    isOpen: historyIsOpen,
    onOpen: historyOnOpen,
    onClose: historyOnClose,
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

  const [pageState, setPageState] = React.useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 0,
    pageSize: 50,
  });

  let reqBody = {
    query: `
  query{
  historyBets(userId:"${window.sessionStorage.getItem("userId")}"){
    _id
    serverSeed
    clientSeed
    nonce
    amount
    betAmount
    point
    round
    win
    tax
    createdAt
  }
}`,
  };

  const fetchHistory = async () => {
    await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.data.historyBets) {
          setPageState((old) => ({
            ...old,
            isLoading: false,
            data: response.data.historyBets,
            total: response.data.historyBets.length,
            pageSize: 20,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (newPage) => {
    setPageState((old) => ({ ...old, page: newPage }));
  };

  return (
    <header className="fixed w-full h-[70px] md:h-[80px] top-0 text-white bg-black shadow-md z-50">
      <DepositModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <WithdrawModal
        isOpen={withdrawIsOpen}
        onOpen={withdrawOnOpen}
        onClose={withdrawOnClose}
      />
      <OverviewModal
        isOpen={overviewIsOpen}
        onOpen={overviewOnOpen}
        onClose={overviewOnClose}
      />
      <Affiliate
        isOpen={affiliateIsOpen}
        onOpen={affiliateOnOpen}
        onClose={affiliateOnClose}
      />
      <FAQ isOpen={faqIsOpen} onOpen={faqOnOpen} onClose={faqOnClose} />
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
      <Verification
        isOpen={verifierIsOpen}
        onOpen={verifierOnOpen}
        onClose={verifierOnClose}
        passOnOpen={passOnOpen}
        generateOtp={generateOtp}
      />

      <Verification2
        isOpen={verifierIsOpen2}
        onOpen={verifierOnOpen2}
        onClose={verifierOnClose2}
        withdrawOnOpen={withdrawOnOpen}
        generateOtp={generateOtp}
      />

      <Verification3
        isOpen={verifierIsOpen3}
        onOpen={verifierOnOpen3}
        onClose={verifierOnClose3}
        overviewOnOpen={overviewOnOpen}
        generateOtp={generateOtp}
      />

      <BetHistoryModal
        isOpen={historyIsOpen}
        onClose={historyOnClose}
        pageState={pageState}
        handlePageChange={handlePageChange}
      />

      <Sidebar isOpen={menuIsOpen} onOpen={menuOnOpen} onClose={menuOnClose} />

      <div className="flex w-full h-full md:pr-4 items-center md:justify-between">
        <div className="flex items-center">
          <div className="w-[150px] md:w-[340px] h-[70px]  md:h-[80px] flex items-center justify-center bg-[#f7f7f7]">
            <img
              alt="safaribust logo"
              src={logo}
              className="w-[150px] md:w-[340px] h-[70px] md:h-[80px] object-fill md:object-cover"
            />
          </div>
        </div>
        <div className="flex gap-10  pl-4 justify-evenly w-full items-center">
          <div className="md:flex hidden md:visible">
            <div
              onClick={() => {
                affiliateOnOpen();
              }}
              className={
                token
                  ? " text-gray-500 hover:text-gray-200 duration-200 cursor-pointer font-medium justify-center px-8 py-2 rounded-md flex items-center select-none uppercase text-[12px]"
                  : "text-gray-500 hover:text-gray-200 duration-200 cursor-pointer font-medium justify-center px-8 py-2 rounded-md flex items-center select-none uppercase text-[12px] w-[150px]"
              }
            >
              Affiliate
            </div>
          </div>
          <div className="md:flex hidden md:visible">
            <div
              onClick={() => {
                faqOnOpen();
              }}
              className={
                token
                  ? " text-gray-500 gap-1 hover:text-gray-200 duration-200 cursor-pointer uppercase font-medium justify-center px-8 py-2 rounded-md flex items-center select-none text-[12px]"
                  : " text-gray-500 gap-1 uppercase hover:text-gray-200 duration-200 cursor-pointer  font-medium justify-center px-8 py-2 rounded-md flex items-center select-none text-[12px] w-[150px]"
              }
            >
              <svg
                className="w-6 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              FAQ
            </div>
          </div>
          <div className="md:flex hidden md:visible">
            <div
              onClick={() => helpOnOpen()}
              className={
                token
                  ? " text-gray-500 gap-1 first-letter: hover:text-gray-200 duration-200 cursor-pointer uppercase font-medium justify-center px-8 py-2 rounded-md flex items-center select-none text-[12px]"
                  : " text-gray-500 gap-1 hover:text-gray-200 duration-200 cursor-pointer uppercase font-medium justify-center px-8 py-2 rounded-md flex items-center select-none text-[12px] w-[150px]"
              }
            >
              <svg
                className="w-6 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Help
            </div>
          </div>
          <div className="flex md:flex-row flex-col  gap-1 md:gap-0 items-start">
            {token && userName?.length > 0 && (
              <div className="hidden md:visible">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 text-[#DD2222] hover:text-[#a20c0c] cursor-pointer"
                  onClick={() => {
                    handleCaller();
                  }}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
            )}
            {token && userName?.length > 0 && (
              <div className="md:bg-[#12151B] shadow-md gap-3 select-none py-1 md:p-2 rounded-l-md flex font-medium justify-center items-center text-[16px] md:text-[14px]">
                {/* {formatValue(accountBalance)} */}
                <CurrencyFormat
                  value={isNaN(accountBalance) ? 0 : accountBalance.toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"KSH"}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 text-[#DD2222] hover:text-[#a20c0c] cursor-pointer"
                  onClick={() => {
                    handleCaller();
                  }}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
            )}
            <div
              onClick={() => {
                if (!token || userName.length === 0) {
                  addToast("To deposit, you need to login!!!", {
                    appearance: "info",
                    autoDismiss: true,
                  });
                  return navigate("/login");
                }
                // addToast(
                //   "This feature is under maintenance. Try again later!!!",
                //   {
                //     appearance: "info",
                //     autoDismiss: true,
                //   }
                // );
                onOpen();
              }}
              className={
                "bg-[#DD2222] hover:bg-[#a20c0c] font-medium duration-200 shadow-md cursor-pointer justify-center px-3 md:px-8 py-1 md:py-2 rounded-md flex items-center uppercase select-none text-[12px]"
              }
            >
              Deposit
            </div>
          </div>

          {token && userName?.length > 0 && (
            <div className=" hidden md:flex">
              <Menu
                style={{ color: "#000 !important" }}
                className="md:flex hidden md:visible"
              >
                <MenuButton as={Button} colorScheme="none">
                  <div
                    //onClick={getData}
                    className="flex items-center gap-2 text-[14px] cursor-pointer bg-[#12151B] hover:bg-[#080a0e] shadow-md rounded-md p-2"
                  >
                    <svg
                      className="w-6 h-6 text-[#DD2222]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <div>{userName !== null && userName}</div>
                  </div>
                </MenuButton>
                <MenuList color={"#fff"} background={"#12151B"}>
                  <MenuGroup title="Account" className="text-[#DD2222]">
                    <MenuItem
                      _hover={{
                        background: "#080a0e",
                      }}
                      _focus={{
                        background: "#080a0e",
                      }}
                      onClick={() => {
                        if (!token) {
                          addToast("To withdraw, you need to login!!!", {
                            appearance: "info",
                            autoDismiss: true,
                          });
                          return navigate("/login");
                        }
                        // ;
                        // generateOtp();
                        // verifierOnOpen3();
                        addToast(
                          "This feature is under maintenance. Try again later!!!",
                          {
                            appearance: "info",
                            autoDismiss: true,
                          }
                        );
                        // overviewOnOpen();
                      }}
                    >
                      Overview
                    </MenuItem>
                    <MenuItem
                      _hover={{
                        background: "#080a0e",
                      }}
                      _focus={{
                        background: "#080a0e",
                      }}
                      onClick={() => {
                        if (!token) {
                          addToast("To withdraw, you need to login!!!", {
                            appearance: "info",
                            autoDismiss: true,
                          });
                          return navigate("/login");
                        }
                        // ;
                        // generateOtp();
                        // verifierOnOpen2();
                        withdrawOnOpen();
                      }}
                    >
                      Withdraw
                    </MenuItem>
                    <MenuItem
                      _hover={{
                        background: "#080a0e",
                      }}
                      _focus={{
                        background: "#080a0e",
                      }}
                      onClick={() => {
                        if (!token) {
                          addToast("To view history, you need to login!!!", {
                            appearance: "info",
                            autoDismiss: true,
                          });
                          return navigate("/login");
                        }
                        fetchHistory();
                        historyOnOpen();

                        // ;
                        // generateOtp();
                        //  verifierOnOpen2();
                      }}
                    >
                      Bet History
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title="Settings" className="text-[#DD2222]">
                    <MenuItem
                      _hover={{
                        background: "#080a0e",
                      }}
                      _focus={{
                        background: "#080a0e",
                      }}
                      onClick={() => {
                        if (!token) {
                          addToast("To withdraw, you need to login!!!", {
                            appearance: "info",
                            autoDismiss: true,
                          });
                          return navigate("/login");
                        }
                        generateOtp();
                        verifierOnOpen2();
                      }}
                    >
                      {" "}
                      Change Password
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </div>
          )}
          {window.sessionStorage.getItem("accessToken") &&
          userName?.length > 0 ? (
            <div className="hidden md:flex ">
              <Tooltip label="Logout">
                <div
                  onClick={() => clearToken()}
                  className="h-8 w-8 bg-[#12151B] flex justify-center text-[14px] shadow-md items-center cursor-pointer rounded-md text-[#DD2222] hover:bg-[#080a0e]"
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
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                </div>
              </Tooltip>
            </div>
          ) : (
            <div className="hidden md:flex">
              <Tooltip label="Login">
                <div
                  onClick={() => navigate("/login")}
                  className="h-8 w-8 bg-[#12151B] shadow-md hover:bg-[#080a0e] flex justify-center text-[14px] items-center cursor-pointer rounded-md text-[#DD2222]"
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
                      strokeWidth="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    ></path>
                  </svg>
                </div>
              </Tooltip>
            </div>
          )}
          <div
            ref={btnRef}
            onClick={menuOnOpen}
            className="w-full md:hidden cursor-pointer flex justify-end pr-4 items-center"
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
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
