import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { Link, useNavigate } from "react-router-dom";
import { useAppCtx } from "../context/AppContext";
import { Spinner, useDisclosure } from "@chakra-ui/react";
// import VerificationModal from "../partials/VerificationModal";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { BASE_URL } from "../utils/Utils"

function Signup() {
  const [phone, setPhone] = useState("+254");
  const [password, setPassword] = useState("");
  const [formError] = useState(false);
  const [username, setUserName] = useState("");
  const navigate = useNavigate();

  const [data] = useState();

  const { addToast } = useToasts();

  const [serverError] = useState("");

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePhoneChange = (phone) => {
    setPhone(phone);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const {
    balanceHandler,
    handleUserNumber,
    handleUserName,
    handleLoading,
    disableLoading,
    loading,
  } = useAppCtx();

  const getData = async (user, token) => {
    let requestBody = {
      query: `
          query{
            accountBalance(userId:"${user}"){
              balance
              user{
                phone
                username
              }
            }
          }
       `,
    };
    await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          balanceHandler(parseFloat(result?.data?.accountBalance?.balance));
          handleUserNumber(result?.data?.accountBalance?.user?.phone);
          handleUserName(result?.data?.accountBalance?.user?.username);
          window.sessionStorage.setItem(
            "username",
            result?.data?.accountBalance?.user?.username
          );
          window.sessionStorage.setItem(
            "phone",
            result?.data?.accountBalance?.user?.phone
          );
          return;
        }
      })
      .catch((err) => console.log(err?.message));
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  let requestBodyVerify = {
    query: `
        mutation{
        generateOtp(username:"${username}", phone:"${phone}"){
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
      .catch((err) => console.log(err));
  };

  let createRequest = {
    query: `
          mutation{
            createUser(userInput:{username:"${username}",
             phone:"${phone.substr( 1,12)}", 
             password:"${password}",
             type:"User"})
            {
            userId
            token
            type
            username
            tokenExpiration
          }
        }
      `,
  };
console.log(createRequest);
  const createUser = async () => {
    handleLoading();
    if (phone.length !== 13) {
      addToast("Invalid phone number", {
        appearance: "warning",
        autoDismiss: true,
      });
      disableLoading();
      return;
    }
    await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(createRequest),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.data) {
          disableLoading();
          addToast("Successfully signed up", {
            appearance: "success",
            autoDismiss: true,
          });
          return navigate("/login", { replace: true });
        } else {
          // setShowOTP(false);
          addToast(result.errors[0].message, {
            appearance: "error",
            autoDismiss: true,
          });
          disableLoading();
          return;
        }
      })
      .catch((err) => {
        addToast(err.message, {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  return (
    <div className="relative bg-black flex flex-col justify-center min-h-screen overflow-hidden">
      {/* <VerificationModal
        data={data}
        getData={getData}
        onClose={onClose}
        isOpen={isOpen}
        onOpen={onOpen}
        username={username.trim()}
        phone={phone}
        password={password}
        generateOtp={generateOtp}
      /> */}
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40  ring-2 ring-[#DD2222] lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-[#DD2222] underline uppercase decoration-wavy">
          Sign up
        </h1>
        <div className="flex w-full justify-center p-4 ">
          <Link to={"/login"}>
            <div className="text-base text-[#000] hover:underline">
              or Login
            </div>
          </Link>
        </div>
        {formError && (
          <div className="text-[#DD2222]">All fields are required!</div>
        )}
        {serverError && <div>{serverError}</div>}
        <form
          className="mt-4 gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (phone.length !== 13) {
              addToast("Invalid phone number", {
                appearance: "warning",
                autoDismiss: true,
              });
              disableLoading();
              return;
            }
            if (username.trim().length > 15) {
              addToast("Invalid username, must be less than 15 characters", {
                appearance: "warning",
                autoDismiss: true,
              });
              disableLoading();
              return;
            }
            if (username.trim().split(" ").length > 1) {
              addToast("Invalid username, must be single word", {
                appearance: "warning",
                autoDismiss: true,
              });
              disableLoading();
              return;
            }
            // generateOtp();
            // onOpen();
            createUser();
          }}
        >
          <div className="mb-2">
            <label
              htmlFor="text"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              type="text"
              onChange={handleUsernameChange}
              value={username}
              placeholder="Username"
              className="block w-full px-4 py-2 mt-2 text-[#000] bg-white border rounded-md focus:border-[#000] focus:ring-[#000] focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="text"
              className="block text-sm font-semibold text-gray-800"
            >
              Phone
            </label>
            <PhoneInput
              value={phone}
              onChange={(value) => handlePhoneChange(value)}
              defaultCountry="KE"
              id="phone-input"
            />
            `
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              className="block w-full px-4 py-2 mt-2 text-[#000] bg-white border rounded-md focus:border-[#000] focus:ring-[#000] focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6 flex justify-center">
            {loading ? (
              <Spinner color="red.500" />
            ) : (
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#DD2222] rounded-md hover:bg-[#8f0404] focus:outline-none focus:bg-[#8f0404]"
              >
                Signup
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
