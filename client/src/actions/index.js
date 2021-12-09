import axios from 'axios';
export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_QUERY_NAME = 'GET_QUERY_NAME';
export const GET_TYPE = 'GET_TYPE';
export const GET_BY_ID = 'GET_BY_ID';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_POWER = 'ORDER_BY_POWER';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const POST_POKEMON = 'POST_POKEMON';
export const SET_LOADING = 'SET_LOADING';
export const RESET_POKEMONS = 'RESET_POKEMONS';

export const getPokemons = () => {
    return function(dispatch){
        dispatch(setLoading())
        return axios.get('http://localhost:3001/pokemons')
        .then(r => r.data)
        .then(r => {
            dispatch({
                type: GET_POKEMONS,
                payload: r
            })
        })
    }
}

export const getQueryName = (payload) => {
    return async(dispatch) =>{
        try{
            dispatch(setLoading())
            await axios.get('http://localhost:3001/pokemons?name=' + payload)
            .then(r => { dispatch({
                type: GET_QUERY_NAME,
                payload: r.data
            })
            })
        } catch(e) {
            console.log('Pokemon no encontrado')
        }
    }
}

export const getTypes = () => {
    return function(dispatch){
        return axios.get('http://localhost:3001/types')
        .then(r => r.data)
        .then(r => {
            dispatch({
                type: GET_TYPE,
                payload: r
            })
        })
    }
}

export const getDetail = (payload) => {
    return function(dispatch){
        dispatch(setLoading())
        return axios.get('http://localhost:3001/pokemons/' + payload)
        .then(r => r.data)
        .then(r => {
            dispatch({
                type: GET_BY_ID,
                payload: r
            })
        })
    }
}

export const orderByName = (payload) => {
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export const orderByPower = (payload) => {
    return{
        type: ORDER_BY_POWER,
        payload
    }
}

export const filterByType = (payload) => {
    return{
        type: FILTER_BY_TYPE,
        payload
    }
}

export const filterByOrigin = (payload) => {
    return {
        type: FILTER_BY_ORIGIN,
        payload
    }
}

export const postPokemon = (payload) => {
    return function(dispatch){
        return axios.post('http://localhost:3001/pokemons', payload)
        .then(r => {
            return r
        })
    }
}

export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}