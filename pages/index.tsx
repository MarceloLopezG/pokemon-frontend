import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from './components/navbar';
import styles from '../styles/home.module.css';
import styleDetails from '../styles/pokedexdetails.module.css';
import GetSearchedPokemon from './components/getsearchedpokemon';


const url = 'http://localhost:3000/pokemon/filter';


const Home = ({ result, totalPages }: any) => {
  const [pokemonList, setPokemonList] = useState([{
    id: '',
    name: '',
    front_default: '',
    type_one: '',
    type_two: ''
  }]);

  const [inputSearch, setInputSearch] = useState({
    pokemonName: ''
  });

  var arrPages = [];


  useEffect(() => {
    setPokemonList(result);
  }, []);



  for (var n = 0; n < totalPages; n++) {
    arrPages.push(n);
  }


  // Listen changes in inputs for search
  const handleChangeSearch = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    getPokemon(0, value);
    setInputSearch({ ...inputSearch, [name]: value });
  }


  const handleChangePaginate = (event: any) => {
    event.preventDefault();
    let currentValue = parseInt(event.target.value);
    getPokemon(currentValue, "");
  }


  const getPokemon = async (page: number, pokemonName: string) => {
    const res = await GetSearchedPokemon(page, 6, pokemonName); // Get 6 objects in each paginate
    setPokemonList(res.data);
  }


  return (
    <main className={styleDetails.mainContent}>
      <div className={styleDetails.navbarContent}>
        <Navbar />
        <div className={styleDetails.divLogoHeader}>
          <img src="https://res.cloudinary.com/diycfocmt/image/upload/v1683921415/whatthecode/logo_dclpjg.png" alt="" className={styleDetails.pokemonLogo} />
        </div>
      </div>

      <div className={styleDetails.dataContent}>
        <div className={styleDetails.wrapper}>
          <div className={styleDetails.divSearch}>
            <form>
              <div className={styles.inputContainerHome}>
                <input className={styleDetails.inputField} type="text" placeholder="Search" name="pokemonName" id='pokemonName' value={inputSearch.pokemonName} onChange={handleChangeSearch} />
                <i className={styles.iconSearch} />
              </div>
            </form>
          </div>
        </div>


        <div>
          <div className={styles.flexbox}>
            {pokemonList?.map((item, index) => (
              <div className={styles.flexboxItem}>
                <div className={styles.cardImageHome}>
                  <p className={styles.pokemonName}>{item.name}</p>
                  <p>{item.id}</p>
                  <a href={`/components/pokedexdetails/${item.id}`}><img src={item.front_default} alt="pokemon" className={styles.imgPokemonHome} /></a>
                  <br />
                  <div className={styleDetails.flexImgPokemonSm}>

                    <span className={styleDetails.habilityOne}>{item.type_one}</span>
                    {item.type_two ? <span className={styleDetails.habilityTwo}>{item.type_two}</span>
                      :
                      <></>}

                  </div>
                </div>
              </div>
            ))}
          </div>
          <br />
          <div className={styles.divButtonsPagina}>
            {arrPages?.map((itemBtn, index) => (
              <button className={styles.btnPaginate} value={index} onClick={handleChangePaginate}>{index}</button>
            ))}
          </div>

        </div>
      </div>
    </main>
  )
}


export async function getServerSideProps() {
  // By default, the first list of pokemon to show will be from page 0
  const response = await axios.post(url, {
    pokemonName: "",
    page: 0,
    size: 6
  }).then(resp => {
    return resp.data;
  });


  let res = response.result;

  return {
    props: {
      result: res.data, totalPages: res.totalPages
    }
  }

}


export default Home;
