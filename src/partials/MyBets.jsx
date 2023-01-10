import React, { useEffect, useRef, useState } from "react";
import { useAppCtx } from "../context/AppContext";
import { formatValue } from "../utils/Utils";
// import socketIOClient from "socket.io-client";



// const socket = socketIOClient(ENDPOINT);

function MyBets() {
  const { myBets, userName } = useAppCtx();

  const [history, setHistory] = useState(true);

  const [chat, setChat] = useState();

  const [allChats, setAllChats] = useState([]);
  const [chatLength, setChatLength] = useState(0);

  // useEffect(() => {
  //   socket.on("FromAPI", async (data) => {
  //     setAllChats(data);
  //     // console.log(data);
  //     if (data.length > chatLength) {
  //       setChatLength(data.length);
  //     }
  //   });
  // }, []);

  // const handleSendSocketChat = (dt) => {
  //   // const socket = socketIOClient(ENDPOINT);
  //   socket.emit("chat", { dt }, function (dataFromServer) {
  //     // console.log(dataFromServer);
  //   });
  // };

  const chatParent = useRef(null);

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  }, [history, chatLength]);
  return (
    <div className="flex h-[300px] md:h-[450px] relative rounded-t-md bg-black w-full overflow-y-scroll scrollbar-hide ">
      <div className="hidden md:visible md:flex md:flex-col orientation-upright bg-black h-full w-fit fixed pt-10 text-gray-400 p-2">
        <div
          onClick={() => {
            setHistory(true);
          }}
          className={
            history
              ? "-rotate-90 flex justify-center items-center h-fit bg-black w-full text-sm cursor-pointer p-0.5 border-b-2 border-red-500 "
              : "-rotate-90 flex justify-center items-center h-fit bg-black w-full text-sm cursor-pointer p-0.5"
          }
        >
          History
        </div>
        <div
          onClick={() => {
            setHistory(false);
          }}
          className={
            !history
              ? "-rotate-90 flex justify-center items-center h-fit bg-black w-full text-sm cursor-pointer p-0.5 border-b-2 border-red-500 mt-12 "
              : "-rotate-90 flex justify-center items-center h-fit bg-black w-full text-sm cursor-pointer p-0.5 mt-12"
          }
        >
          Chat
        </div>
      </div>

      <div className="flex md:hidden justify-start flex-col pt-10 w-[30px] ">
        {" "}
        <div
          onClick={() => {
            setHistory(true);
          }}
          className={
            history
              ? "-rotate-90 flex justify-center items-center h-fit bg-black w-full text-sm cursor-pointer p-0.5 border-b-2 border-red-500 "
              : "-rotate-90 flex justify-center items-center h-fit bg-black w-full text-sm cursor-pointer p-0.5"
          }
        >
          History
        </div>
        <div
          onClick={() => {
            setHistory(false);
          }}
          className={
            !history
              ? "-rotate-90 flex justify-center items-center h-fit bg-black w-full text-sm cursor-pointer p-0.5 border-b-2 border-red-500 mt-12 "
              : "-rotate-90 flex justify-center items-center h-fit bg-black w-full text-sm cursor-pointer p-0.5 mt-12"
          }
        >
          Chat
        </div>
      </div>

      {history ? (
        <div className="flex flex-col overflow-y-scroll  h-full w-full pt-2 md:pl-16 pl-2 pr-2 scrollbar-hide md:pb-[200px] gap-2 ">
          {myBets?.length > 0 ? (
            myBets?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex gap-1 last:mb-12 w-full bg-[#0d0f13] py-2 px-3 rounded-md shadow-lg"
                >
                  <div className="flex overflow-x-scroll md:w-full md:scrollbar-hide md:flex-row gap-4 p-4 md:p-0 md:justify-evenly items-center ">
                    <div
                      className={
                        item.win
                          ? "border border-green-700 text-[12px] px-2 py-0 rounded-full shadow-lg"
                          : "border border-red-500 text-[12px] px-2 rounded-full shadow-lg"
                      }
                    >
                      {item.win ? "Win" : "Lost"}
                    </div>
                    <div className="border border-gray-800 text-[12px] px-2 py-0 rounded-full shadow-lg">
                      {item.point}x
                    </div>
                    <div className="border flex gap-1 border-gray-800 text-[12px] px-2 py-0 rounded-full shadow-lg">
                      {item.win ? (
                        <span className="text-green-700">+</span>
                      ) : (
                        <span className="text-red-500">-</span>
                      )}{" "}
                      {item.win
                        ? formatValue(parseFloat(item.amount))
                        : formatValue(parseFloat(item.betAmount))}
                    </div>
                    <div className="text-[12px] w-fit px-2 flex items-center justify-center gap-2">
                      <div className="text-[#DD2222] w-fit whitespace-nowrap">
                        Hash
                      </div>
                      <div className="border flex max-w-[250px] md:max-w-[300px] border-gray-800 h-[20px] overflow-x-scroll scrollbar-hide text-[12px] px-2 rounded-full shadow-lg">
                        {item.serverSeed}x
                      </div>
                    </div>
                    <div className="border border-[#DD2222] rounded-full cursor-pointer px-3 py-0 shadow-lg hover:bg-[#12151B] text-[12px]">
                      Verify
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="justify-center flex items-center p-3 text-[13px]">
              You have no bets at the moment
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col overflow-y-scroll  h-full w-full pt-2 md:pl-16 pl-2 pr-2 scrollbar-hide md:pb-[200px] gap-2 ">
          <div className="flex h-full  flex-col py-2 px-3 rounded-md shadow-lg">
            <div
              className="flex-1 w-full overflow-scroll py-2 flex flex-col gap-1"
              ref={chatParent}
            >
              {allChats?.map((item) => {
                return (
                  <>
                    <div className="md:visible w-full bg-[#0d0f13] px-2 py-1 scrollbar-hide">
                      <div className="text-[11px] flex gap-2">
                        <div className="text-gray-400">{item.dt.time}</div> -
                        <div className="text-red-400">{item.dt.username}</div>:
                        <div className="text-white whitespace-normal break-all">
                          {item.dt.message}
                        </div>
                      </div>
                    </div>
                    <div className=" w-full bg-[#0d0f13] px-2 py-1 scrollbar-hide flex flex-col md:hidden">
                      <div className="text-gray-400  text-[11px]">
                        {item.dt.time}
                      </div>
                      <div className="text-[11px] flex gap-2">
                        <div className="text-red-400">{item.dt.username}</div>:
                        <div className="text-white whitespace-normal break-all">
                          {item.dt.message}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="h-[50px] w-full flex justify-start shadow-md items-start gap-3 scrollbar-hide ">
              <input
                type={"text"}
                className=" h-[30px] text-[12px] w-full border-b-1  bg-transparent text-xs rounded-md focus:border-0 outline-none focus:ring-red-500"
                placeholder="Type here...🖐"
                value={chat}
                onChange={(e) => setChat(e.target.value)}
              />
              {/* <button
                onClick={() => {
                  if (chat === "") {
                    return;
                  }
                  handleSendSocketChat({
                    username: userName,
                    message: chat,
                    time: new Date().toLocaleTimeString(),
                  });
                  setChat("");
                }}
                className=" bg-[#0d0f13] h-[30px] "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="text-[#DD2222] hover:text-[#a20c0c] h-[20px] px-2 "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBets;
