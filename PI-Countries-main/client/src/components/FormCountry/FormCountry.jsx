import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCountries, postActivity } from "../../redux/actions/actions";
import NavBar from "../NavBar/NavBar";
import styles from "./FormCountry.module.css";
import axios from "axios";
const apiUrl = "http://localhost:3001";

const FormCountry = () => {
  const history = useNavigate();

  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  const [form, setForm] = useState({ countries: [] });
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  const handleOnSubmit = (e) => {
    console.log(form);
    e.preventDefault();
    if (!form.name) {
      setError({ ...error, name: "Please enter a name" });
      return;
    }

    if (!form.difficulty) {
      setError({ ...error, difficulty: "place enter a difficulty" });
      return;
    }
    if (!form.season) {
      setError({ ...error, season: "place enter a season" });
      return;
    }
    if (!form.duration) {
      setError({ ...error, duration: "place enter a duration" });
      return;
    }
    if (!form.countries.length) {
      setError({ ...error, countries: "place enter a countries" });
      return;
    }
    dispatch(postActivity(form));
    // return history(`/home`);
  };

  const handleName = (e) => {
    setError({ ...error, name: null });

    setForm({
      ...form,
      name: e.target.value,
    });
  };

  const handleDifficulty = (e) => {
    setError({ ...error, difficulty: null });
    setForm({
      ...form,
      difficulty: e.target.value,
    });
  };

  const handleSeason = (e) => {
    setError({ ...error, season: null });
    setForm({
      ...form,
      season: e.target.value,
    });
  };

  const handleDuration = (e) => {
    setError({ ...error, duration: null });
    setForm({
      ...form,
      duration: Number(e.target.value),
    });
  };

  const handleActivity = (e) => {
    setError({ ...error, countries: null });
    if (e.target.value) {
      setForm({
        ...form,
        countries: form.countries.concat(e.target.value),
      });
    }
  };

  const handleActivityX = (e) => {
    let newArrayCountries = form.countries.filter(
      (activity) => activity !== e.target.value
    );

    setForm({ ...form, countries: newArrayCountries });
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

          <label htmlFor="Difficulty">
            <strong>Difficulty</strong>{" "}
            <span className={styles.asterisco}>*</span>
          </label>
          {error.difficulty && (
            <span className={styles.asterisco}>{error.difficulty}</span>
          )}
          <select
            className={styles.select}
            id="dificulty"
            onChange={(e) => handleDifficulty(e)}
          >
            <option value="">Select Difficulty..</option>
            {[1, 2, 3, 4, 5].map((seans) => (
              <option key={seans} value={seans}>
                {seans}
              </option>
            ))}
          </select>

          <label htmlFor="season">
            <strong>Season</strong>
            <span className={styles.asterisco}>*</span>
          </label>
          <select
            className={styles.select}
            id="season"
            onChange={(e) => handleSeason(e)}
          >
            <option value="">Select Season...</option>
            {["summer", "autumn", "winter", "spring"].map((seans) => (
              <option key={seans} value={seans}>
                {seans}
              </option>
            ))}
          </select>
          {error.season && (
            <span className={styles.asterisco}>{error.season}</span>
          )}

          <label htmlFor="duration">
            <strong>Duration</strong>
            <small> (*Days)</small>
          </label>
          {error.duration && (
            <span className={styles.asterisco}>{error.duration}</span>
          )}
          <input
            type="number"
            id="duration"
            onChange={(e) => handleDuration(e)}
            placeholder="duration..."
          />

          <label htmlFor="activiity">
            <strong>Countries </strong>
            <span className={styles.asterisco}>*</span>
          </label>
          {error.countries && (
            <span className={styles.asterisco}> {error.countries} </span>
          )}
          <select
            className={styles.select}
            id="countries"
            onChange={(e) => handleActivity(e)}
          >
            <option value="">Select countries...</option>
            {countries.length > 0 &&
              countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
          </select>
          {form?.countries?.length > 0 &&
            form.countries.map((activiity) => (
              <span key={activiity}>
                · {activiity}
                <button value={activiity} onClick={(e) => handleActivityX(e)}>
                  x
                </button>
              </span>
            ))}

          <span className={styles.asterisco}>{error.error}</span>

          <input
            className={styles.enviar}
            type="submit"
            style={{ cursor: "pointer" }}
          />
        </form>
      </div>
    </>
  );
};

export default FormCountry;
