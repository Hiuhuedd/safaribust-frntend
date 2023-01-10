import React, { useState } from "react";
import { useAppCtx } from "../context/AppContext";
import { useDisclosure } from "@chakra-ui/react";

import HistoryModal from "./HistoryModal";

function HistoryBar() {
  const { crushHistory } = useAppCtx();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [item, setItem] = useState(null);

  return (
    <nav className="relative rounded-md ">
      <div className="flex h-[40px] gap-3 bg-black whitespace-nowrap px-10  relative overflow-x-scroll scrollbar-hide items-center p-2 rounded-md text-white">
        {crushHistory !== null &&
          crushHistory?.map((item, index) => {
            return (
              <>
                {item?.serverSeed && (
                  <div
                    onClick={() => {
                      setItem(item);
                      onOpen();
                    }}
                    key={item?.result?.serverSeed}
                    className="bg-gradient-to-b  p-[1px] from-[#15226C] to-[#A83438] rounded-xl cursor-pointer shadow-lg"
                  >
                    <div className="bg-[#0d0f13] hover:bg-[#161b25] px-4 rounded-xl text-[14px]">
                      {item?.point}x
                    </div>
                  </div>
                )}
              </>
            );
          })}
      </div>
      <HistoryModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        data={item ? item : []}
      />
      <div className="absolute rounded-md top-0 right-0 h-10 w-1/12 bg-gradient-to-l from-black" />
      <div className="absolute rounded-md top-0 left-0 h-10 w-1/12 bg-gradient-to-r from-black" />
    </nav>
  );
}
export default HistoryBar;
