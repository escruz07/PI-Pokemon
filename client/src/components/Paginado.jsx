import React from "react";
import style from '../styles/Paginado.module.css'

const Paginado = ({pokemonsPerPage, allPokemons, paginado}) => {
    let pageNumbers = [];
    for(let i = 0; i < Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i+1)
    }
    return(
        <nav className={style.container}>
            <ul className={style.ul}>
                { pageNumbers && pageNumbers.map((number, id) =>(
                    // <li key = {i} className={style.li}>
                    //     <a onClick={() => paginado(number)}>{number}</a>
                    // </li>
                    <button key={id} className={style.btn} onClick={() => paginado(number)}>{number}</button>
                ))}
            </ul>
        </nav>
    )
}

export default Paginado