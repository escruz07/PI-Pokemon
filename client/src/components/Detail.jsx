import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import Loading from "./Loading";

import style from '../styles/Detail.module.css'
import imagen from '../imagenes/random.png'

const Detail = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    },[dispatch])

    const poke = useSelector((state) => state.detail)
    const loading = useSelector((state) => state.loading)
    let tipos
    if(poke.tipos){
        tipos = poke.tipos.map(e => e.name + ' ')
    }
    let [mouse, setMouse] = useState(false)
    const handleMouseEnter = () => {
        setMouse(true)
    }
    const handleMouseLeave = () => {
        setMouse(false)
    }

    return(
        <div >
            {
            (loading) ? <Loading/> :
            <div className={style.container} key={poke.id}>
                {
                    <div>
                        <img alt="detalle pokemon" src={poke.img ? (mouse ? poke.imgb : poke.img) : imagen} className = {style.img} onMouseEnter = {handleMouseEnter} onMouseLeave = {handleMouseLeave} />
                        <h1 className = {style.title}>{poke.name} N°{poke.id}</h1>
                        <h2>Types: {poke.types ? poke.types : tipos}</h2>
                        <div>
                            <div className = {style.points}>
                                <h2>Hp: {poke.hp} - </h2>
                            </div>
                            <div className = {style.points}>
                                <h2>Attack: {poke.attack}</h2>
                            </div>
                        </div>
                        <div>
                            <div className = {style.points}>
                                <h2>Defense: {poke.defense} - </h2>
                            </div>
                            <div className = {style.points}>
                                <h2>Speed: {poke.speed}</h2>
                            </div>
                        </div>
                        <div>
                            <div className = {style.points}>
                                <h2>Weight: {poke.weight} - </h2>
                            </div>
                            <div className = {style.points}>
                                <h2>Height: {poke.height}</h2>
                            </div>
                        </div>
                        <div>
                            <div className = {style.points}>
                                <h2>Special Attack: {poke.specialAttack ? poke.specialAttack : '?'} - </h2>
                            </div>
                            <div className = {style.points}>
                                <h2>Special Defense: {poke.specialDefense ? poke.specialDefense : '?'}</h2>
                            </div>
                        </div>
                        <Link to = '/home'>
                            <button className={style.Btn}>Home</button>
                        </Link>
                    </div> 
                }
            </div>
            }
        </div>
    )
}

export default Detail