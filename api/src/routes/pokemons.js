const {Router} = require('express');
const axios = require('axios').default;
const {Pokemon, Tipo} = require('../db.js');

const router = Router()

router.get("/", (req, res) => {
    let {name} = req.query;
        axios.get('https://pokeapi.co/api/v2/pokemon')
        .then(respI => {
            let pokemonsI = respI.data.results;
            axios.get(respI.data.next)
            .then(respII => {
                let pokemonsII = respII.data.results;
                let allPokemons = pokemonsI.concat(pokemonsII) 
                let pokeUrl = allPokemons.map(r => r.url)
                let pokePromises = pokeUrl.map(url => axios.get(url));
                Promise.all(pokePromises)
                .then(resp => {
                    let allPokeData = resp.map(p => p.data);
                    let pokeFinal = [];
                    allPokeData.map(r =>{
                        pokeFinal.push({
                            id: r.id,
                            name: r.name.toUpperCase(),
                            types: r.types.map(p => p.type.name + ' '),
                            img: r.sprites.front_default,
                            imgb: r.sprites.back_default,
                            attack: r.stats[1].base_stat,
                        })
                    })
                    Pokemon.findAll({
                        include: {
                            model: Tipo,
                            attributes: ['name']
                        }
                    })
                    .then(respDb => {
                        let allPokemonsFinal = (pokeFinal.concat(respDb))
                        if(name){ 
                            let pokeName = allPokemonsFinal.filter(e => e.name.toLowerCase() === name)
                            if(pokeName.length === 1) return res.json(pokeName[0])
                            else {
                                axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                                .then(r => r.data)
                                .then(r => {
                                    let pokemon = {
                                        id: r.id,
                                        name: r.name.toUpperCase(),
                                        types: r.types.map(p => p.type.name + ' '),
                                        img: r.sprites.front_default,
                                        imgb: r.sprites.back_default
                                    }
                                    return res.json(pokemon)
                                })
                            }
                        } else return res.json(allPokemonsFinal)
                    })
                })
            })
        })
})

router.post('/', (req, res) => {
    let {
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        img,
        types
    } = req.body;

        Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            img
        })
        .then(pokemon => {
            pokemon.addTipo(types).then(() => {
                res.send('Pokemon Creado')
            })
        })
})

router.get('/:idPokemon', (req, res) => {
    let {idPokemon} = req.params;
    Pokemon.findOne({
        where: {id: idPokemon},
        include: Tipo
    })
    .then(respDb => {
        if(respDb){
            return res.json(respDb)
        }
    })
    axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
        .then(r => r.data)
        .then(r => {
            let pokemon = {
                id: r.id,
                name: r.name.toUpperCase(),
                types: r.types.map(p => p.type.name + ' '),
                img: r.sprites.front_default,
                imgb: r.sprites.back_default,
                hp: r.stats[0].base_stat,
                attack: r.stats[1].base_stat,
                defense: r.stats[2].base_stat,
                specialAttack: r.stats[3].base_stat,
                specialDefense: r.stats[4].base_stat,
                speed: r.stats[5].base_stat,
                weight: r.weight,
                height: r.height
            }
            return res.json(pokemon)
        })
    })

module.exports = router;