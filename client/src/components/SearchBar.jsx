import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getQueryName } from "../actions";
import {Link} from "react-router-dom";

import style from '../styles/SearchBar.module.css'

const SearchBar = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value)
        console.log(name)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getQueryName(name))
        console.log(name)
        setName('')
    }

    return(
        <div className = {style.container}>
            <div>
                <Link to = '/pokemons'>
                    <button className={style.Btn}>Create your Pokemon</button>
                </Link>  
            </div>
            <div className = {style.searchbar}>
                <input
                type = 'text'
                placeholder = ' Search Pokemon...'
                onChange = {(e) => handleInputChange(e)}
                value = {name}
                className = {style.input}
                />
                <button type = 'submit' onClick = {(e) => handleSubmit(e)} className = {style.btnSearch}>Search</button>
            </div>
        </div>
    )
} 

export default SearchBar;