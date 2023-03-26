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
                            
                </p>
            </div>
                <button type = "button" className={style.button}  onClick = {()=>handleStart()}/>
            </div>
    )
};

export default LandingPage;