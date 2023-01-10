import React, { useEffect, useState } from "react";
import { useAppCtx } from "../context/AppContext";

function Game() {
  const [running] = useState(true);
  const [autoCashout, setAutocashout] = useState(2.0);
  const [point, setCrashpoint] = useState([]);
  const [value] = useState(false);

  const { time, timeHandler } = useAppCtx();

  const getCrush = async () => {
    const resp = await fetch(
      "http://localhost:8010"
    ).catch((err) => console.log(err));
    const res = await resp.json();
    setCrashpoint(res);
  };

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        timeHandler();
      }, 50);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    let timer;

    return () => clearInterval(timer);
  }, [time]);

  useEffect(() => {
    getCrush();
  }, [value]);

  const Completionist = () => (
    <div className="text-[30px] text-red-white">0.0.0</div>
  );

  return (
    <div className="flex h-[300px] w-full select-none gap-4 overflow-hidden flex-col lg:flex-row ">
      <div className="bg-black text-white text-[40px] relative min-h-[300px] flex justify-center items-center rounded-md w-full lg:w-[70%]">
        <p>{time.toFixed(2)}x</p>
      </div>
      <div className="w-full ">
        <label className="text-[10px]">Cashout value</label>
        <div className="w-full bg-[#0d0f13] rounded-md">
          <input
            type={"number"}
            value={autoCashout}
            onChange={(e) => setAutocashout(e.target.value)}
            className="bg-black text-[14px] w-12 lg:w-full border-none outline-none ring-0 focus:ring-0 focus:outline-0"
          />
        </div>
        {autoCashout < 1.01 && (
          <span className="text-red-600 text-[9px]">
            Must be greater than 1.01
          </span>
        )}
        {autoCashout < 1 && (
          <span className="text-red-600 text-[9px]">
            Must be greater than 1
          </span>
        )}
      </div>
      <div className="flex justify-center select-none items-center gap-2 flex-col">
        <p className="text-[12px] text-[#DD2222] select-none font-medium">
          "Bet placed for next round"
        </p>

        <div
          //onClick={startHandlerOne}
          className="shadow-lg w-[150px] md:w-[150px] px-2 py-4 justify-center flex first-letter: bg-[#263C92] cursor-pointer rounded-md hover:bg-[#102061]"
        >
          Start
        </div>

        <div
          // onClick={cashoutOneHandler}
          className="shadow-lg w-[150px] md:w-[150px] px-2 py-4 justify-center flex first-letter: bg-yellow-700 cursor-pointer rounded-md hover:bg-yellow-800"
        >
          Cashout {time.toFixed(2)}x
        </div>
        <div
          // onClick={cacelBetOneHandler}
          className="shadow-lg w-[150px] md:w-[150px] px-2 py-4 justify-center flex first-letter: bg-[#DD2222] cursor-pointer rounded-md hover:bg-[#ac1111]"
        >
          Cancel
        </div>
      </div>
    </div>
  );
}

export default Game;
