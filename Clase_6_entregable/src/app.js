import express from "express"
import fs from "fs"
import { ProductManager } from "./ProductManagers.js"

const app = express()
const pm = new ProductManager()

app.use(express.urlencoded({ extended: true }))

// Endpoint con parámetro y query para obtener array completo o limitar la cantidad de productos
app.get("/products", async (req, res) => {
    let limitproducts = req.query.limit || 0
    const productsList = await pm.getProducts(limitproducts)
    res.send({ payload: productsList })
})

// endpoint con parámetro para obtener produto por id
app.get("/products/:pid", async (req, res) => {

    const product = await pm.getProductbyId(req.params.pid)
    res.send({ payload: product })
})

app.listen(8080, () => console.log("Servidor arriba en el puerto 8080"))