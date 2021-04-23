import React from "react";
import loading from "../assets/loading.svg";

const Loading = () => (
  <div className="spinner">
    <img src={loading} width={200} alt="Loading" />
  </div>
);

export default Loading;
