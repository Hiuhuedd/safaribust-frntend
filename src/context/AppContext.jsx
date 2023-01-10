/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Component } from "react";
import { createContext, useContext, useState } from "react";

const appContextDefaultValues = {
  crushPoint: [],
  crushHandler: () => {},
  userCrush: [],
  userCrushHandler: () => {},
  crushPointUpdater: () => {},
  pointRemover: () => {},
  running: Boolean,
  runningHandler: () => {},
  stopRunning: () => {},
  multiplier: Number,
  timeHandler: () => {},
  resetTime: () => {},
  time: Number,
  cancelButtonHandler: () => {},
  showCancel: Boolean,
  hideCancelButtonHandler: () => {},
  handleCashout: () => {},
  cashout: Boolean,
  hideCashout: () => {},
  betOneClicked: Boolean,
  betOneClickedHandler: () => {},
  stableCashout: [],
  reverseButtonClick: () => {},
  crushHistory: [],
  handleCrashHitory: () => {},
  accountBalance: Number,
  handleAccountAdd: () => {},
  handleAccountDeduct: () => {},
  disableBet: Boolean,
  token: String,
  userId: String,
  clearToken: () => {},
  handleToken: () => {},
  balanceHandler: () => {},
  handleUserNumber: () => {},
  userNumber: Boolean,
  proxyBalanceHandler: () => {},
  proxyAccountBalance: Number,
  handleDisableCashout: () => {},
  disableCashout: Boolean,
  handleEnableCashout: () => {},
  handleUserName: () => {},
  userName: String,
  handleMyBets: () => {},
  myBets: String,
  handleAllBets: () => {},
  allBets: String,
  handleCaller: () => {},
  caller: String,
  handleHistory: () => {},
  handleTime: () => {},
  timeout: Number,
  handleTimeOut: () => {},
  handleTimeSetter: () => {},
  handleUsers: () => {},
  users: Number,
  handleAddBets: () => {},
  handleLiveBets: () => {},
  liveBets: String,
  editLiveBets: () => {},
  handleNextLive: () => {},
  nextLive: String,
  handleLoading: () => {},
  disableLoading: () => {},
  loading: Boolean,
  handleUserId: () => {},
  disableLoggedOut: () => {},
  handleLoggedOut: () => {},
  loggedOut: Boolean,
  checkSession: () => {},
  expired: Boolean,
  checkSession2: () => {},
  expired2: Boolean,
  running2: Boolean,
  handleRunning2: () => {},
  addAccountBalance: () => {},
  deductAccountBalance: () => {},
  handlePoint: () => {},
  point: Number,
};

const AppContext = createContext(appContextDefaultValues);

const BASE_URL = "https://backend.safaribust.co.ke/graphql";

export function useAppCtx() {
  return useContext(AppContext);
}
export const handleOnlineSwitch = async () => {
  let reqBody = {
    query: `
      query{
        logout(userId:"${window.sessionStorage.getItem("userId")}"){
        active
        username
      }
    }`,
  };
  await fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => result)
    .catch((err) => console.log(err));
};

