import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { filterByOrigin, filterByType, getPokemons, getTypes, orderByName, orderByPower } from "../actions";
import Card from "./Card"
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import Random from '../imagenes/random.png';
import style from '../styles/Home.module.css'

const Home = () =>{
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)
    const loading = useSelector((state) => state.loading)
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const [orden, setOrden] = useState('')
    const lastPokemon = currentPage * pokemonsPerPage;
    const firstPokemon = lastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons && allPokemons.slice(firstPokemon, lastPokemon) 


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes());
    },[dispatch])

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getPokemons());
    }

    const handleFilterByType = (e) => {
        dispatch(filterByType(e.target.value))
    }

    const handleOrderByName = (e) => {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    const handleOrderByAttack = (e) => {
        e.preventDefault()
        dispatch(orderByPower(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    const handleOrigin = (e) => {
        dispatch(filterByOrigin(e.target.value))
    }
    return(
        <div className = {style.body}>
            <div className = {style.title}>
                <img alt="titulo pag" className = {style.imgHeader} src="https://richaudcommx.files.wordpress.com/2021/01/pokemon.png"/>
            </div>
            <div>
                <SearchBar/>
            </div>            
            <div className={style.filterBar}>
                <div className={style.select}>
                    <select onChange = {e => handleOrderByName(e)} className = {style.selectInit}>
                        <option className={style.option} >Sort by Name</option>
                        <option value='alf'>A-Z</option>
                        <option value='invalf'>Z-A</option>
                    </select>
                    <select onChange = {e => handleOrderByAttack(e)} className = {style.select}>
                        <option className={style.option} >Sort by Power</option>
                        <option value='asc'>Worse to Best</option>
                        <option value='desc'>Best to Worse</option>
                    </select>
                    <select onChange = {e => handleOrderByAttack(e)} className = {style.select}>
                        <option className={style.option} >Sort by Power</option>
                        <option value='asc'>Worse to Best</option>
                        <option value='desc'>Best to Worse</option>
                    </select>
                    <select onChange = {e => handleOrigin(e)} className = {style.select}>
                        <option className={style.option} value="all">Filter by Origin</option>
                        <option value='all'>All Pokemon</option>
                        <option value='api'>Existing</option>
                        <option value='db'>Created</option>
                    </select>
                    <select onChange = {e => handleFilterByType(e)} className = {style.select}>
                        <option className={style.option} value="all">Filter by Type</option>
                        <option value='all'>All</option>
                        <option value='normal '>Normal</option>
                        <option value='fighting '>Fighting</option>
                        <option value='flying '>Flying</option>
                        <option value='poison '>Poison</option>
                        <option value='ground '>Ground</option>
                        <option value='rock '>Rock</option>
                        <option value='bug '>Bug</option>
                        <option value='ghost '>Ghost</option>
                        <option value='steel '>Steel</option>
                        <option value='fire '>Fire</option>
                        <option value='water '>Water</option>
                        <option value='grass '>Grass</option>
                        <option value='electric '>Electric</option>
                        <option value='psychic '>Psychic</option>
                        <option value='ice '>Ice</option>
                        <option value='dragon '>Dragon</option>
                        <option value='dark '>Dark</option>
                        <option value='fairy '>Fairy</option>
                        <option value='unknown '>Unknown</option>
                        <option value='shadow '>Shadow</option>
                    </select>
                    <button onClick = {e => {handleClick(e)}} className={style.selectFin}>
                    Remove Filters
                    </button>
               </div>
               <Paginado
                        pokemonsPerPage = {pokemonsPerPage}
                        allPokemons = {allPokemons.length}
                        paginado = {paginado}/>
                { (loading) ? <Loading/> :  
                <div className={style.container}>
                    { currentPokemons && currentPokemons?.map((e) => {
                            if(e.types){
                                return(
                                    <Link style={{ textDecoration:"none"}} to = {`/home/${e.id}`}>
                                        <Card key={e.id} name={e.name} img={e.img} types={e.types}/>
                                    </Link>
                                )
                            } else if (e.tipos) {
                                return(
                                    <Link to = {`/home/${e.id}`} className={style.link}>
                                        <Card key={e.id} name={e.name} img={e.img? e.img : Random } types={e.tipos.map(e => e.name + ' ')}/>
                                    </Link>
                                )
                            } else if (!e.types && !e.tipos) {
                                return(
                                    <h1 className = {style.not} >El pokemon NO existe!</h1>
                                )
                            }
                    })}
                </div>
                }
            </div>
            <div className={style.copy}>Copyright&copy; 2021 - App Made By Esteban Cruz - All rights reserved.</div>
        </div>
    )
}
export default Home