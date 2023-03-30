import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./CountryDetail.module.css";
import { countryDetail } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";

const CountryDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const detail = useSelector((state) => state.detail);
  useEffect(() => {
    dispatch(countryDetail(params?.id?.toUpperCase()));
  }, [params]);

  return (
    <div className={style.container}>
      <NavBar />
      {!detail.id && (
        <div className={style.all}>
          <div className={style.loader}>
            <div className={style.bar1}></div>
            <div className={style.bar2}></div>
            <div className={style.bar3}></div>
            <div className={style.bar4}></div>
            <div className={style.bar5}></div>
            <div className={style.bar6}></div>
            <div className={style.bar7}></div>
            <div className={style.bar8}></div>
            <div className={style.bar9}></div>
            <div className={style.bar10}></div>
            <div className={style.bar11}></div>
            <div className={style.bar12}></div>
          </div>
        </div>
      )}
      {detail.id && (
        <div className={style.detail}>
          <div className={style.card}>
            <div className={style.country}>
              <div className={style.detail}>
                <div className={style.items}>
                  {/* <div className={style.list}>
                    <span>Activities: </span>
                    <br />
                    <div>
                      {detail.activities.map((act) => (
                        <div key={act.name ?? act}>· {act.name ?? act}</div>
                      ))}
                    </div>
                  </div> */}
                  <div>
                    <span className={style.name}> Nombre: {detail.name}</span>
                    <span className={style.activities_continents}>
                      {detail.continent.map((cont) => (
                        <div key={cont}> Continents: {cont} </div>
                      ))}
                    </span>
                  </div>
                </div>

                <div>
                  Capital: {detail.capital}
                  <br />
                  Subregion: {detail.subregion}
                </div>
                <div className={style.description}>
                  <span>{`Population: ${detail.population}`}</span>
                  <br />
                  <br />
                </div>
              </div>
              <div className={style.img}>
                <img
                  src={detail.flag_image}
                  alt="error"
                  width="300"
                  height="200"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDetail;
