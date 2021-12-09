import React from "react";
import gif from '../imagenes/pikachu.gif'
import style from '../styles/Loading.module.css'

const Loading = () => {
    return(
        <div className = {style.load}>
            <img alt="gif" src = {gif} className = {style.gif}/>
            <h3 className = {style.text}>Loading...</h3>
        </div>
    )
}

export default Loading