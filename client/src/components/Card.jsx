import React from "react";
import style from '../styles/Card.module.css'

const Card = ({name, img, types}) => {
    return(
        <div className = {style.card}>
            <img src={img} alt="img videogame" width="200px" height="180px"/>
            <div>
                <h2 className={style.name}>{name}</h2>
                <h3 className={style.name}>Type(s): {types}</h3>
            </div>
        </div>
    )
}
export default Card