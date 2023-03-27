import React from "react";
import style from "./Landing.module.css";
import {getAllCountries} from "../../redux/actions/actions";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

const LandingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleStart = () => {
         dispatch(getAllCountries());
        console.log("11111")
        navigate("/home")
    }

    

    return (
        <div className= {style.container}> 
            <div className={style.landing}>
                <p className={style.text}>
                Welcome to my country website made in Henry!
               <br/>
In this web application you will find an extensive catalog of information about different countries around the world.
On this page, you will find up-to-date, reliable and diverse content, so you can immerse yourself in the fascinating diversity of our planet. In addition, I am committed to offering you the best user experience possible, with easy and intuitive navigation, attractive design and full functionality.<br/>
Explore this website and discover all there is to offer - I'm thrilled you've arrived here and hope you enjoy your discovery experience! Done by Alan Abel Pereyra at Henry ❤️      
                </p>
            </div>
                <button type = "button" className={style.button}  onClick = {()=>handleStart()}> welcome to world countries! </button>
            </div>
    )
};

export default LandingPage;