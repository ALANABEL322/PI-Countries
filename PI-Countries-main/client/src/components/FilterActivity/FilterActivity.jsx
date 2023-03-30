import { React, useState, useEffect } from "react";
import { getAllActivity, filterByActivity } from "../../redux/actions/actions";
import style from "./FilterActivity.module.css";
import { useDispatch, useSelector } from "react-redux";

const FilterActivity = ({ setPage, resetFilter }) => {
  const allActivities = useSelector((state) => state.allActivities);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    dispatch(getAllActivity());
  }, [allActivities]);

  const handleChange = (e) => {
    if (!filters.includes(e.target.value)) {
      setPage(0);
      setFilters(filters.concat(e.target.value));
      dispatch(filterByActivity(filters.concat(e.target.value)));
    }
  };

  const handleClick = (e) => {
    setFilters([]);
    resetFilter();
    dispatch(filterByActivity([]));
  };

  return (
    <div className={style.filterActivity}>
      <label htmlFor="activities">
        {" "}
        Activities:
        <br />
        <select
          id="activities"
          onChange={(e) => handleChange(e)}
          className={style.activities}
        >
          <option>All</option>
          {allActivities?.map((act) => (
            <option value={act.name} key={act.id}>
              {act.name}
            </option>
          ))}
          ;
        </select>
        <button onClick={(e) => handleClick(e)} className={style.button}>
          X
        </button>
        <br />
        {filters.length > 0 &&
          filters?.map((filter) => (
            <span key={filter}>
              {filter} <br />
            </span>
          ))}
      </label>
    </div>
  );
};

export default FilterActivity;
