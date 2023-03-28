import { React, useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import {
  //   getAllCountries,
  findCountries,
  //   orderByName,
  orderByPopulation,
} from "../../redux/actions/actions";
import FilterActivity from "../FilterActivity/FilterActivity";
import FilterContinent from "../FilterContinent/FilterContinent";
import CardCountry from "../CardCountry/CardCountry";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [countryList, setCountryList] = useState([]);
  const dispatch = useDispatch();
  const [orderName, setOrderName] = useState("");
  const [orderPopulation, setOrderPopulation] = useState("");
  const countries = useSelector((state) => state.countries);
  const pageNamber = Math.ceil(countries.length / 10);
  useEffect(() => {
    setCountryList(countries);
  }, [countries]);
  const [page, setPage] = useState(0);

  const changePage = (nextPage) => {
    if (nextPage < 0) {
      return;
    }
    if (pageNamber <= nextPage) {
      return;
    }
    setPage(nextPage);
  };
  const changeOrderName = (order) => {
    if (order === "az") {
      const newArray = countryList.sort((a, b) => a.name.localeCompare(b.name));
      setCountryList(newArray);
    }
    if (order === "za") {
      const newArray = countryList.sort((a, b) => a.name.localeCompare(b.name));
      setCountryList(newArray.reverse());
    }
    setPage(0);
  };

  const handleOnSearch = (e) => {
    dispatch(findCountries(e.target.value));
    setPage(0);
  };

  const handleOrderPopulation = (e) => {
    setOrderPopulation(e.target.id);
    dispatch(orderByPopulation(e.target.id));
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.homeContainer}>
        <div className={styles.filterContainer}>
          <nav className={styles.lateralBar}>
            <label htmlFor="search">
              Search Country:
              <input
                id="search"
                type="search"
                placeholder="Country Name ..."
                onChange={(e) => handleOnSearch(e)}
                className={styles.bar}
              />
            </label>

            <div className={styles.filters}>
              <div className={styles.filtersTitle}>Filters</div>
              <FilterActivity setPage={setPage} />
              <FilterContinent setPage={setPage} />
            </div>
            <div className={styles.items}>
              <div className={styles.titles}>Orders</div>
              <span>Name</span>
              <div className={styles.order}>
                <label htmlFor="az" className={styles.input}>
                  <input
                    type="radio"
                    name="orderName"
                    id="az"
                    checked={orderName === "az"}
                    onChange={(e) => changeOrderName(e)}
                  />
                  A - Z
                </label>
                <label htmlFor="za" className={styles.input}>
                  <input
                    type="radio"
                    name="orderName"
                    id="za"
                    checked={orderName === "za"}
                    onChange={(e) => changeOrderName(e)}
                  />
                  Z - A
                </label>
              </div>
              <span>Quantity Population</span>
              <div className={styles.order}>
                <label htmlFor="up">
                  <input
                    type="radio"
                    id="up"
                    name="orderPopulation"
                    checked={orderPopulation === "up"}
                    onChange={(e) => handleOrderPopulation(e)}
                  />
                  Ascending
                </label>
                <label htmlFor="down">
                  <input
                    type="radio"
                    id="down"
                    name="orderPopulation"
                    checked={orderPopulation === "down"}
                    onChange={(e) => handleOrderPopulation(e)}
                  />
                  Descending
                </label>
              </div>
            </div>
          </nav>
          {/* <div className={styles.positionFixed}>
            <button onClick={() => changeOrderName("az")}> A - Z </button>
            <button onClick={() => changeOrderName("za")}> Z - A </button>
          </div> */}
        </div>
        <div>
          <div className={styles.cardCatalogo}>
            {countryList.slice(page * 10, page * 10 + 10).map((country) => {
              return <CardCountry country={country} />;
            })}
          </div>
        </div>
      </div>
      <div className={styles.paginate}>
        <div className={styles.divPaginate}>
          <button onClick={() => changePage(page - 1)}>Anterior</button>
          {Array.from({ length: pageNamber }, (_v, i) => i).map((pagina) => {
            return (
              <button
                disabled={pagina === page}
                onClick={() => changePage(pagina)}
              >
                {pagina + 1}
              </button>
            );
          })}
          <button onClick={() => changePage(page + 1)}>Siguiente</button>
        </div>
      </div>
    </div>
  );
};
export default Home;
