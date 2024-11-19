import React from "react";
import style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={style.loadingContainer}>
      <div className={style.spinner}></div>
      <p className={style.par}>Loading...</p>
    </div>
  );
};

export default Loader;
