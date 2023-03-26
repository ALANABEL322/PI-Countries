import { useDispatch, useSelector } from "react-redux";
import { getActivity, orderByName, filterByContinent, orderByPopulation, filterByActivity, getAllCountries} from "../../redux/actions/actions";
import style from "./FilterContinent"
import {React,  useEffect } from 'react';

const FilterContinent = () =>{
    const dispatch = useDispatch();
    const activities = useSelector((state)=>state.activities);

    useEffect(()=> {
        dispatch(getActivity());
        dispatch(getAllCountries());
      },[dispatch]);


    function handleChangeName(e) {
      e.preventDefault()
      dispatch(orderByName(e.target.value));
    }
    function handleChangePopulation(e) {
      e.preventDefault()
      dispatch(orderByPopulation(e.target.value));
    }
    //FILTERS
    function handleChangeContinent(e) {
      dispatch(filterByContinent(e.target.value));
      
    }
    function handleChangeActivity(e) {
      e.preventDefault()
      dispatch(filterByActivity(e.target.value));
    }
  return (
    <div className={style.container}>
        <label>Order by name</label>
        <select name="select" onChange={handleChangeName}>
            <option value="" >Select</option>
            <option value={"DESCENDENTE"}> Ascendent</option>
            <option value={"ASCENDENTE"}>Descendent</option>
        </select>
        <label>Order by population</label>
        <select name="select" onChange={handleChangePopulation}>
            <option value="" >Select</option>
            <option value={"MINOR"}>Minor population</option>
            <option value={"MAJOR"}>Major population</option>
        </select>
        <label>Filter by continent</label>
        <select name="select" onChange={handleChangeContinent}>
            <option value={""}>Select</option>
            <option value={"All"}>All</option>
            <option value={"Africa"}>Africa</option>
            <option value={"Antarctica"}>Antarctica</option>
            <option value={"Asia"}>Asia</option>
            <option value={"Europe"}>Europe</option>
            <option value={"North America"}>North America</option>
            <option value={"South America"}>South America</option>
            <option value={"Oceania"}>Oceania</option>
        </select>
        <label>Filter by activities</label>
        <select name="select" onChange={handleChangeActivity}>
            <option value={""}>Select</option>
            <option value={"All"}>All</option>
            {activities.length ? activities.map((c)=>{
              return (
              <option key={c.id} value={c.name}>{c.name}</option> )
              })
              : <option disabled>No activities</option>
            }
        </select>
    </div>
  )
}

export default FilterContinent;