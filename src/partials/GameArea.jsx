import React, { useEffect, useState } from "react";
import { useAppCtx } from "../context/AppContext";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";
import { LineWave } from "react-loader-spinner";
import socketIOClient from "socket.io-client";
import useCountDown from "react-countdown-hook";
import Lottie from "lottie-react-web";
import animation from "../images/112854-congratulations.json";
import { encrypt, decrypt, compare } from "n-krypta";
import { BASE_URL } from "../utils/Utils" 
import GaugeChart from "react-gauge-chart";
const ENDPOINT = "https://sb-algorithm-tvll.onrender.com";   
// const ENDPOINT = "http://localhost:5000";                     

const initialTime = 5 * 1000; // initial time in milliseconds, defaults to 60000
const interval = 1000; // interval to change remaining time amount, defaults to 1000
const socket = socketIOClient(ENDPOINT);

const secret = "my-super-secret";

function GameArea() {
  const [amount, setAmount] = useState(100);
  const [cashoutValue, setCashoutValue] = useState(2);

  const [slowNet, setSlowNet] = useState(false);
  const [shouldBet, setShoudBet] = useState(true);

  const [timeLeft, { start }] = useCountDown(initialTime, interval);
  const {
    userId,
    accountBalance,
    token,
    handleCrashHitory,
    handleTimeOut,
    handleUsers,
    handleAddBets,
    userName,
    handleLiveBets,
    loggedOut,
    handleRunning2,
    deductAccountBalance,
    addAccountBalance,
    clearToken,
    handlePoint,
  } = useAppCtx();

  const [auto, setAuto] = useState(true);
  const [bet, setBet] = useState(false);
  const [runningPoint] = useState(false);
  const [congratulations, setCongratulation] = useState(false);
  const [failed, setFailed] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  const [done] = useState(false);

  let bustTime = [];

  //NEW States
  const [startBet, setStartBet] = useState(false);
  const [betActive, setBetActive] = useState(false);
  const [showCancel, setShowCancel] = useState(true);

  const navigate = useNavigate();

  const { addToast } = useToasts();

  const [response, setResponse] = useState("");
  const [time, setTime] = useState(1.0);
  const [point, setPoint] = useState([]);

  const [running, setRunning] = useState(true);
  const [round, setRound] = useState("");

  const [cashoutManualVal, setCashoutManualVal] = useState("0");

  useEffect(() => {
    start();
  }, []);

  
  useEffect(() => {
    socket.on("FromAPI", async (data) => {
      const currentRoundData = await data.liveBets.filter(
        (item) => item.round === data.round - 1
      );
      (await currentRoundData?.length) > 0
        ? handleLiveBets(
            currentRoundData.sort((a, b) => b.data.amount - a.data.amount)
          )
        : handleLiveBets([]);

      setRound(data?.round);
      handleUsers(data?.users);
      setResponse(data?.data);
      setTime(+data?.time);
      setPoint(data?.data?.point);
      setRunning(data?.running);
      handlePoint(data?.time);
    });
  }, []);

  const handleSendSocketData = async (dt) => {
    // const socket = socketIOClient(ENDPOINT);
    socket.emit("event", dt, function (dataFromServer) {
      // console.log(dataFromServer);
    });
  };

  const handleSendSocketEditData = async (dt) => {
    // const socket = socketIOClient(ENDPOINT);
    socket.emit("event2", dt, function (dataFromServer) {
      //console.log(dataFromServer);
    });
  };
  const handleSendSocketDeleteData = (dt) => {
    // const socket = socketIOClient(ENDPOINT);
    socket.emit("event3", { dt }, function (dataFromServer) {
      // console.log(dataFromServer);
    });
  };

  let amt = window.localStorage.getItem("hrm");

  const refundHandler = (val) => {};

  const requestHandler = async (win) => {
    // window.localStorage.setItem("hr", false);
    // window.localStorage.setItem("hrm", 0);
    setShoudBet(false);
    if (win) {
      setBetActive(false);
      setCongratulation(true);
      window.localStorage.setItem(
        "hrm",
        encrypt(
          auto === true
            ? +accountBalance +
                +parseFloat(
                  +amount * parseFloat(+cashoutValue).toFixed(2) -
                    +amount -
                    0.2 *
                      (+amount * parseFloat(+cashoutValue).toFixed(2) -
                        +amount) +
                    +amount
                ).toFixed(2)
            : bet === true
            ? +accountBalance +
              +parseFloat(
                +amount * parseFloat(+time)?.toFixed(2) -
                  +amount -
                  0.2 * (amount * parseFloat(+time)?.toFixed(2) - +amount) +
                  +amount
              ).toFixed(2)
            : +accountBalance +
              +parseFloat(
                parseFloat(+amount).toFixed(2) -
                  0.2 * parseFloat(+amount).toFixed(2) +
                  +amount
              ).toFixed(2),
          secret
        )
      );
      addAccountBalance(
        auto === true
          ? parseFloat(
              +amount * +parseFloat(+cashoutValue).toFixed(2) -
                +amount -
                0.2 *
                  (+amount * +parseFloat(+cashoutValue).toFixed(2) - +amount) +
                +amount
            ).toFixed(2)
          : bet === true
          ? parseFloat(
              +amount * +parseFloat(+time)?.toFixed(2) -
                +amount -
                0.2 * (amount * +parseFloat(+time)?.toFixed(2) - +amount) +
                +amount
            ).toFixed(2)
          : parseFloat(
              +parseFloat(+amount).toFixed(2) -
                0.2 * +parseFloat(+amount).toFixed(2) +
                +amount
            ).toFixed(2)
      );

      addToast(
        `Congratulations!!! Won at ${
          auto === true && win === true
            ? parseFloat(cashoutValue)?.toFixed(2)
            : parseFloat(time)?.toFixed(2)
        }x KSH${
          auto === true
            ? parseFloat(
                amount * parseFloat(cashoutValue).toFixed(2) -
                  amount -
                  0.2 * (amount * parseFloat(cashoutValue).toFixed(2) - amount)
              ).toFixed(2)
            : bet === true
            ? parseFloat(
                amount * parseFloat(time)?.toFixed(2) -
                  amount -
                  0.2 * (amount * parseFloat(time)?.toFixed(2) - amount)
              ).toFixed(2)
            : parseFloat(
                parseFloat(amount).toFixed(2) -
                  0.2 * parseFloat(amount).toFixed(2)
              ).toFixed(2)
        } (KSH ${
          win === true && auto === true
            ? parseFloat(
                (amount * parseFloat(cashoutValue)?.toFixed(2) - amount) * 0.2
              ).toFixed(2)
            : win === true && bet === true
            ? parseFloat(
                (amount * parseFloat(time)?.toFixed(2) - amount) * 0.2
              ).toFixed(2)
            : parseFloat(amount * 0.2).toFixed(2)
        } WHT tax)`,
        { appearance: "success", autoDismiss: true }
      );
      handleAddBets({
        win: true,
        serverSeed: response?.serverSeed,
        nonce: response?.nonce,
        clientSeed: response?.clientSeed,
        amount:
          win === true && auto === true
            ? amount * parseFloat(cashoutValue) -
              amount -
              0.2 * (amount * parseFloat(cashoutValue) - amount)
            : win === true && bet === true
            ? amount * parseFloat(time)?.toFixed(2) -
              amount -
              0.2 * (amount * parseFloat(time)?.toFixed(2) - amount)
            : 0.2 * parseFloat(amount).toFixed(2),
        betAmount: amount,
        point:
          auto === true && win === true
            ? parseFloat(cashoutValue)?.toFixed(2)
            : parseFloat(time)?.toFixed(2),
        user: userId,
      });
      let addReq = {
        query: `
        query{
          refundAccount(userId:"${window.sessionStorage.getItem(
            "userId"
          )}", amount:"${
          auto === true
            ? +accountBalance +
              +parseFloat(
                +amount * +parseFloat(+cashoutValue).toFixed(2) -
                  +amount -
                  0.2 *
                    (+amount * +parseFloat(+cashoutValue).toFixed(2) -
                      +amount) +
                  +amount
              ).toFixed(2)
            : bet === true
            ? +accountBalance +
              +parseFloat(
                +amount * +parseFloat(+time)?.toFixed(2) -
                  +amount -
                  0.2 * (+amount * +parseFloat(+time)?.toFixed(2) - +amount) +
                  +amount
              ).toFixed(2)
            : +accountBalance +
              +parseFloat(
                +parseFloat(+amount).toFixed(2) -
                  0.2 * +parseFloat(+amount).toFixed(2) +
                  +amount
              ).toFixed(2)
        }"){
            balance
          }
        }       
      `,
      };
      await fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(addReq),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            // window.localStorage.setItem("hr", false);
            // window.localStorage.setItem("hrm", 0);
            return res;
          }
        })
        .catch((err) => console.log(err.messge));

      let requestBodyCashout = {
        query: `
        mutation{
          createBet(betInput:{win:${true},auto:${
          auto ? true : false
        },serverSeed:"${response?.serverSeed}", nonce:"${
          response?.nonce
        }",clientSeed:"${response?.clientSeed}",amount:${
          win === true && auto === true
            ? parseFloat(
                +amount * parseFloat(+cashoutValue)?.toFixed(2) -
                  +amount -
                  0.2 *
                    (+amount * +parseFloat(+cashoutValue)?.toFixed(2) - +amount)
              ).toFixed(2)
            : win === true && bet === true
            ? parseFloat(
                +amount * +parseFloat(+time)?.toFixed(2) -
                  +amount -
                  0.2 * (+amount * +parseFloat(+time)?.toFixed(2) - +amount)
              ).toFixed(2)
            : parseFloat(+amount - +amount * 0.2).toFixed(2)
        },betAmount:${amount},round:"${round - 1}",point:"${
          auto === true && win === true
            ? parseFloat(cashoutValue)?.toFixed(2)
            : parseFloat(time)?.toFixed(2)
        }",user:"${window.sessionStorage.getItem(
          "userId"
        )}", crush:"${point}", tax:${
          win === true && auto === true
            ? (amount * parseFloat(cashoutValue)?.toFixed(2) - amount) * 0.2
            : win === true && bet === true
            ? (amount * parseFloat(time)?.toFixed(2) - amount) * 0.2
            : amount * 0.2
        }}){
              clientSeed
              clientSeed
              betAmount
              amount
              nonce
              point
              win
              auto
              user{
                phone
              }
            }
          }
        `,
      };
      window.localStorage.setItem("hrm2", encrypt(0, secret));

      await fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(requestBodyCashout),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result?.data) {
            // window.localStorage.setItem("hrm", 0);
            // bustTime.push(parseFloat(time).toFixed(2));
            if (win === true) {
              window.localStorage.setItem("hr", false);
              setCashoutManualVal(result?.data?.createBet?.point);
              // window.localStorage.setItem("hrm2", 0);

              // handleCaller();
              return;
            } else {
              window.localStorage.setItem("hr", false);
              // handleCaller();
              return;
            }
          }
          return window.location.reload();
        })
        .catch((err) => console.log(err.message));

      handleSendSocketEditData({
        username: userName,
        at:
          auto === true && win === true
            ? parseFloat(cashoutValue)?.toFixed(2)
            : parseFloat(time)?.toFixed(2),
        win: true,
        amount:
          auto === true
            ? amount * parseFloat(cashoutValue) - amount
            : bet === true
            ? amount * parseFloat(time)?.toFixed(2) - amount
            : parseFloat(amount).toFixed(2),
      });

      return;
    }
    if (!win) {
      setStartBet(false);
      setBetActive(false);
      window.localStorage.setItem("hrm", encrypt(accountBalance, secret));
      setCongratulation(false);
      setFailed(true);
      setTimeout(() => {
        setFailed(false);
      }, 1000);
      addToast(
        `Busted at ${parseFloat(time).toFixed(2)}x KSH${parseFloat(
          amount
        ).toFixed(2)}`,
        {
          appearance: "error",
          autoDismiss: true,
        }
      );
      handleAddBets({
        win: false,
        serverSeed: response?.serverSeed,
        nonce: response?.nonce,
        clientSeed: response?.clientSeed,
        amount:
          win === true && auto === true
            ? parseFloat(amount).toFixed(2) *
              parseFloat(cashoutValue)?.toFixed(2)
            : win === true && bet === true
            ? parseFloat(amount).toFixed(2) * parseFloat(time)?.toFixed(2)
            : amount,
        betAmount: amount,
        point:
          auto === true && win === true
            ? parseFloat(cashoutValue)?.toFixed(2)
            : parseFloat(time)?.toFixed(2),
        user: userId,
      });
      window.localStorage.setItem("hrm2", 0);

      let requestBodyCashout = {
        query: `
        mutation{
          createBet(betInput:{win:${false},auto:${
          auto ? true : false
        },serverSeed:"${response?.serverSeed}", nonce:"${
          response?.nonce
        }",clientSeed:"${
          response?.clientSeed
        }",amount:${amount},betAmount:${amount},round:"${
          round - 1
        }",point:"${parseFloat(cashoutValue).toFixed(
          2
        )}",user:"${window.sessionStorage.getItem(
          "userId"
        )}",crush:"${point}", tax:${0}}){
              clientSeed
              clientSeed
              betAmount
              amount
              nonce
              point
              win
              auto
              user{
                phone
              }
            }
          }
        `,
      };

      await fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(requestBodyCashout),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result?.data) {
            // setShoudBet(true);
            bustTime.push(parseFloat(time).toFixed(2));
            if (win === true) {
              window.localStorage.setItem("hr", false);
              setCashoutManualVal(result?.data?.createBet?.point);

              // handleCaller();
              return;
            } else {
              window.localStorage.setItem("hr", false);
              // handleCaller();
              return;
            }
          }
          return window.location.reload();
        })
        .catch((err) => console.log(err.message));

      handleSendSocketEditData({
        username: userName,
        at:
          auto === true && win === true
            ? parseFloat(cashoutValue)?.toFixed(2)
            : parseFloat(time)?.toFixed(2),
        win: false,
        amount:
          auto === true
            ? parseFloat(amount).toFixed(2) *
                parseFloat(cashoutValue)?.toFixed(2) -
              amount
            : bet === true
            ? parseFloat(amount).toFixed(2) * parseFloat(time)?.toFixed(2) -
              amount
            : parseFloat(amount).toFixed(2),
      });
    }
  };

  let timeArray = [];
  // console.log(
  //   parseFloat(+time).toFixed(2),
  //   parseFloat(cashoutValue).toFixed(2)
  // );
  // console.log("check", );

  //Controller
  useEffect(() => {
    let timer;
    timeArray.push(parseFloat(time).toFixed(2));
    // if (
    //   timeArray[timeArray.length - 1] - timeArray[timeArray.length - 1] >
    //   0.01
    // ) {
    //   setSlowNet(true);
    // }
    // console.log(time > +cashoutValue);

    if (running && auto && betActive && time > +cashoutValue) {
      // console.log(time, cashoutValue);
      //stopRunning();
      // console.log(cashoutValue);
      // console.log(parseFloat(+time).toFixed(2), +cashoutValue);
      requestHandler(true);
      console.log("Auto cashout");
      setBetActive(false);
    }

    //Auto loss
    if (running === false) {
      // console.log(
      //   parseFloat(+time).toFixed(2),
      //   parseFloat(cashoutValue).toFixed(2)
      // );
      handleRunning2();
      if (congratulations === true) {
        setCongratulation(false);
      }
      if (startBet === true) {
        setBetActive(true);
        setShowCancel(false);
        setStartBet(false);
      }
      if (
        auto === true &&
        betActive === true &&
        parseFloat(point).toFixed(2) === parseFloat(time).toFixed(2)
      ) {
        // stopRunning()
        if (betActive === true && time <= +cashoutValue) {
          bustTime.push(parseFloat(time).toFixed(2));
          requestHandler(false);
          setBetActive(false);
        }
        console.log("Auto loss");
      }

      //Normal bet loss
      if (
        bet === true &&
        parseFloat(point).toFixed(2) === parseFloat(time).toFixed(2)
      ) {
        if (betActive === true && bet === true) {
          bustTime.push(parseFloat(time).toFixed(2));
          requestHandler(false);
          setBetActive(false);
        }
        console.log("Normal bet loss");
      }
      handleTimeOut();
      const newTime = 5 * 1000;
      start(newTime);
      timer = setTimeout(() => {
        handleCrashHitory(response);
        setCashoutManualVal("0");
        if (startBet === true) {
          setBetActive(true);
          setShowCancel(false);
          setStartBet(false);
        }
      }, 4000);
      console.log("Not running");
    }

    return () => clearInterval(timer);
  }, [time, running]);

  //console.log(amount);
  let requestBodyDeduct = {
    query: `
        query{
          deductAccountBalance(userId:"${window.sessionStorage.getItem(
            "userId"
          )}", amount:"${
      +accountBalance - +amount
    }",dataToken:"${window.sessionStorage.getItem("dataToken")}"){
            balance
            user{
              phone
            }
          }
        }
        
      `,
  };

  let requestActivate = {
    query: `
        mutation{
  createActives(user:"${window.sessionStorage.getItem(
    "username"
  )}",round:"${round}", amount:"${amount}"){
    username
    online
  }
}
        
      `,
  };
  const startHandlerOne = async () => {
    if (slowNet) {
      addToast(
        "Could not place your bet. Slow Internet!!! Try refreshing the page.",
        {
          appearance: "warning",
          autoDismiss: true,
        }
      );
      return;
    }
    if (!token || loggedOut || userName?.length < 1) {
      addToast("To play you need to login!!!", {
        appearance: "info",
        autoDismiss: true,
      });
      return navigate("/login");
    }
    if (accountBalance < amount || isNaN(accountBalance)) {
      addToast("Inssufficient account balance!!!", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    }
    if (amount < 1) {
      addToast("Amount must be greater than 10", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    }
    if (
      ((timeLeft / 1000).toFixed(0) === 1 && running === false) ||
      ((timeLeft / 1000).toFixed(0) === 0 && running === false)
    ) {
      addToast("Wait for the next round!!!");
      return;
    }

    if (response.length < 1) {
      return;
    }

    if (cashoutValue < 1 || cashoutValue > 20.0 || cashoutValue === undefined) {
      if (cashoutValue === undefined) {
        addToast("Cashout value must be greater than 1 and less than 20", {
          appearance: "info",
          autoDismiss: true,
        });
      }
      return;
    }

    if (disabledInput === false) {
      setDisabledInput(true);
    }

    if (amount > 2000) {
      addToast("Amount must be less than 2000", {
        appearance: "info",
        autoDismiss: true,
      });
      return;
    }

    if (point === undefined) {
      addToast("Slow network connection!!! Try again later.", {
        appearance: "warning",
        autoDismiss: true,
      });
      return;
    }
    if (startBet === false) {
      setStartBet(true);
      window.localStorage.setItem("hr", true);
      window.localStorage.setItem(
        "hrm",
        encrypt(+accountBalance - +amount, secret)
      );
      window.localStorage.setItem("hrm2", encrypt(+amount, secret));
      deductAccountBalance(amount);
      handleSendSocketData({
        username: userName,
        amount: amount,
        win: null,
        profit: null,
        at: null,
      });
    }

    await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(requestBodyDeduct),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(async (result) => {
        // handleCaller();
        if (result.data) {
          await fetch(BASE_URL, {
            method: "POST",
            body: JSON.stringify(requestActivate),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          return;
        }
        addToast(result.errors[0].message, {
          appearance: "error",
          autoDismiss: true,
        });

        setBetActive(false);
        setShowCancel(false);
        setStartBet(false);
        window.localStorage.setItem("hr", false);
        window.localStorage.setItem("hrm", encrypt(0, secret));
        window.localStorage.setItem("hrm2", encrypt(0, secret));
        handleSendSocketDeleteData({
          username: window.sessionStorage.getItem("userId"),
        });
        clearToken();
      })
      .catch((err) => console.log(err.message));
  };

  let am = +accountBalance + +amount;
  let addRequest = {
    query: `
        query{
          refundAccount(userId:"${window.sessionStorage.getItem(
            "userId"
          )}", amount:"${am}"){
            balance
            user{
              phone
            }
          }
        }       
      `,
  };

  const cacelBetOneHandler = async () => {
    // window.localStorage.setItem("hr", false);
    // window.localStorage.setItem("hrm", 0);
    if (startBet === true) {
      setBetActive(false);
      setShowCancel(false);
      setStartBet(false);
      window.localStorage.setItem("hr", false);
      window.localStorage.setItem("hrm", encrypt(am, secret));
      window.localStorage.setItem("hrm2", encrypt(0, secret));

      addAccountBalance(amount);
      handleSendSocketDeleteData({
        username: window.sessionStorage.getItem("userId"),
      });
    }

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
        if (res.data) {
          // window.localStorage.setItem("hr", false);
          // window.localStorage.setItem("hrm", 0);
          // window.localStorage.setItem("hrm2", 0);
          return res;
        }
      })
      .catch((err) => console.log(err.messge));
  };

  const cashoutOneHandler = async () => {
    // window.localStorage.setItem("hr", false);
    // window.localStorage.setItem("hrm", 0);
    if (running === false) {
      return;
    }
    if (running === true && auto === true) {
      return;
    }

    if (parseFloat(time).toFixed(2) < parseFloat(point).toFixed(2)) {
      setBetActive(false);
      setShowCancel(false);
      setStartBet(false);
      requestHandler(true);
      // window.localStorage.setItem("hr", false);
      // window.localStorage.setItem("hrm", 0);
      window.localStorage.setItem("hrm2", encrypt(am, secret));
    }
  };

  const handleBetType = () => {
    setAuto(false);
    setBet(true);
  };
  const handleAutoBet = () => {
    setBet(false);
    setAuto(true);
  };
     const chartStyle = {
        width:"90%",
        fontSize:"1px"
      };
    
      const gaugeContainerStyle = {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    
        marginTop: 10,
        height: 400,
        width: 500,
        paddingTop: 50
      };
  
  return (
    <div className="flex md:h-[300px]  w-full select-none gap-2 md:gap-4 overflow-hidden flex-col lg:flex-row ">
      <div className="bg-black relative min-h-[250px] md:min-h-[300px] flex justify-center items-center rounded-md w-full lg:w-[70%]">
        {running ? (
          <div className="w-full relative justify-center items-center flex text-[100px] font-medium">
                <div style={gaugeContainerStyle} className="hidden lg:flex">
                <GaugeChart
                    style={chartStyle}
                    textColor="#000"
                    formatTextValue={(value) => value}
                    nrOfLevels={20} 
                    percent={parseFloat(time)/20}  
                    needleColor="red" 
                  />
              <span className="absolute text-[60px]"> {time ? parseFloat(time).toFixed(2) : (1.0).toFixed(2)}x </span>   
           
          </div>
            {/* <span className=" z-40">
              {" "}
              {time ? parseFloat(time).toFixed(2) : (1.0).toFixed(2)}x
            </span> */}
            {congratulations && (
              <div className=" absolute min-h-[300px]  z-20 w-full lg:w-[70%]">
                <Lottie
                  options={{
                    animationData: animation,
                    loop: false,
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col w-full justify-center">
            <div className="h-full flex-col mt-10 text-white gap-2 w-full justify-center items-center flex  text-[20px] md:text-[20px]">
              <div className="text-red-700 text-[25px]">
                Busted at{" "}
                {time ? parseFloat(time).toFixed(2) : (1.0).toFixed(2)}x
              </div>
              <div className=" text-[30px] text-red flex gap-2">
                <div>Next round {done ? "loading" : "in"}</div>
                <span className="text-red-700 ">
                  {(timeLeft / 1000).toFixed(0)}
                </span>
              </div>
              <div className="pl-10">
                <LineWave color="#DD2222" />
              </div>
            </div>
          </div>
        )}
        {congratulations && (
          <div className="text-green-500 justify-center items-center flex text-[30px] font-bold h-[100px] lg:w-70% bg-[#0d0f13] bg-opacity-[80%] w-full absolute top-0 left-0 ">
            <p className="w-full md:max-w-[50%] text-center">
              {cashoutManualVal !== "0"
                ? `Cashed out at ${cashoutManualVal}x`
                : "Congratulations!!!"}
            </p>
          </div>
        )}
        {failed && (
          <div className="text-red-700 justify-center items-center flex text-[30px] font-bold h-[100px] lg:w-70% bg-[#0d0f13] bg-opacity-[90%] w-full absolute top-0 left-0 ">
            <p className="max-w-[50%] text-center">
              Busted at {parseFloat(time).toFixed(2)}x
            </p>
          </div>
        )}
      </div>
      <div className="relative bg-black gap-2 min-h-[250px] py-4 items-center  w-full lg:w-[30%] md:py-2 lg:gap-2 px-4 md:px-4 flex justify-center flex-col rounded-md ">
        <div className="px-2 flex w-full justify-center shadow-lg rounded-md left-[-30px] text-md capitalize font-semibold text-[#DD2222]">
          Place Bet
        </div>
        <div className="flex absolute top-10 justify-center w-[70%] items-center">
          <div
            onClick={handleBetType}
            className={
              bet
                ? "px-6 py-1 w-full justify-center flex items-center cursor-pointer select-none bg-[#DD2222] rounded-l-md"
                : "px-6 py-1 w-full select-none justify-center flex items-center bg-[#0d0f13] cursor-pointer rounded-l-md"
            }
          >
            Manual
          </div>
          <div
            onClick={handleAutoBet}
            className={
              auto
                ? "px-6 py-1 w-full justify-center flex items-center cursor-pointer select-none bg-[#DD2222] rounded-r-md"
                : "px-6 py-1 w-full justify-center select-none flex items-center bg-[#0d0f13] cursor-pointer rounded-r-md"
            }
          >
            Auto
          </div>
        </div>
        <div className="gap-2 mt-2 md:p-2 md:gap-0 w-[70%] items-center h-[200px] flex md:justify-center">
          {
            <div className="flex flex-col gap-2 w-full">
              <div className={auto && "mt-4"}>
                <label className="text-[10px]">Amount</label>
                <div className="flex bg-[#0d0f13] w-full justify-center items-center rounded-md ">
                  <div className="flex-1 w-full">
                    <input
                      disabled={betActive}
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                      className="bg-transparent h-8 text-[14px] w-full lg:w-full border-none outline-none ring-0 focus:ring-0 focus:outline-0"
                    />
                  </div>

                  <div
                    onClick={() => {
                      if (betActive === true) {
                        return;
                      }
                      setAmount((prev) => prev - 10);
                    }}
                    className="text-[20px] px-2 cursor-pointer select-none"
                  >
                    -
                  </div>
                  <div
                    onClick={() => {
                      if (betActive === true) {
                        return;
                      }
                      setAmount((prev) => prev + 10);
                    }}
                    className="text-[20px] px-2 cursor-pointer select-none"
                  >
                    +
                  </div>
                </div>
                {amount < 10 && (
                  <span className="text-red-600 text-[11px]">
                    Must be greater than 10
                  </span>
                )}
                {amount > 2000 && (
                  <span className="text-red-600 text-[11px]">
                    Must be less than 2000
                  </span>
                )}
              </div>
              {auto && (
                <div className="w-full ">
                  <label className="text-[10px]">Cashout value</label>
                  <div className="w-full bg-[#0d0f13] rounded-md">
                    <input
                      disabled={betActive}
                      type={"number"}
                      value={cashoutValue}
                      onChange={(e) => {
                        setCongratulation(false);
                        setCashoutValue(e.target.value);
                      }}
                      className="bg-transparent h-8 text-[14px] w-full lg:w-full border-none outline-none ring-0 focus:ring-0 focus:outline-0"
                    />
                  </div>
                  {cashoutValue < 1.01 && (
                    <span className="text-red-600 text-[9px]">
                      Must be greater than 1.01
                    </span>
                  )}
                  {cashoutValue > 20.0 && (
                    <span className="text-red-600 text-[9px]">
                      Must be less than 20.00
                    </span>
                  )}
                </div>
              )}
            </div>
          }
        </div>

        <div className="flex justify-center select-none items-center gap-2 flex-col">
          {startBet === true && (
            <p className="text-[12px] text-[#DD2222] select-none font-medium">
              {runningPoint ? "" : "Bet placed for next round"}
            </p>
          )}

          {/*if auto bet*/}

          {bet && (
            <>
              {betActive === true && (
                <div
                  onClick={cashoutOneHandler}
                  className="shadow-lg min-w-[150px] px-2 py-2 md:py-4  justify-center flex first-letter: bg-yellow-700 cursor-pointer rounded-md hover:bg-yellow-800"
                >
                  Cashout {time && parseFloat(time).toFixed(2)}x
                </div>
              )}

              {betActive === false && startBet === false && (
                <div
                  onClick={startHandlerOne}
                  className="shadow-lg w-[150px] px-2 py-2 md:py-4 justify-center flex first-letter: bg-[#263C92] cursor-pointer rounded-md hover:bg-[#102061]"
                >
                  Start
                </div>
              )}
              {startBet === true && (
                <div
                  onClick={cacelBetOneHandler}
                  className="shadow-lg w-[150px] px-2 md:py-4 py-2 justify-center flex first-letter: bg-[#DD2222] cursor-pointer rounded-md hover:bg-[#ac1111]"
                >
                  Cancel
                </div>
              )}
            </>
          )}

          {/*if auto normal bet*/}
          {auto && (
            <>
              {betActive === true && (
                <div
                  onClick={cashoutOneHandler}
                  className="shadow-lg min-w-[150px] px-2 py-2 md:py-4  justify-center flex first-letter: bg-yellow-700 cursor-pointer rounded-md hover:bg-yellow-800"
                >
                  Pending
                </div>
              )}

              {betActive === false && startBet === false && (
                <div
                  onClick={startHandlerOne}
                  className="shadow-lg w-[150px] px-2 py-2 md:py-4 justify-center flex first-letter: bg-[#263C92] cursor-pointer rounded-md hover:bg-[#102061]"
                >
                  Start
                </div>
              )}
              {startBet === true && (
                <div
                  onClick={cacelBetOneHandler}
                  className="shadow-lg w-[150px] px-2 md:py-4 py-2 justify-center flex first-letter: bg-[#DD2222] cursor-pointer rounded-md hover:bg-[#ac1111]"
                >
                  Cancel
                </div>
              )}
            </>
          )}
        </div>
        <p className="text-[9px] text-white select-none font-medium">
          20% WHT Tax is deducted from winnings
        </p>
      </div>
    </div>
  );
}

export default GameArea;
