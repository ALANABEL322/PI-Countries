import { useDispatch, useSelector } from "react-redux";
import {
  getActivity,
  orderByName,
  filterByContinent,
  orderByPopulation,
  filterByActivity,
  getAllCountries,
} from "../../redux/actions/actions";
import style from "./FilterContinent";
import { React, useEffect } from "react";

const FilterContinent = ({ resetFilter }) => {
  const dispatch = useDispatch();

  const handleChangeContinent = (e) => {
    dispatch(filterByContinent(e.target.value));
    resetFilter();
  };

  return (
    <div className={style.container}>
      <label>Filter by Continent</label>
      <select name="select" onChange={(e) => handleChangeContinent(e)}>
        <option value={"All"}>All</option>
        <option value={"Africa"}>Africa</option>
        <option value={"Antarctica"}>Antarctica</option>
        <option value={"Asia"}>Asia</option>
        <option value={"Europe"}>Europe</option>
        <option value={"North America"}>North America</option>
        <option value={"South America"}>South America</option>
        <option value={"Oceania"}>Oceania</option>
      </select>
    </div>
  );
};

export default FilterContinent;
