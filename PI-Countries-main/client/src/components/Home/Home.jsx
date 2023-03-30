import { React, useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import {
  getAllCountries,
  findCountries,
  orderByName,
  orderByPopulation,
} from "../../redux/actions/actions";
import FilterActivity from "../FilterActivity/FilterActivity";
import FilterContinent from "../FilterContinent/FilterContinent";
import CardCountry from "../CardCountry/CardCountry";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const [orderName, setOrderName] = useState(null);
  const [orderPopulation, setOrderPopulation] = useState(null);
  const countriesAux = useSelector((state) => state.countriesAux);
  const countries = useSelector((state) => state.countries);
  const pageNamber = Math.ceil(countriesAux.length / 10);

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(getAllCountries());
    }
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
    setOrderName(order);
    dispatch(orderByName(order));
    setOrderPopulation(null);
    setPage(0);
  };

  const handleOnSearch = (e) => {
    dispatch(findCountries(e.target.value));
    setPage(0);
  };

  const handleOrderPopulation = (order) => {
    setOrderPopulation(order);
    setOrderName(null);
    dispatch(orderByPopulation(order));
    setPage(0);
  };
  const resetFilter = () => {
    setPage(0);
    setOrderName(null);
    setOrderPopulation(null);
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
              <FilterActivity setPage={setPage} resetFilter={resetFilter} />
              <FilterContinent resetFilter={resetFilter} />
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
                    onChange={() => changeOrderName("az")}
                  />
                  A - Z
                </label>
                <label htmlFor="za" className={styles.input}>
                  <input
                    type="radio"
                    name="orderName"
                    id="za"
                    checked={orderName === "za"}
                    onChange={() => changeOrderName("za")}
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
                    checked={orderPopulation === "ascending"}
                    onChange={() => handleOrderPopulation("ascending")}
                  />
                  Ascending
                </label>
                <label htmlFor="down">
                  <input
                    type="radio"
                    id="down"
                    name="orderPopulation"
                    checked={orderPopulation === "descending"}
                    onChange={() => handleOrderPopulation("descending")}
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
            {countriesAux.length &&
              countriesAux?.slice(page * 10, page * 10 + 10).map((country) => {
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
