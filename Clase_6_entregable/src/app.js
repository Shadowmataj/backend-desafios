import express from "express"
import fs from "fs"

const app = express()

app.use(express.urlencoded({ extended: true }))


app.get("/products", async (req, res) => {
    let limitproducts = req.query.limit
    const productsList = await JSON.parse(fs.readFileSync("./src/products_list.json"))
    const filteredList = []

    if (!limitproducts) return res.send({ productsList })

    for (let i = 0; i < limitproducts; i++) {
        if (productsList[i]) {
            filteredList.push(productsList[i])
        }
    }
    res.send({ filteredList })
})


app.get("/products/:pid", async (req, res) => {

    const productList = await JSON.parse(fs.readFileSync("./src/products_list.json"))
    const product = productList.find(item => item.id == req.params.pid)
    if (!product) return res.send({ Error: `ID no encontrado: ${req.params.pid}` })
    res.send({ product })
})

app.listen(8080, () => console.log("Servidor arriba en el puerto 8080"))