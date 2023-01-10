import React, { useEffect, useState } from "react";
import MyBets from "../partials/MyBets";
import GameArea from "../partials/GameArea";
import Header from "../partials/Header";
import HistoryBar from "../partials/HistoryBar";
import SideBar from "../partials/SideBar";
import { useAppCtx } from "../context/AppContext";
import socketIOClient from "socket.io-client";

import { encrypt, decrypt, compare } from "n-krypta";

import { BASE_URL } from "../utils/Utils"
// const ENDPOINT = "http://localhost:8050";       
const ENDPOINT = "https://sb-transactions-checker-czy7.onrender.com";  

const socket = socketIOClient(ENDPOINT);

const secret = "my-super-secret";

function Home() {
  const [vals, setVals] = useState();
  const [vals2, setVals2] = useState();

  const {
    token,
    handleToken,
    balanceHandler,
    handleUserNumber,
    handleUserName,
    handleMyBets,
    userId,
    caller,
  } = useAppCtx();

  const { running2 } = useAppCtx();

  const [autoCaller, setAutoCaller] = useState(false);
  // console.log(window.sessionStorage.getItem("userId"))
  let requestBody = {
    query: `
          query{
            accountBalance(userId:"${window.sessionStorage.getItem("userId")}"){
              balance
              user{
                phone
                username
              }
            }
          }
       `,
  };
  const getData = async () => {
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
        // console.log(+result?.data?.accountBalance)
        balanceHandler(+result?.data?.accountBalance?.balance);
        handleUserNumber(result?.data?.accountBalance?.user?.phone);
        handleUserName(result?.data?.accountBalance?.user?.username);
        window.localStorage.setItem("hr", false);
        window.localStorage.setItem(
          "hrm",
          encrypt(parseFloat(+result?.data?.accountBalance?.balance), secret)
        );
        window.localStorage.setItem("hrm2", 0);
      })
      .catch((err) => console.log(err?.message));
  };

  let requestBody2 = {
    query: `
        query{
            bets(userId:"${userId}"){
              serverSeed
              clientSeed
              nonce
              amount
              betAmount
              point
              win
              user{
                phone
                username
            }
        }
      }        
    `,
  };
  const getBets = async () => {
    await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(requestBody2),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.data?.bets.length > 0) {
          handleMyBets(result?.data?.bets);
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    getData();
    getBets();
    const token = window.localStorage.getItem("token");
    if (token) {
      handleToken(token);
    }
  }, [caller, autoCaller]);

  function generateRandomFloatInRange(min, max) {
    return parseFloat(Math.random() * (max - min + 1) + min).toFixed(0);
  }
  useEffect(() => {
    setVals(generateRandomFloatInRange(547, 589));
    setVals2(generateRandomFloatInRange(327, 346));
  }, [running2]);

  let amt = window.localStorage.getItem("hrm");
  let amt2 = window.localStorage.getItem("hrm2");

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        if (parseFloat(+amt) > 0) {
          refund(decrypt(amt, secret));
          window.localStorage.setItem("hrm", encrypt(0, secret));
          window.localStorage.setItem("hrm2", encrypt(0, secret));
          return;
        }
        //;
        // if(parseFloat(+amt2) > 0){
        //   updateBalance(parseFloat(+amt2).toFixed(2))
        //   window.localStorage.setItem("hrm2", 0);
        // }
      }
    }
  }, []);

  // const updateBalance = async (amt) => {
  //   let addRequest = {
  //     query: `
  //       query{
  //         accountBalanceUpdate(userId:"${window.sessionStorage.getItem(
  //           "userId"
  //         )}", amount:"${amt}"){
  //           balance

  //         }
  //       }

  //     `,
  //   };
  //   await fetch(BASE_URL, {
  //     method: "POST",
  //     body: JSON.stringify(addRequest),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res) {
  //         handleCaller();
  //         return res;
  //       }
  //     })
  //     .catch((err) => console.log(err.messge));
  // };

  const finisher = async (trans_id) => {
    let requ = {
      query: `
       query{
        transactionDetails(trans_id:"${trans_id}"){
          balance
        }
      }
        
      `,
    };
    await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(requ),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          // setAutoCaller(!autoCaller);
          getData();
          return res;
        }
      })
      .catch((err) => console.log(err.messge));
  };

  useEffect(() => {
    socket.on("FromAPI2", (data) => {
    
      if (data.deposited === true) {
        console.log(data.deposited);
        // setAutoCaller(!autoCaller);
        getData();
        finisher(data.trans_id);
      }
    });
  }, []);

  const refund = async (val) => {
    let addRequest = {
      query: `
        query{
          refundAccount(userId:"${window.sessionStorage.getItem(
            "userId"
          )}", amount:"${val}"){
            balance
            user{
              phone
            }
          }
        }
        
      `,
    };
    await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(addRequest),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          window.localStorage.setItem("hrm", 0);
          window.localStorage.setItem("hrm2", 0);
          getData();
          return res;
        }
      })
      .catch((err) => console.log(err.messge));
  };
  // useEffect(() => {
  //   let timer;
  //   if (userId) {
  //     timer = setInterval(() => {
  //       getBal();
  //     }, 30000);
  //   }
  //   return () => clearInterval(timer);
  // }, []);

  // let reqB = {
  //   query: `
  //     query{
  //       accountBalanceUpdate(userId:"${userId}",amount:"${accountBalance}"){
  //         balance
  //       }
  //     }
  //      `,
  // };

  // const updateBalance = async () => {
  //   await fetch(BASE_URL, {
  //     method: "POST",
  //     body: JSON.stringify(reqB),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then(async (result) => {})
  //     .catch((err) => console.log(err?.message));
  // };

  // const getBal = async () => {
  //   await fetch(BASE_URL, {
  //     method: "POST",
  //     body: JSON.stringify(requestBody),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then(async (result) => {
  //       if (
  //         parseFloat(result?.data?.accountBalance?.balance).toFixed(2) !==
  //         parseFloat(accountBalance).toFixed(2)
  //       ) {
  //         updateBalance();
  //         return;
  //       }
  //     })
  //     .catch((err) => console.log(err?.message));
  // };
  return (
    <div className="md:flex relative  bg-[#12151B] min-h-screen md:h-screen  w-full overflow-hidden flex-col">
      <Header />
      <div className="text-white mt-[80px] md:mt-20 w-full flex flex-col-reverse md:flex-row">
        <SideBar />
        <div className="md:p-4 p-0 w-[100%] gap-2 md:gap-4  md:w-[75%]  h-full flex flex-col relative">
          <div className="bg-[#12151B] md:hidden flex justify-between px-4 py-1">
            <div className="text-xs">
              Online: <span className="text-red-500">{vals}</span>
            </div>
            <div className="text-xs">
              Playing: <span className="text-red-500">{vals2}</span>
            </div>
          </div>
          <HistoryBar />
          <GameArea />
          <MyBets />
          <div className="sticky bottom-0 flex text-[12px] w-full justify-center text-center  py-1 px-2 bg-[#1f242c]">
            Strictly NOT for persons under the age of 18. Please gamble
            responsibly. Licensed by BCLB under licence No. 0002738.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
