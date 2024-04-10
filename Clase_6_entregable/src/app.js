import express from "express"
import fs from "fs"

const app = express()

app.use(express.urlencoded({ extended: true }))


app.get("/products", async (req, res) => {
    let limitproducts = req.query.limit
    const product_list = await JSON.parse(fs.readFileSync("./src/product_list.json"))
    const filtered_list = []

    if (!limitproducts) return res.send({ product_list })

    for (let i = 0; i < limitproducts; i++) {
        if (product_list[i]) {
            filtered_list.push(product_list[i])
        }
    }
    res.send({ filtered_list })
})


app.get("/products/:pid", async (req, res) => {

    const product_list = await JSON.parse(fs.readFileSync("./src/product_list.json"))
    const product = product_list.find(item => item.id == req.params.pid)
    if (!product) return res.send({ Error: `ID no encontrado: ${req.params.pid}` })
    res.send({ product })
})

app.listen(8080, () => console.log("Servidor arriba en el puerto 8080"))