export function AppProvider({ children }) {
  const [crushPoint, setCrusPoint] = useState([]);
  const [userCrush, setUsercrush] = useState([]);
  const [running, setRunning] = useState(true);
  const [time, setTime] = useState(
    parseFloat(window.localStorage.getItem("ct"))
      ? parseFloat(window.localStorage.getItem("ct"))
      : 0
  );
  const [showCancel, setShowCancel] = useState(false);
  const [cashout, setCashout] = useState(false);
  const [betOneClicked, setBetOneClicked] = useState(false);
  const [crushHistory, setCrashHistory] = useState([]);
  const [accountBalance, setAcountBalance] = useState(0);
  const [proxyAccountBalance, setProxyAcountBalance] = useState(0);
  const [disableBet] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(window.localStorage.userId);
  const [userNumber, setUserNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [myBets, setMybets] = useState([]);
  const [disableCashout, setDisableCashout] = useState(false);
  const [allBets, setAllBets] = useState([]);
  const [caller, setCaller] = useState(false);
  const [timeout, setTimeOut] = useState(5.0);
  const [users, setUsers] = useState(0);
  const [liveBets, setLiveBets] = useState([]);
  const [nextLive, setNextlive] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const [expired, setExpired] = useState(false);
  const [expired2, setExpired2] = useState(false);
  const [running2, setRunning2] = useState(false);
  const [point, setPoint] = useState();

  const handlePoint = (pnt) => {
    setPoint(pnt);
  };

  const handleRunning2 = () => {
    setRunning2(!running2);
  };

  const checkSession = async () => {
    setExpired(true);
  };
  const checkSession2 = async () => {
    setExpired2(true);
  };

  var id;

  const handleLoggedOut = () => {
    setLoggedOut(true);
  };

  const disableLoggedOut = () => {
    setLoggedOut(false);
  };

  const handleUserId = (data) => {
    setUserId(data);
  };

  const handleLoading = () => {
    setLoading(true);
  };
  const disableLoading = () => {
    setLoading(false);
  };

  const handleNextLive = (data) => {
    setNextlive(data);
  };
  const editLiveBets = (username, at, win) => {
    const index = liveBets.map((item, index) => {
      if (item.data.username === username) {
        return index;
      }
    });
    let newArr = [...liveBets];
    newArr[index].data.at = at;
    newArr[index].data.win = win;
    setLiveBets(newArr);
    // console.log(liveBets);
  };

  const handleLiveBets = (data) => {
    setLiveBets(data);
  };

  const handleUsers = (usr) => {
    setUsers(usr);
  };

  const handleTimeSetter = () => {
    setTimeOut(5.0);
  };

  const handleTimeOut = () => {
    id = setInterval(() => {
      setTimeOut((prevCount) => {
        if (prevCount < 1) {
          clearInterval(id);
          //return 0
        }
        setTimeOut(5.0);
        return prevCount - 1;
      });
    }, 1000);
  };

  const handleCaller = () => {
    setCaller(!caller);
  };

  const handleAllBets = (data) => {
    setAllBets(data);
  };

  const handleAddBets = (data) => {
    setMybets((prev) => [data, ...prev]);
  };
  const handleMyBets = (data) => {
    setMybets(data);
  };

  const handleDisableCashout = () => {
    setDisableCashout(true);
  };
  const handleEnableCashout = () => {
    setDisableCashout(false);
  };

  const handleUserNumber = (number) => {
    setUserNumber(number);
  };

  const handleToken = (token) => {
    window.localStorage.setItem("token", token);
    setToken(token);
  };
  const clearToken = () => {
    handleOnlineSwitch();
    setToken(null);
    setUserName(null);
    setUserId(null);
    setMybets([]);

    window.localStorage.removeItem("token");
    // window.localStorage.removeItem("userId");
    // window.localStorage.setItem("hrm", accountBalance);
    window.sessionStorage.removeItem("accessToken");
    window.localStorage.removeItem("accessToken");
    // window.sessionStorage.removeItem("userId");
    // window.localStorage.removeItem("userId");

    window.sessionStorage.removeItem("phone");
    window.localStorage.removeItem("phone");

    window.localStorage.removeItem("username");
    window.sessionStorage.removeItem("username");
  };

  const [stableCashout, setStableCashout] = useState([]);

  const balanceHandler = (balance) => {
    setAcountBalance(balance);
  };

  const addAccountBalance = (amnt) => {
    // console.log(amnt);
    setAcountBalance(+accountBalance + +amnt);
  };
  const deductAccountBalance = (amnt) => {
    setAcountBalance(+accountBalance - +amnt);
  };
  const proxyBalanceHandler = (balance) => {
    setProxyAcountBalance(balance);
  };

  const handleAccountAdd = (amount) => {
    setAcountBalance((prev) => prev + amount);
  };

  const handleAccountDeduct = (amount) => {
    setAcountBalance((prev) => prev - amount);
  };

  const handleHistory = (data) => {
    setCrashHistory(data);
  };
  const handleCrashHitory = (data) => {
    if (data !== crushHistory[0]) {
      setCrashHistory((prev) => [data, ...prev]);
    }
    window.localStorage.setItem("history", JSON.stringify(crushHistory.result));
  };

  const betOneClickedHandler = () => {
    setBetOneClicked(true);
  };

  const reverseButtonClick = () => {
    setBetOneClicked(false);
  };

  const handleCashout = () => {
    setCashout(true);
    //reverseButtonClick()
  };

  const hideCashout = () => {
    setCashout(false);
    //betOneClickedHandler()
  };

  const cancelButtonHandler = () => {
    setShowCancel(true);
  };

  const hideCancelButtonHandler = () => {
    setShowCancel(false);
    handleCashout();
  };

  const handleTime = (data) => {
    setTime(data);
  };

  const timeHandler = () => {
    setTime((prevTime) => prevTime + 0.01);
  };

  const resetTime = () => {
    setTime(0.98);
    // setDisableBet(false);
    betOneClickedHandler();
  };

  const runningHandler = () => {
    resetTime();
    setRunning(true);
  };

  const stopRunning = async () => {
    setRunning(false);
    //setDisableBet(true);
  };

  const crushPointUpdater = () => {
    setCrusPoint(userCrush);
    setStableCashout(userCrush);
  };

  const pointRemover = () => {
    setUsercrush([]);
  };

  const crushHandler = (data) => {
    setCrusPoint(data);
  };

  const userCrushHandler = (data) => {
    if (userCrush.length === 0) {
      setUsercrush(data);
    }
  };

  const handleUserName = (name) => {
    setUserName(name);
  };

  const value = {
    crushHandler,
    crushPoint,
    userCrush,
    userCrushHandler,
    crushPointUpdater,
    pointRemover,
    runningHandler,
    stopRunning,
    running,
    timeHandler,
    resetTime,
    time,
    cancelButtonHandler,
    hideCancelButtonHandler,
    showCancel,
    hideCashout,
    handleCashout,
    cashout,
    betOneClickedHandler,
    betOneClicked,
    stableCashout,
    reverseButtonClick,
    handleCrashHitory,
    crushHistory,
    accountBalance,
    handleAccountDeduct,
    handleAccountAdd,
    disableBet,
    token,
    userId,
    clearToken,
    handleToken,
    balanceHandler,
    handleUserNumber,
    userNumber,
    proxyBalanceHandler,
    proxyAccountBalance,
    handleDisableCashout,
    disableCashout,
    handleEnableCashout,
    userName,
    handleUserName,
    handleMyBets,
    myBets,
    handleAllBets,
    allBets,
    handleCaller,
    caller,
    handleHistory,
    handleTime,
    timeout,
    handleTimeOut,
    handleTimeSetter,
    handleUsers,
    users,
    handleAddBets,
    handleLiveBets,
    liveBets,
    editLiveBets,
    handleNextLive,
    nextLive,
    handleLoading,
    disableLoading,
    loading,
    handleUserId,
    disableLoggedOut,
    handleLoggedOut,
    loggedOut,
    checkSession,
    expired,
    checkSession2,
    expired2,
    handleRunning2,
    running2,
    addAccountBalance,
    deductAccountBalance,
    handlePoint,
    point,
  };

  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
}
