import React from "react";
import styles from "./CardCountry.module.css";
import { useNavigate } from "react-router-dom";

const CardCountry = ({ country }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.cardContainer}
      onClick={() => navigate(`/${country.id}`)}
    >
      <img src={country.flag_image} width="400" alt={country.name} />
      <h5 className={styles.cardId}> {country.id?.toUpperCase()}</h5>
      <h3 className={styles.cardTitle}> {country.name} </h3>
      <h5 className={styles.cardSubTitle}> {country.capital} </h5>
      <small className={styles.cardTitle}>
        {" "}
        <strong> Población: {country.population} </strong>{" "}
      </small>
    </div>
  );
};

export default CardCountry;
