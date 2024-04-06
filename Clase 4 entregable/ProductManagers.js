const fs = require("fs")
const { stringify } = require("querystring")

if(!fs.existsSync("./products_list.json")){
    fs.writeFileSync("./products_list.json", JSON.stringify([]))
}

class ProductManager {
    constructor() {
        this.path = "./products_list.json"
        this.products = JSON.parse(fs.readFileSync(this.path))
        this.id = Math.max(this.products.map(item => item.id))
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        const codeVerification = this.products.some(item => item.code == code)

        if (!codeVerification) {
            this.products.push({
                id: ++this.id,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            })
            fs.writeFileSync(this.path, JSON.stringify(this.products))
        } else {
            console.log(`ERROR: El code "${code}" ya ha sido utilizado en otro producto`)
        }
    }
    getProducts() {
        this.products = JSON.parse(fs.readFileSync(this.path))
        return this.products
    }

    getProductbyId(code) {
        this.products = JSON.parse(fs.readFileSync(this.path))
        const item = this.products.find(resp => resp.code == code)
        if (item) {
            console.log(item)
        } else {
            console.log(`ERROR: Not found: "${code}"`)
        }
    }

    deleteProduct(id){

        const condicion = this.products.some((item => item.id == id))
        if (condicion){
            this.products = this.products.filter(resp => resp.id !== id)
            fs.writeFileSync(this.path, JSON.stringify(this.products))
        } else {
            console.log(`ERROR: ID Not found: "${id}"`)
        }
    
    }

    updateProduct(id, property = "", change = ""){
        const condicion = this.products.some((item => item.id === id))
        

        const idList = this.products.map(item => item.id)
        const index = idList.indexOf(id)

        if (condicion){

            let {title, description, price, thumbnail, code, stock} = this.products.filter(resp => resp.id === id)[0]

            if (property === "title"){
                title = change
            }

            if (property === "description"){
                description = change
            }

            if (property === "price"){
                price = change
            }

            if (property === "thumbnail"){
                thumbnail = change
            }
            
            if (property === "code"){
                code = change
            }

            if (property === "stock"){
                stock = change
            }

            const item = {
                id: id,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            }

            this.products.splice(index, 1, item)

            fs.writeFileSync(this.path, JSON.stringify(this.products))

        } else {
            console.log(`ERROR: ID Not found: "${id}"`)
        }
    }
    
}


const productManager1 = new ProductManager() // Se genera el product manager 

console.log(productManager1.getProducts()) 

productManager1.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
console.log(productManager1.getProducts())

productManager1.getProductbyId("abc123")

productManager1.updateProduct(1, "title", "Producto actualizado")
console.log(productManager1.getProducts()) 


productManager1.deleteProduct(1)
console.log(productManager1.getProducts()) 

