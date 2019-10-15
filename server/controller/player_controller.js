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
        
        if (cache.find()) {

        }

        axios.get(`https://api-v1.athletes.gg/users?gamerTag=${searchGamer}`).then((response)=>{
            let json = CircularJSON.stringify(response);
            res.send(json);
            }).catch((error)=>{
            console.log(error);
            });
    }
}

// https://api-v1.athletes.gg/users?gamerTag=nairo