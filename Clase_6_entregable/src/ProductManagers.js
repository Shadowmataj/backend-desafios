import fs, { read } from "fs"
// search for file "./src/products_list.json", it creates it if doesn't exist
if (!fs.existsSync("./src/products_list.json")) {
    fs.writeFileSync("./src/products_list.json", JSON.stringify([]))
}
// create a class ProductManager to manage all the products we need.
export class ProductManager {
    // the constructor creates all the elements we need in our product manager 
    constructor() {
        this.path = "./src/products_list.json" //defines the path file to use
        this.products = JSON.parse(fs.readFileSync(this.path)) //read the file and asign the data to this.products
        this.id = Math.max(...this.products.map(item => item.id))//identifies the max id number in our data base and asign it to avoid duplication
    }

    // async function to add products into de data base
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
    //function to get a certain amount of products or the entire array
    getProducts(limit) {
        this.products = JSON.parse(fs.readFileSync(this.path))
        return limit === 0 ? this.products : this.products.splice(0,limit)
    }
    //funtion to get a specific product by id
    getProductbyId(pid) {
        this.products = JSON.parse(fs.readFileSync(this.path))
        const item = this.products.find(resp => resp.id == pid)
        if (!item) return {ERROR: `ID Not found: ${pid}`}
        return item 
    }
    //async function to erase a product in our database
    async deleteProduct(id) {

        const product = this.products.some((item => item.id == id))
        if (product) {
            this.products = this.products.filter(resp => resp.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
        } else {
            console.log(`ERROR: ID Not found: "${id}"`)
        }

    }

    async updateProduct(id, property = "", change = "") {
        const condicion = this.products.some((item => item.id === id))


        const idList = this.products.map(item => item.id)
        const index = idList.indexOf(id)

        if (condicion) {

            let { title, description, price, thumbnail, code, stock } = this.products.filter(resp => resp.id === id)[0]

            if (property === "title") {
                title = change
            }

            if (property === "description") {
                description = change
            }

            if (property === "price") {
                price = change
            }

            if (property === "thumbnail") {
                thumbnail = change
            }

            if (property === "code") {
                code = change
            }

            if (property === "stock") {
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


// const productManager1 = new ProductManager() // Se genera el product manager

// console.log(productManager1.getProducts()) 

