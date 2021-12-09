const { Router } = require("express");
const axios = require('axios');
const { Tipo } = require("../db.js");
const { all } = require("./pokemons.js");

const router = Router();

router.get("/", (req, res) => {
    axios.get("https://pokeapi.co/api/v2/type")
        .then(resp => resp.data)
        .then(resp =>{
            try{
                let types = resp.results.map(p => p.name)
                let arr = []
                for(let i = 0; i < types.length; i++){
                    arr.push({name: types[i]})
                }
                Tipo.bulkCreate(arr);
                res.send(arr)
            } catch(e){
                res.status(404).send(e)
            }
        })
    })

module.exports = router;