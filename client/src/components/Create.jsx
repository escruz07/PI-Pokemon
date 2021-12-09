import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from '../actions'
import { useDispatch, useSelector } from "react-redux";

import style from '../styles/Create.module.css'

const validate = (input) => {
    let errors = {};
    if(!input.name){
        errors.name = 'Se requiere un Nombre'
    }
    if(!input.hp || !parseInt(input.hp) || parseInt(input.hp) < 0){
        errors.hp = 'Se requiere hp, debe ser un número y positivo'
    }
    if(!input.attack || !parseInt(input.attack)){
        errors.attack = 'Se requiere ataque y debe ser un número'
    }
    if(!input.defense || !parseInt(input.defense)){
        errors.defense = 'Se requiere    defensa y debe ser un número'
    }
    if(!input.speed || !parseInt(input.speed)){
        errors.speed = 'Se requiere velocidad y debe ser un número'
    }
    if(!input.height || !parseInt(input.height)){
        errors.height = 'Se requiere altura y debe ser un número'
    }
    if(!input.weight || !parseInt(input.weight)){
        errors.weight = 'Se requiere peso y debe ser un número'
    }
    return errors;
}

const Create = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const types = useSelector((state) => state.types)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        img: '',
        types: []
    })

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    }

    const handleSelect = (e) => {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
        console.log(input)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(input)
        if(errors.name || errors.hp || errors.attack || errors.defense || errors.speed || errors.height || errors.weight || input.types.length === 0){
            alert('Completar todos los campos')
        } else {
            dispatch(postPokemon(input))
            alert('Pokemon creado exitosamente')
            setInput({
                name: '',
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                height: '',
                weight: '',
                img: '',
                types: []
            })
            history.push('/home')
        }
    }
    function handleDelete(e) {
        setInput({ ...input, types: input.types.filter(el => el !== e)})
    }
    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    return(
        <div>
            <div className={style.conteiner}>
                    <h1 className={style.title}>Create your Pokemon</h1>
                    <form onSubmit = {(e) => handleSubmit(e)}>
                        <div>
                            <div className={style.name}>
                                <label>Nombre: </label>
                                <input type='text' value = {input.name} name = 'name' onChange = {handleChange} className={style.input}/>
                            </div>
                            {errors.name && (
                                <p className='error'>{errors.name}</p>
                            )}
                        </div>
                        <div>
                            <div  className={style.name}>
                                <label>Vida:</label>
                                <input type='text'
                                value = {input.hp}
                                name = 'hp'
                                onChange = {handleChange}
                                className={style.input}/>
                            </div>
                            {errors.hp && (
                                <p className='error'>{errors.hp}</p>
                            )}
                        </div>
                        <div>
                            <div  className={style.name}>
                                <label>Ataque:</label>
                                <input type='text'
                                value = {input.attack}
                                name = 'attack'
                                onChange = {handleChange}
                                className={style.input}/>
                            </div>
                            {errors.attack && (
                                <p className='error'>{errors.attack}</p>
                            )}
                        </div>
                        <div>
                            <div  className={style.name}>
                                <label>Defensa:</label>
                                <input type='text'
                                value = {input.defense}
                                name = 'defense'
                                onChange = {handleChange}
                                className={style.input}/>
                            </div>
                            {errors.defense && (
                                <p className='error'>{errors.defense}</p>
                            )}
                        </div>
                        <div>
                            <div className={style.name}>
                                <label>Velocidad:</label>
                                <input type='text'
                                value = {input.speed}
                                name = 'speed'
                                onChange = {handleChange}
                                className={style.input}/>
                            </div>
                            {errors.speed && (
                                <p className='error'>{errors.speed}</p>
                            )}
                        </div>
                        <div>
                            <div  className={style.name}>
                                <label>Altura:</label>
                                <input type='text'
                                value = {input.height}
                                name = 'height'
                                onChange = {handleChange}
                                className={style.input}/>
                            </div>
                            {errors.height && (
                                <p className='error'>{errors.height}</p>
                            )}
                        </div>
                        <div>
                            <div  className={style.name}>
                                <label>Peso:</label>
                                <input type='text'
                                value = {input.weight}
                                name = 'weight'
                                onChange = {handleChange}
                                className={style.input}/>
                            </div>
                            {errors.weight && (
                                <p className='error'>{errors.weight}</p>
                            )}
                        </div>
                        <div className={style.name}>
                            <label>Imagen:</label>
                            <input type='text'
                            value = {input.img}
                            name = 'img'
                            onChange = {handleChange}
                            className={style.input}/>
                        </div>
                        {/* <div className={style.name}>
                            <label>Tipo(s): </label>
                            <select onChange = {(e) => handleSelect(e)} className={style.select}>
                                {types.map((e, i) => (
                                    <option key={e.id} value = {i+1}>{e.name}</option>))}
                            </select>
                        </div> */}
                        <div className={style.name}>
                            <label>Tipo(s): </label>
                            <select onChange = {(e) => handleSelect(e)} className={style.select}>
                                {types.map((e, i) => (
                                    <option key={e.id} value = {i+1}>{e.name}</option>))}
                            </select>
                        </div>
                        {/* <ul className={style.list}>
                            <li>{input.types.length > 0 ? input.types.map(e => e + ' ') : <p>Es necesario al menos 1 tipo</p>}</li>
                        </ul> */}
                        {input.types.map(el =>
                            <div className="error" key={el.id}>
                                <button className="botonX" onClick={() => handleDelete(el)}>x</button>
                                <h3>{el}</h3> 
                            </div>
                        )}
                        <div className={style.centrar}><button type = 'submit' className={style.Btn}>Crear Pokemon</button></div>
                        
                    </form>
                    <Link to = '/home'>
                        <button className={style.Btn}>Home</button>
                    </Link>
                </div>
        </div>
    )
}
export default Create;