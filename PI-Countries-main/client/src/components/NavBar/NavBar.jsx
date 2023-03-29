import React from "react";
import style from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className={style.nav}>
        <div className={style.logo}>
          <NavLink
            to="/"
            style={{ textDecoration: "None", color: "aliceBlue" }}
          >
            {" "}
            COUNTRY
            <img
              className={style.img}
              src="https://w7.pngwing.com/pngs/188/518/png-transparent-earth-graphy-globe-earth-globe-photography-atmosphere-thumbnail.png"
              alt="logo"
            />
          </NavLink>
        </div>

        <button className={style.button}>
          <NavLink to="/home" className={style.link}>
            <div className={style.div}> HOME </div>
          </NavLink>
        </button>
        <button className={style.button}>
          <NavLink to="/create" className={style.link}>
            {" "}
            <div className={style.div}> CREATE ACTIVITY</div>
          </NavLink>
        </button>
      </nav>
    </>
  );
};

export default NavBar;
