/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Spinner } from "@chakra-ui/react";
import { useAppCtx } from "../context/AppContext";
import ForgotPasswordModal from "../partials/ForgotPassword";
import { BASE_URL } from "../utils/Utils"
 
function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useNavigate();
  const { addToast } = useToasts();

  const {
    handleToken,
    handleLoading,
    disableLoading,
    loading,
    handleUserId,
    handleCaller,
    disableLoggedOut,
    checkSession,
  } = useAppCtx();

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  let loginRequest = {
    query: `
          query{
            login(loginInput:{
            username:"${username.trim()}", 
            password:"${password}"})
            {
            token
            tokenExpiration
            dataToken
            phone
            userId
            online
            type
          }
        }
      `,
  };
  const loginUser = async () => {
    handleLoading();
    
    await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(loginRequest),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
    console.log(result);
        if (result.data) {
          if (
            window.localStorage.getItem("userId") !==
              result?.data?.login?.userId &&
            window.localStorage.getItem("userId") !== null
          ) {
            addToast(
              "Open a different browser/device to login to your other account",
              { appearance: "warning", autoDismiss: "true" }
            );
            disableLoading();
            return;
          }
          if (result?.data?.login.type === "User") {
            handleToken(result?.data?.login?.token);
            handleUserId(result?.data?.login?.userId);
            window.localStorage.setItem("userId", result?.data?.login?.userId);
            // getData(result?.data?.login?.userId, result?.data?.login?.token);
            window.sessionStorage.setItem("username", username);
            window.localStorage.setItem("username", username);
            window.sessionStorage.setItem(
              "userId",
              result?.data?.login?.userId
            );
            window.localStorage.setItem("userId", result?.data?.login?.userId);
            window.sessionStorage.setItem("phone", result?.data?.login?.phone);
            window.localStorage.setItem("phone", result?.data?.login?.phone);
            window.sessionStorage.setItem(
              "dataToken",
              result?.data?.login?.dataToken
            );

            window.sessionStorage.setItem(
              "accessToken",
              result?.data?.login?.token
            );
            window.localStorage.setItem(
              "accessToken",
              result?.data?.login?.token
            );
            checkSession();
            addToast("Successfully signed in", {
              appearance: "success",
              autoDismiss: true,
            });
            disableLoading();
            // handleCaller();
            disableLoggedOut();

            return router("/", { replace: true });
          } else {
            addToast("Register as player to play!", {
              appearance: "error",
              autoDismiss: true,
            });
            disableLoading();
          }
        } else {
          addToast(result.errors[0].message, {
            appearance: "error",
            autoDismiss: true,
          });
          disableLoading();
          return;
        }
      })
      .catch((err) => console.log(err?.message));
  };

  // const getData = async (user, token) => {
  //   let requestBody = {
  //     query: `
  //         query{
  //           accountBalance(userId:"${user}"){
  //             balance
  //             user{
  //               phone
  //               username
  //             }
  //           }
  //         }
  //      `,
  //   };
  //   await fetch(BASE_URL, {
  //     method: "POST",
  //     body: JSON.stringify(requestBody),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       if (result) {
  //         balanceHandler(parseFloat(result?.data?.accountBalance?.balance));
  //         handleUserNumber(result?.data?.accountBalance?.user?.phone);
  //         handleUserName(result?.data?.accountBalance?.user?.username);
  //         return;
  //       }
  //     })
  //     .catch((err) => console.log(err?.message));
  // };

  return (
    <div className="relative bg-black flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40  ring-2 ring-[#DD2222] lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-[#DD2222] underline uppercase decoration-wavy">
          Sign in
        </h1>
        <ForgotPasswordModal
          onOpen={onOpen}
          isOpen={isOpen}
          onClose={onClose}
        />
        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            loginUser();
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

          <a
            onClick={onOpen}
            href="#"
            className="text-xs text-[#000] hover:underline"
          >
            Forgot Password?
          </a>
          <div className="mt-6 flex justify-center">
            {loading ? (
              <Spinner color="red.500" />
            ) : (
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#DD2222] rounded-md hover:bg-[#8f0404] focus:outline-none focus:bg-[#8f0404]"
              >
                Login
              </button>
            )}
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <Link to={"/signup"}>
            <div className="font-medium text-[#DD2222] hover:underline">
              Sign up
            </div>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
