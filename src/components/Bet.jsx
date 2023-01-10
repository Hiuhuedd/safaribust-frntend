import React from "react";
function Bet({ win, profit, username, betAmount, at }) {
  return (
    <div
      className={
        win
          ? "bg-black flex overflow-x-scroll scrollbar-hide pl-0 py-1 gap-10 rounded-md shadow-md justify-evenly items-center text-green-500"
          : win === false
          ? "bg-black flex overflow-x-scroll scrollbar-hide pl-0 py-1 gap-10 rounded-md shadow-md justify-evenly items-center text-red-500 "
          : "bg-black flex overflow-x-scroll scrollbar-hide pl-0 py-1 gap-10 rounded-md shadow-md justify-evenly items-center text-yellow-500"
      }
    >
      <div className="rounded-md text-[12px] shadow-md">{username}</div>
      <div className="rounded-md text-[12px] shadow-md">{at}x</div>
      <div className="rounded-md text-[12px] shadow-md">{betAmount}</div>
      <div
        className={"rounded-md text-[12px] shadow-md whitespace-nowrap gap-1"}
      >
        {win ? "+" : "-"}
        {profit}
      </div>
    </div>
  );
}

export default Bet;
