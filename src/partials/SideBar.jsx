import React, { useEffect, useState } from "react";
import Bet from "../components/Bet";
import { useAppCtx } from "../context/AppContext";

function SideBar() {
  const { users, liveBets } = useAppCtx();
  const [vals, setVals] = useState();
  const [vals2, setVals2] = useState();

  const { running2 } = useAppCtx();

  function generateRandomFloatInRange(min, max) {
    return parseFloat(Math.random() * (max - min + 1) + min).toFixed(0);
  }
  useEffect(() => {
    setVals(generateRandomFloatInRange(547, 589));
    setVals2(generateRandomFloatInRange(327, 346));
  }, [running2]);
  return (
    <div className="hidden overflow-hidden lg:flex h-screen w-[100%] md:w-[25%] pb-20 bg-black flex-col gap-3 overflow-y-scroll scrollbar-hide">
      <div className=" w-full text-gray-400  flex-col flex justify-between items-center sticky shadow-lg gap-4 bg-black px-3 py-2 top-0 z-30">
        <div className="flex justify-between items-center w-full">
          <div className="flex w-full justify-between">
            <div className="flex justify-center flex-col items-center">
              <div>Online</div>
              <div className="text-[#DD2222]">{vals}</div>
            </div>
            <div className="flex justify-center flex-col items-center">
              <div>Playing</div>
              <div className="text-[#DD2222]">{vals2}</div>
            </div>
          </div>
        </div>
        <div className="flex w-full text-[13px] py-[2px] border border-gray-400 text-[#DD2222] justify-evenly gap-10">
          <div>Username</div>
          <div>@</div>
          <div>Amount</div>
          <div>Profit</div>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-2 bg-[#0e1117] h-full bg-opacity-[50%]">
        {liveBets?.map((item, index) => {
          return (
            <Bet
              key={index}
              profit={
                item?.data
                  ? item?.data?.at !== null && item?.data?.win === true
                    ? (
                        parseFloat(item?.data?.at).toFixed(2) *
                          parseFloat(item?.data?.amount).toFixed(2) -
                        parseFloat(item?.data?.amount).toFixed(2) -
                        0.2 *
                          (parseFloat(item?.data?.at).toFixed(2) *
                            parseFloat(item?.data?.amount).toFixed(2) -
                            parseFloat(item?.data?.amount).toFixed(2))
                      ).toFixed(2)
                    : item?.data?.at !== null && item?.data?.win === false
                    ? item?.data?.amount
                    : "-"
                  : item?.at !== null && item?.win === true
                  ? (
                      parseFloat(item?.at).toFixed(2) *
                        parseFloat(item?.amount).toFixed(2) -
                      parseFloat(item?.amount).toFixed(2) -
                      0.2 *
                        (parseFloat(item?.at).toFixed(2) *
                          parseFloat(item?.amount).toFixed(2) -
                          parseFloat(item?.amount).toFixed(2))
                    ).toFixed(2)
                  : item?.at !== null && item?.win === false
                  ? item?.amount
                  : "-"
              }
              win={item?.data?.win || item?.win}
              at={item?.data?.at || item?.at}
              betAmount={
                item?.data?.amount !== null || item?.amount !== null
                  ? item?.data?.amount || item?.amount
                  : "-"
              }
              username={item?.data?.username || item?.username}
            />
          );
        })}
      </div>
    </div>
  );
}

{
}

export default SideBar;
