import {React, useState, useEffect} from "react";
import NavBar from "../NavBar/NavBar";
import {getAllCountries, findCountries, orderByName, orderByPopulation} from "../../redux/actions/actions";
import FilterActivity from "../FilterActivity/FilterActivity";
import FilterContinent from "../FilterContinent/FilterContinent";
import CardCountry from "../CardCountry/CardCountry";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";




const Home = () => {
    const [countryList, setCountryList] = useState([])
    const countries = useSelector((state) => state.countries);
    const pageNamber =  Math.ceil(countries.length / 10 ) 
    useEffect(() => {
        setCountryList(countries)
      }, [countries]);
    const [page, setPage] = useState(0)
    const changePage = (nextPage) => {
        if(nextPage < 0){
            return 
        }
        if(pageNamber <= nextPage){
         return   
        }
        setPage(nextPage);
    }
    const changeOrderName = (order) => {
        
        
        if(order === "az"){
            const newArray = countryList.sort((a, b) => a.name.localeCompare(b.name));
           
            setCountryList(newArray)
        }
        if(order === "za"){
            const newArray = countryList.sort((a, b) => a.name.localeCompare(b.name));
            setCountryList(newArray.reverse())
        }
        
        setPage(0) 
    }
        return (
            <div className={styles.container}> 
                <NavBar />
                <div className={styles.homeContainer}> 
                    <div className={styles.filterContainer}> 
                        <div className={styles.positionFixed}> 
                            <button onClick={()=> changeOrderName("az")}> A-Z </button>
                            <button onClick={()=> changeOrderName("za")}> Z-A </button>
                        </div>
                    </div>
                    <div className={styles.cardCatalogo}>   
                        {countryList.slice(page*10, (page*10) +10).map(country => {return ( <CardCountry country={country}/>)})}
                    </div>
                </div>
                <div className={styles.paginate}>  
                    <button onClick={()=> changePage(page-1)} > 
                        Anterior
                    </button>
                    {Array.from({length: pageNamber}, (_v, i) => i).map(pagina =>{return (
                    <button disabled={pagina===page} onClick={()=> changePage(pagina)} > 
                       {pagina+1}
                    </button>)})}
                    <button onClick={()=> changePage(page+1)}> 
                        Siguiente
                    </button>
                </div>
             </div>
        )




    //     const dispatch = useDispatch();
    //     const [orderName, setOrderName] = useState("");
    //     const [orderPopulation, setOrderPopulation] = useState("");
    //     const [page, setPage] = useState(1);
    //     const countriesPerPage = 10;
    //     const lastIndex = page* countriesPerPage;
    //     const firstIndex = lastIndex - countriesPerPage;
    //     const pageCountries = countries.slice(firstIndex, lastIndex);
    //     const pagesNamber = Math.ceil(countries.length / 10);
    //     const post = useSelector((state) => state.post)
    //     const pages = [];

    //     for (let i = 1; i <= pagesNamber; i++) {
    //         pages.push([i]);
    //     }
    //     useEffect(()=>{
    //         if(post===true){
    //             dispatch(getAllCountries());
    //         }
    //         if(countries.length === 0){
    //             dispatch(getAllCountries());
    //         }
    //     }, [dispatch, post, countries.length]);

    //     const handlePageChange = (newPage, paging) =>{
    //             if(newPage){
    //                 setPage(newPage[0]);
    //             }else if(page !== pagesNamber && paging === "+"){
    //                 setPage(page + 1);
    //             }else if (page !==1 && pages === "-"){
    //                 setPage(page - 1);
    //             }

                
    //     };
    //     const handleOrderName = (e) => {
    //         setOrderName(e.target.id);
    //         dispatch(orderByName(e.target.id))
    //     }
    //     const handleOrderPopulation = (e) => {
    //         setOrderPopulation(e.target.id);
    //         dispatch(orderByPopulation(e.target.id))
    //     }
    //     const handleOnSearch = (e) =>{
    //         dispatch(findCountries(e.target.value));
    //         setPage(1);
    //     }

    // return (
    //     <div className={style.container}> 
       
    //     <NavBar/> 
    //     <div className={style.filter}>
    //        <nav className={style.nav}/> 
    //        <label htmlFor="search"> 
    //        search Country:
    //        <input id = "search" type="search" placeholder="Country Name" onChange={(e) =>handleOnSearch(e)} className={style.bar}/>
           
           
    //        </label> 
    //        < div className={style.filter}> 
    //        </div>
    //        <div className={style.tittle}>
    //         Filters
    //        </div>
    //        <FilterActivity setPage={setPage}/>
    //        <FilterContinent setPage={setPage}/>
    //     </div>  
    //     <div className={style.item}>

    //     </div>
    //     <div className={style.tittle}>
    //         Orders
    //     </div>
    //     <span>
    //         Name
    //     </span>
    //     <div className={style.order}>
    //         <label htmlFor="as" className={style.input}>
    //            <input type="radio" name="orderName" id="as" checked={orderName === "as"} onChange={(e) => handleOrderName(e)}/>
    //            A - Z   
    //         </label>
    //         <label htmlFor="as" className={style.input}>
    //            <input type="radio" name="orderName" id="des" checked={orderName === "des"} onChange={(e) => handleOrderName(e)}/>
    //            Z - A   
    //         </label>
    //     </div>
    //     <span >
    //         Population 
    //     </span>
    //     <div className={style.order}> 
    //         <label>
    //             <input type="radio" name="orderPopulation" id="up" checked={orderPopulation === "up"} 
    //             onChange={(e) => handleOrderPopulation}/>
    //         </label>
    //     </div>
    //     <nav> </nav>
    //     <div className={style.number}>
    //         {countries.length>0 && ( 
    //             <div className={style.paging}>
    //                 {pages.length>1 && (
    //                     <button id="-" onClick={(e) => handlePageChange(null,e.target.id)} className={style.font}>
    //                         PREV  
    //                     </button>

    //                 )}
    //                 {pages.map((newPage)=>(
    //                    <button
    //                    key={newPage}
    //                    onClick={() => handlePageChange(newPage)}
    //                    className={style.font}
    //                  >
    //                    {newPage}
    //                  </button>
    //                ))}
    //                {pages.length > 1 && (
    //                  <button
    //                    id="+"
    //                    onClick={(e) => handlePageChange(null, e.target.id)}
    //                    className={style.font}
    //                  >
    //                    NEXT
    //                  </button>
    //                )}
    //              </div>
    //            )}
    //          </div>
    //          {countries.length > 0 ? (
    //            <div>
    //              <div className={style.pageNumberTop}>page: {page}</div>
    //              <div className={style.container}>
    //                {pageCountries.map((Country) => (
    //                  <CardCountry
    //                    id={Country.id}
    //                    key={Country.id}
    //                    name={Country.name}
    //                    Flag_image={Country.Flag_image}
    //                    activity={Country.activity}
    //                  />
    //                ))}
    //              </div>
    //            </div>
    //          ) : (
    //            <div className={style.all}>
    //              <div className={style.loader}>
    //                <div className={style.bar1}></div>
    //                <div className={style.bar2}></div>
    //                <div className={style.bar3}></div>
    //                <div className={style.bar4}></div>
    //                <div className={style.bar5}></div>
    //                <div className={style.bar6}></div>
    //                <div className={style.bar7}></div>
    //                <div className={style.bar8}></div>
    //                <div className={style.bar9}></div>
    //                <div className={style.bar10}></div>
    //                <div className={style.bar11}></div>
    //                <div className={style.bar12}></div>
    //              </div>
    //            </div>
    //          )}
    //        </div>
        
    //    );
     };
     //---------------------------------------------------------------------
     

export default Home;