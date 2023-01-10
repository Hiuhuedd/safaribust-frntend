import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import DataGridTable from "../components/DataTable";
import { useAppCtx } from "../context/AppContext";

const BASE_URL = "https://backend.safaribust.co.ke/graphql";

function BetHistoryModal({ isOpen, onClose,pageState,handlePageChange }) {

  const {userName}=useAppCtx()

  const [data, setData]=useState([])
  // console.log(data)
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent overflow={"scroll"}>
          <ModalHeader>
            <span className="text-[25px] text-black">Bet History {userName}</span>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="w-full">
              <input type={"date"} className="block w-1/3 px-4 py-2 mt-2 text-[#000] bg-white border rounded-md focus:border-[#000] focus:ring-[#000] focus:outline-none focus:ring focus:ring-opacity-40" 
              onChange={(e)=>{
                console.log(e.target.value)
                let items=pageState.data.filter(item=>item.createdAt.includes(e.target.value))
                console.log(items)
                if(items.length>0){
                  setData(items)
                }
              }}/>
            </div>
            <DataGridTable
              pageState={data.length>0?data:pageState}
              handlePageChange={handlePageChange}
              filtered={data.length>0?data:pageState}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BetHistoryModal;
