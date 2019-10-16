const axios = require('axios')
const CircularJSON = require('circular-json');

let cache = {}

module.exports = {
    getPlayer: async(req, res) => {
        // const playerData = await axios.get('https://api-v1.athletes.gg/users?gamerTag=nairo')
        // res.status(200).send(playerData)

        axios.get('https://api-v1.athletes.gg/users?gamerTag=Nairo').then((response)=>{
            let json = CircularJSON.stringify(response);
            res.send(json);
            }).catch((error)=>{
            console.log(error);
            });



        // const response = await fetch('https://api-v1.athletes.gg/users?gamerTag=nairo');
        // const myJson = await response.json();
        // console.log(JSON.stringify(myJson));
        // res.status(200).send(JSON.stringify(myJson))
    },
    getOnePlayer: async (req, res) => {
        let {gamerTag} = req.query
        let searchGamer = gamerTag.replace(gamerTag.charAt(0), gamerTag.charAt(0).toUpperCase())
        console.log(searchGamer)
        console.log(req.query)
        if (cache[`${searchGamer}`]) {
            let cached = {
                ...cache[`${searchGamer}`],
                cached: true
            }
            res.status(200).send(cached)
        } else {
            axios.get(`https://api-v1.athletes.gg/users?gamerTag=${searchGamer}`).then((response)=>{
                let json = CircularJSON.stringify(response);
                
                res.send(json);
                }).catch((error)=>{
                console.log(error);
                });
        }
    },
    getPlacings: async (req, res) => {
        axios.get(`https://api-v1.athletes.gg/placings?$limit=5&$sort[end]=-1&athlete=${req.query.id}`).then((response)=>{
                let json = CircularJSON.stringify(response);
                
                res.send(json);
                }).catch((error)=>{
                console.log(error);
                });
    },
    cachePlayer: async (req, res) => {
        const {gamerTag} = req.body.game
        cache[`${gamerTag}`] = {
            ...placings.data
        } 
        res.status(200).send()
    }
}

// https://api-v1.athletes.gg/users?gamerTag=nairo