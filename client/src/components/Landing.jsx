import React from "react";
import {Link} from "react-router-dom";
import styles from '../styles/Landing.module.css'

export default function Landing(){
    return(
        <div className = {styles.gif}>
            {/* <h1 className={styles.title}>Poke App</h1> */}
            <Link to = '/home'>
                <button className = {styles.Btn}>Press Start</button>
            </Link>
            <span className={styles.span}>By Esteban Cruz</span>
        </div>
    )
}