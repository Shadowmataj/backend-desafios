import fs from "fs"

if(!fs.existsSync("./src/products_list.json")){
    fs.writeFileSync("./src/products_list.json", JSON.stringify([]))
}

class ProductManager {
    constructor() {
        this.path = "./src/products_list.json"
        this.products = JSON.parse(fs.readFileSync(this.path))
        this.id = Math.max(...this.products.map(item => item.id))
    }

    async addProduct(title, description, price, thumbnail, code, stock) {

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
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
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

    async deleteProduct(id){

        const condicion = this.products.some((item => item.id == id))
        if (condicion){
            this.products = this.products.filter(resp => resp.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
        } else {
            console.log(`ERROR: ID Not found: "${id}"`)
        }
    
    }

    async updateProduct(id, property = "", change = ""){
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

            await fs.promises.writeFile(this.path, JSON.stringify(this.products))

        } else {
            console.log(`ERROR: ID Not found: "${id}"`)
        }
    }
    
}


const productManager1 = new ProductManager() // Se genera el product manager 

console.log(productManager1.getProducts()) 

