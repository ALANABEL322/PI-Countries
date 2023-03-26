import React from "react";
import style from "./NavBar.module.css";
import {NavLink} from "react-router-dom";



const NavBar = () => { 
    return (
        <> 
        <nav className={style.nav}>
        <div className={style.logo}> mi NavBar 
        <NavLink to="/" style={{textDecoration:"None", color:"aliceBlue"}}>

        {" "} COUNTRY 
        
        <img
              className={style.img}
              src="https://1.bp.blogspot.com/-nZWHxn-N72Q/XIafjdKz3HI/AAAAAAAAImo/dldCM94NHqw6r50tC9v-UnTt9xHocb7eACK4BGAYYCw/s1600/icon%2Bgame%2Bvideo.png"
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
        <NavLink to="/create" className={style.link}> <div className={style.div}> CREATE ACTIVITY</div>
        </NavLink>
        </button>
        </nav>
        
        </>
    )
}




export default NavBar;