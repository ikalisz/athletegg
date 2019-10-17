const axios = require('axios')
const CircularJSON = require('circular-json');

let cache = {}

module.exports = {
    getPlayer: async(req, res) => {
        //Just a function I used to test endpoints.
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
        // This allows the gamerTag to be lowercase or uppercase.
        let searchGamer = gamerTag.replace(gamerTag.charAt(0), gamerTag.charAt(0).toUpperCase())
        if (cache[`${searchGamer}`]) {
            //Since we found the cached player, we can send it straight to the front end.
            let cached = {
                ...cache[`${searchGamer}`],
                cached: true
            }
            res.status(200).send(cached)
        } else {
            //The data I was getting back was circular structure data? I have never worked with a circular structure object before and the object was huge so
            //I could not figure out how to cache the data as It was a different structure when I got a response on the back end compared to the front end. I ended up using a package I found to convert it to regular json.
            axios.get(`https://api-v1.athletes.gg/users?gamerTag=${searchGamer}`).then((response)=>{
                let json = CircularJSON.stringify(response);
                res.send(json);
                }).catch((error)=>{
                console.log(error);
                });
        }
    },
    getPlacings: async (req, res) => {
        //Getting the placings of a player using their ID
        axios.get(`https://api-v1.athletes.gg/placings?$limit=5&$sort[end]=-1&athlete=${req.query.id}`).then((response)=>{
                let json = CircularJSON.stringify(response)
                res.send(json);
                }).catch((error)=>{
                console.log(error);
                });
    },
    cachePlayer: async (req, res) => {
        //Note * I could not figure out how to cache the data as the object was too big to pass back from the front end.
        console.log(req.body)
        // const {gamerTag} = req.body.gamerTag
        // cache[`${gamerTag}`] = {
            
        // } 
        res.sendStatus(200)
    }
}

// https://api-v1.athletes.gg/users?gamerTag=nairo