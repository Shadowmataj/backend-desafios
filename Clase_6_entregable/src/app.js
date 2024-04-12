import express from "express"
import fs from "fs"
import { ProductManager } from "./ProductManagers.js"

const app = express()
const pm = new ProductManager()

app.use(express.urlencoded({ extended: true }))

// Endpoint con parámetro y query para obtener array completo o limitar la cantidad de productos
app.get("/products", async (req, res) => {
    let limitproducts = req.query.limit
    const productsList = await pm.getProducts()
    const filteredList = []

    if (!limitproducts) return res.send({ payload: productsList })

    for (let i = 0; i < limitproducts; i++) {
        if (productsList[i]) {
            filteredList.push(productsList[i])
        }
    }
    res.send({ payload: filteredList })
})

// endpoint con parámetro para obtener produto por id
app.get("/products/:pid", async (req, res) => {

    const productList = await pm.getProducts()
    const product = productList.find(item => item.id == req.params.pid)
    if (!product) return res.send({ Error: `ID no encontrado: ${req.params.pid}` })
    res.send({ payload: product })
})

app.listen(8080, () => console.log("Servidor arriba en el puerto 8080"))