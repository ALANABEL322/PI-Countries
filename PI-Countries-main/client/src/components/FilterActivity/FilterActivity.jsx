import { React, useState, useEffect } from "react";
import { getActivity, filterByActivity } from "../../redux/actions/actions";
import style from "./FilterActivity.module.css";
import { useDispatch, useSelector } from "react-redux";

const FilterActivity = ({ setPage }) => {
  const errorFilter = useSelector((state) => state.errorFilter);
  const activity = useSelector((state) => state.activity);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    dispatch(getActivity());
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    if (!filters.includes(e.target.value)) {
      filters.push(e.target.value);
      dispatch(filterByActivity(e.target.value));
      setPage(1);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setFilters([]);
    dispatch(filterByActivity());
  };

  return (
    <div className={style.filterActivity}>
      <label htmlFor="activities">
        {" "}
        Activities:
        <br />
        {errorFilter && <span>No activities</span>}
        <select
          id="activities"
          onChange={(e) => handleChange(e)}
          className={style.activities}
        >
          <option>All</option>
          {activity?.map((act) => (
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
              . {filter} <br />
            </span>
          ))}
      </label>
    </div>
  );
};

export default FilterActivity;
