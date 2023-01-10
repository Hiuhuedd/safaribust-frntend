import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAppCtx } from "./context/AppContext";
import socketIOClient from "socket.io-client";

// Import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Game from "./pages/Game";
import { useDisclosure } from "@chakra-ui/react";
import Redirector from "./partials/Redirector";
import Getway from "./pages/Getway";

const BASE_URL = "https://backend.safaribust.co.ke/graphql";
// const ENDPOINT = "https://checker.safaribust.co.ke"//https://deposit-checker.herokuapp.com https://checker.safaribust.co.ke

// const socket = socketIOClient(ENDPOINT);
function App() {
  const { isOpen, onClose } = useDisclosure();
  const location=useLocation()
  const path=useNavigate()

  const {
    token,
    caller
  } = useAppCtx();

  // let requestBody = {
  //   query: `
  //         query{
  //           accountBalance(userId:"${window.sessionStorage.getItem('userId')}"){
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
  //       balanceHandler(+result?.data?.accountBalance?.balance);
  //       // handleUserNumber(result?.data?.accountBalance?.user?.phone);
  //       // handleUserName(result?.data?.accountBalance?.user?.username);
  //       window.localStorage.setItem("hr", false);
  //       window.localStorage.setItem("hrm", +result?.data?.accountBalance?.balance);
  //     })
  //     .catch((err) => console.log(err?.message));
  // };

  // const finisher = async (trans_id) => {
  //   let requ = {
  //     query: `
  //      query{
  //       transactionDetails(trans_id:"${trans_id}"){
  //         balance
  //       }
  //     }
        
  //     `,
  //   };
  //   await fetch(BASE_URL, {
  //     method: "POST",
  //     body: JSON.stringify(requ),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.data) {
  //         handleCaller();
  //         return res;
  //       }
  //     })
  //     .catch((err) => console.log(err.messge));
  // };

  // useEffect(() => {
  //   socket.on("FromAPI2", (data) => {
  //     console.log(data)
  //     if(data.deposited){
  //       finisher(data.trans_id)
  //       handleCaller();
  //     }
  //   });
  // }, []);


  //  const checkSession = async () => {
  
  //   let rq = {
  //     query: `
  //         query{
  //           aUser(username:"${window.sessionStorage.getItem("username")}"){
  //           dataToken
  //           }
  //         }
  //     `,
  //   };
  //   await fetch(BASE_URL, {
  //     method: "POST",
  //     body: JSON.stringify(rq),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       if (
  //         result.data.aUser.dataToken !==
  //         window.sessionStorage.getItem("dataToken")
  //       ) {
  //         if(expired){
  //           window.location.reload()
  //           return
  //         }
  //         checkSession2()
  //         clearToken()
  //         return path("/login", {replace:true})
  //       }
    
  //     })
  //     .catch((err) => {
  //         checkSession2()
  //         clearToken()
  //         if(location.pathname.includes("login")){
  //         return
  //         }
  //         return path("/getway", {replace:true})
  //     });
  // };

  // useEffect(()=>{
  //   let interval=setInterval(()=>{
  //     checkSession()
  //   },1800000)
    
  //   return ()=>clearInterval(interval)
  // },[])

   

//   let reqLogout = {
//     query: `
//       query{
//         logout(username:"${window.sessionStorage.getItem(
//           "username"
//         )}",initiator:"${window.sessionStorage.getItem("username")}" ){
//         active
//         username
//       }
//     }`,
//   };

//   async function logout(e) {
//     await fetch(BASE_URL, {
//       method: "POST",
//       body: JSON.stringify(reqLogout),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         if (result.data) {
//           clearToken();
//           return;
//         }
//       })
//       .catch((err) => console.log(err));
//   }
// useEffect(() => {
//     async function logout(e) {
//     await fetch(BASE_URL, {
//       method: "POST",
//       body: JSON.stringify(reqLogout),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         if (result.data) {
//           clearToken();
//           return;
//         }
//       })
//       .catch((err) => console.log(err));
//   }
//     window.addEventListener("beforeunload", logout);
//     return () => {
//       window.removeEventListener("beforeunload", logout)  
//     };
//   }, []);

  useEffect(()=>{
    let accessToken=window.localStorage.getItem("accessToken")
    let username=window.localStorage.getItem("username")
    let phone=window.localStorage.getItem("phone")
    let userId=window.localStorage.getItem("userId")
    if(accessToken){
      window.sessionStorage.setItem("username", username);
      window.sessionStorage.setItem("userId", userId);
      window.sessionStorage.setItem("phone", phone);
      window.sessionStorage.setItem("accessToken", accessToken);
      }
  },[])

  return (
    <>
    <Redirector onClose={onClose} isOpen={isOpen}/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/game" element={<Game />} />
        <Route exact path="/getway" element={<Getway />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;

