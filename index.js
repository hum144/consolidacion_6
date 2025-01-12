
import express from 'express'

import anime from './db/anime.json' with {type: 'json'}

import fs from 'fs/promises'
const app = express();

//Middleware general

app.use(express.json())
app.use(express.urlencoded({extended: true}))


//ENDPOINT PRINCIPAL
app.get("/api/anime", async(req, res)=>{
    res.send({code:200, message: "Listado de anime.", data: anime})
})

//GET ID o NOMBREa

app.get("/api/anime/:parametro", (req,res) =>{
    try {
        const parametro=req.params.parametro.toLocaleLowerCase();
        const animeItem=anime[parametro] || Object.value(anime).find(animObj => animObj.nombre.toLocaleLowerCase()===parametro);
        
        if(animeItem){
            res.send({code:200, message: "Detalle anime", data: animeItem})
        }else{
            res.status(400).send({code:400, message: "Anime no encontrado", })
        }

    } catch (error) {
        res.status(500).send({code:500, message:"Error al buscar ", error})
    }
})

//PUT

app.put("/api/anime/:id", async (req,res) =>{
    try {
        const data = await fs.readFile("./db/anime.json", "utf8")
        const animeData= JSON.parse(data)
        const idActualizar = req.params.id;
        const actualizar = req.body;

        if(animeData[idActualizar]){
            Object.keys(actualizar).forEach(key =>{
                animeData[idActualizar][key]=actualizar[key]
            })
            await fs.writeFile('./db/anime.json', JSON.stringify(animeData))
            res.send({code:200, message: "Anime actualizado"})
        }else{
            res.status(400).send({code:400, message:"anime no encontrado."})
        }

    } catch (error) {
        res.status(500).send({code:500, message:"Error al actualizar ", error})
    }
})

app.post('/api/anime', async(req, res)=>{
    try {
        const nuevoAnime = req.body;
        const data = await fs.readFile('./db/anime.json', 'utf8');
        const animeData = JSON.parse(data)
        const numeroMayor = Math.max(...Object.keys(animeData).map(Number));
        const proximoNumero = numeroMayor +1;

        animeData[proximoNumero]=nuevoAnime;

        await fs.writeFile('./db/anime.json', JSON.stringify(animeData, null, 2), 'utf8')
        res.send({code:200, message: "Anime creado"})


    } catch (error) {
        res.status(500).send({code:500, message:"Error al crear anime ", error})
    }
})

app.delete('/api/anime/:id', async(req, res)=>{
    try {
        const data = await fs.readFile('./db/anime.json', 'utf8');
        const animeData = JSON.parse(data)

        let id=req.params.id;
        if(animeData[id]){
            delete animeData[id];
            await fs.writeFile('./db/anime.json', JSON.stringify(animeData, null, 2), 'utf8');
        }else{
            res.status(404).send({code:404, message:"anime no encontrado."})
        }
    } catch (error) {
        res.status(500).send({code:500, message:"Error al eliminar anime ", error})
    }
})



export default app;