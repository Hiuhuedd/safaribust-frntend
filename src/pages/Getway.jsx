import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Getway() {
  const path = useNavigate();

  useEffect(() => {
    path("/", { replace: true });
  }, []);
  return <div></div>;
}

export default Getway;
