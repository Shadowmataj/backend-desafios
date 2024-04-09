import express from "express"
import fs from "fs"

const app = express()

app.use(express.urlencoded({ extended: true }))


app.get("/products", async (req, res) => {
    let limitProducts = req.query.limit
    const PRODUCTS_LIST = await JSON.parse(fs.readFileSync("./src/products_list.json"))
    const FILTERED_LIST = []

    if (!limitProducts) return res.send({ PRODUCTS_LIST })
    
    for(let i = 0; i<limitProducts; i++){
        if(PRODUCTS_LIST[i]){
            FILTERED_LIST.push(PRODUCTS_LIST[i])
        }
    }

    res.send({FILTERED_LIST})
})


app.get("/products/:pid", async (req, res) => {
    
    const PRODUCTS_LIST = await JSON.parse(fs.readFileSync("./src/products_list.json"))
    const product = PRODUCTS_LIST.find(item => item.id == req.params.pid)
    if (!product) return res.send({Error: `ID no encontrado: ${req.params.pid}`})
    res.send({product})
})

app.listen(8080, () => console.log("Servidor arriba en el puerto 8080"))