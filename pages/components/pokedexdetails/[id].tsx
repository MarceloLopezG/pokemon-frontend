import React, { useState, useEffect } from 'react';
import Router from "next/router";
import axios from "axios";
import Navbar from "../navbar";
import styles from '../../../styles/pokedexdetails.module.css';
import GetSearchedPokemon from "../getsearchedpokemon";


const baseURL = 'http://localhost:3000/';
const urlLike = baseURL + 'pokemonlikes/create';
const urlUnLike = baseURL + 'pokemonlikes/delete/';
const urlMyLike = baseURL + 'mypokemonlike/';
const specificPokem = baseURL + "pokemon/";
const userId = typeof window !== "undefined" ? window.localStorage.getItem('userId') : false;


var headers = {
    'Content-Type': 'application/json',
};


const PokedexDetails = ({ result }: any) => {
    const [pokemon, setPokemon] = useState({
        id: '',
        name: '',
        weight: '',
        height: '',
        back_shiny: '',
        front_shiny: '',
        front_default: '',
        type_one: '',
        type_two: ''
    });
    
    const [inputSearch, setInputSearch] = useState({
        pokemonName: ''
    });

    const [like, setLike] = useState({
        id: '',
        liked: ''
    });



    useEffect(() => {
        setPokemon(result);
        getAlreadyHaveMyLike();
    }, []);



    const getAlreadyHaveMyLike = () => { 
        axios.get(urlMyLike + userId + '/' + pokemon.id).then(resp => {
            setLike(resp.data);
        }).catch((error) => {
            return [];
        });
    }


    // Add like
    const handleSubmitAddLike = (event: any) => { 
        event.preventDefault();
        let pokemonId = event.target.value;
        if (userId === null || userId === '' || userId === 'null') {
            // Do nothing
        } else {
            axios.post(urlLike, {
                liked: true,
                userId: parseInt(userId),
                pokemonId: parseInt(pokemonId)
            }, { headers })
                .then((response) => {
                    setLike(response.data);
                })
                .catch((error) => {
                    return false;
                });
        }
    }


    // Remove like
    const handleSubmitRemoveLike = (event: any) => { 
        event.preventDefault();
        let pokemonIdUnLike = event.target.value;

        axios.delete(urlUnLike + pokemonIdUnLike, { headers })
            .then((response) => {
                setLike(response.data);
            })
            .catch((error) => {
                return false;
            });
    }


    // Listen changes in inputs for search
    const handleChangeSearch = (event: any) => {
        event.preventDefault();
        const { name, value } = event.target;
        getPokemon(0, value);
        setInputSearch({ ...inputSearch, [name]: value });
    }

 
    const getPokemon = async (page: number, pokemonName: string) => {
        const res = await GetSearchedPokemon(page, 1, pokemonName); // Get only one object
        if ((res.data).length === 0) {
            // Do nothing
        } else {
            setPokemon(res.data[0]);
        }
    }


    return (
        <>
            <main className={styles.mainContent}>
                <div className={styles.navbarContent}>
                    <Navbar />
                    <div className={styles.divLogoHeader}>
                        <img src="https://res.cloudinary.com/diycfocmt/image/upload/v1683921415/whatthecode/logo_dclpjg.png" alt="logo" className={styles.pokemonLogo} />
                    </div>
                </div>

                <div className={styles.dataContent}>
                    <div className={styles.wrapper}>
                        <div className={styles.divBtnBack}><button className={styles.btnBack} onClick={() => Router.back()}><img src="https://res.cloudinary.com/diycfocmt/image/upload/v1683921427/whatthecode/Back_kg6wgd.svg" alt="" className={styles.imgBtnBack} /></button></div>
                        <div className={styles.divSearch}>
                            <form>
                                <div className={styles.inputContainer}>
                                    <input className={styles.inputField} type="text" placeholder="Search" name="pokemonName" id="pokemonName" value={inputSearch.pokemonName} onChange={handleChangeSearch} />
                                    <i className="fa fa-user icon" />
                                </div>
                            </form>
                        </div>
                    </div>


                    <div className={styles.pokemonContentDetails}>

                        <div className={styles.cardImage}>
                            <img src={pokemon.front_default} alt="pokemon" className={styles.imgPokemon} />
                            <br />
                            <div className={styles.flexImgPokemonSm}>
                                <img src={pokemon.front_shiny} alt="shiny" className={styles.imgPokemonSm} />
                                <img src={pokemon.back_shiny} alt="shiny" className={styles.imgPokemonSm} />
                            </div>
                        </div>


                        <div className={styles.cardDetails}>
                            <div className={styles.contentDetailsCard}>

                                <div className={styles.divDetailsName}>
                                    <h1>{pokemon.name}</h1>
                                    <div>
                                        <span className={styles.habilityOne}>{pokemon.type_one}</span>
                                        {pokemon.type_two ? <span className={styles.habilityTwo}>{pokemon.type_two}</span>
                                            : <></>}
                                    </div>

                                    <div>
                                        <p>Pokedex</p>
                                        <input type="text" name="" id="" value={pokemon.id} className={styles.inputLine} disabled={true} />
                                    </div>
                                    <div>
                                        <p>Height</p>
                                        <input type="text" name="" id="" value={pokemon.height} className={styles.inputLine} disabled={true} />
                                    </div>
                                    <div>
                                        <p>Weight</p>
                                        <input type="text" name="" id="" value={pokemon.weight} className={styles.inputLine} disabled={true} />
                                    </div>
                                    <div>
                                        <p>Shiny</p>
                                        <img src={pokemon.front_shiny} alt="" className={styles.imgPokemonSm} />
                                        <img src={pokemon.back_shiny} alt="" className={styles.imgPokemonSm} />
                                    </div>

                                    <div className={styles.divBtnLike}>
                                        {like.liked ? <button className={styles.like} value={like.id} onClick={handleSubmitRemoveLike}>Me gusta</button> : <button className={styles.unlike} value={result.id} onClick={handleSubmitAddLike}>Me gusta</button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}


export async function getServerSideProps(context: any) {
    const pokemonId = context.params.id;

    const response = await axios.get(specificPokem + pokemonId).then(resp => {
        return resp.data;
    });


    return {
        props: {
            result: response
        }
    }
}

export default PokedexDetails;