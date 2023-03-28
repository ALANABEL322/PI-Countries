import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getActivity, postActivity } from "../../redux/actions/actions";
import NavBar from "../NavBar/NavBar";
import styles from "./FormCountry.module.css";

const FormCountry = () => {
  const history = useNavigate();

  const activities = useSelector((state) => state.activities);
  const dispatch = useDispatch();

  const [formActivity, setActivity] = useState([]);
  const [form, setForm] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState({});

  const validationName = (e) => {
    if (e.target.value.length > 250) {
      error.name = "The name characters are way to many";
    } else {
      error.name = null;
    }
  };

//   const validationContinent = (e) => {
//     if (!continent(e.target.value)) {
//       error.continent = "enter a continent";
//     } else {
//       error.continent = null;
//     }
//   };

//   const validationActvity = () => {n
//     if (formActivity.length === 1) {
//       error.activity = "The activity must have at least one activity.";
//     }
//   };

  useEffect(() => {
    dispatch(getActivity());
  }, [dispatch]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(postActivity(form));
    return history(`/home`);
  };

  const handleName = (e) => {
    e.preventDefault();
    validationName(e);
    setForm({
      ...form,
      name: e.target.value,
    });
  };

  const handleCapital = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      capital: e.target.value,
    });
  };

  const handleSubregion = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      subregion: e.target.value,
    });
  };

  const handleFlagImage = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      flag_image: e.target.value,
    });
  };

  const handleArea = (e) => {
    e.preventDefault();
    validationName(e);
    setForm({
      ...form,
      area: e.target.value,
    })
  };

  const handleActivity = (e) => {
    e.preventDefault();
    error.activity = null;
    if (e.target.value !== "select_activity") {
      formActivity.push(e.target.value);
      setForm({
        ...form,
        activity: formActivity,
      });
    }
  };

  const handlePopulation = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      population: e.target.value,
    });
  };

  const handleActivityX = (e) => {
    e.preventDefault();
    setActivity(formActivity.filter((activity) => activity !== e.target.value));
    // validationActvity();
  };

  return (
    <>
      <NavBar />
      <div className={styles.page}>
        <form onSubmit={(e) => handleOnSubmit(e)} className={styles.form}>
          <label htmlFor="name">
           <strong> Name</strong> <span className={styles.asterisco}>*</span>
          </label>
          {error.name && <span className={styles.asterisco}>{error.name}</span>}
          <input type="text" id="name" onChange={(e) => handleName(e)} />

          <label htmlFor="Capital">
            <strong>Capital</strong> <span className={styles.asterisco}>*</span>
          </label>
          {error.capital && (
            <span className={styles.asterisco}>{error.capital}</span>
          )}
          <input
            type="text"
            id="capital"
            onChange={(e) => handleCapital(e)}
          />

          <label htmlFor="subregion">
            <strong>Subregion</strong><span className={styles.asterisco}>*</span>
          </label>
          {error.subregion && (
            <span className={styles.asterisco}>{error.subregion}</span>
          )}
          <input
            type="text"
            id="subregion"
            onChange={(e) => handleSubregion(e)}
          />

          <label htmlFor="flag_image"><strong>Flag Image</strong></label>
          <input
            type="text"
            id="image"
            onChange={(e) => handleFlagImage(e)}
          />
          <label htmlFor="area"><strong>Area</strong></label>
          {error.area && (
            <span className={styles.asterisco}>{error.area}</span>
          )}
          <input
            type="number"
            id="area"
            onChange={(e) => handleArea(e)}
            placeholder="area..."
          />

          <label htmlFor="activiity"> 
           <strong>Activity </strong><span className={styles.asterisco}>*</span>
          </label>
          {error.activity && (
            <span className={styles.asterisco}> {error.activity} </span>
          )}
          <select
            className={styles.select}
            id="activity"
            onChange={(e) => handleActivity(e)}
          >
            <option value="select_activity">Select activities...</option>
            {activities.length > 0 &&
              activities.map((activity) => (
                <option key={activity.name} value={activity.name}>
                  {activity.name}
                </option>
              ))}
          </select>
          {formActivity.length > 0 &&
            formActivity.map((activiity) => (
              <span key={activiity}>
                · {activiity}
                <button value={activiity} onClick={(e) => handleActivityX(e)}>
                  x
                </button>
              </span>
            ))}
          <label htmlFor="population">
           <strong> Population</strong>  <span className={styles.asterisco}>*</span>
          </label>
          {error.population && (
            <span className={styles.asterisco}>{error.population}</span>
          )}
          <input
            className={styles.textDescription}
            type="number"
            id="population"
            placeholder="population..."
            onChange={(e) => handlePopulation(e)}
            rows="20"
            cols="30"
          ></input>
          <span className={styles.asterisco}>{error.error}</span>
          {!error.name &&
            !error.area&&
            !error.population &&
            !error.capital &&
            !error.activities && (
              <input
                className={styles.enviar}
                type="submit"
                style={{ cursor: "pointer" }}
              />
            )}
        </form>
      </div>
    </>
  );
};

export default FormCountry;