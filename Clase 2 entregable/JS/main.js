class ProductManager {
    constructor(products) {
        this.id = 0
        this.products = products
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
        } else {
            console.log(`ERROR: El code ${code} ya ha sido utilizado en otro producto`)
        }
    }
    getProducts() {
        return this.products
    }

    getProductbyId(code) {
        const item = this.products.find(resp => resp.code == code)
        if (item) {
            console.log(item)
        } else {
            console.log(`ERROR: Not found: ${code}`)
        }
    }
}


const productManager1 = new ProductManager([]) // Se genera el product manager 


console.log("Se imprime el array antes de agregar productos:", productManager1.getProducts())

productManager1.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
console.log("Se imprime el array después de agregar el primer producto: ", productManager1.getProducts())

//No se puede guardar ya que el código ha sido utilizado previamente
console.log("Se intenta agregar  un producto con un código ya existente: ")
productManager1.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)

//Se agrega un producto adicional
productManager1.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc124", 25)

console.log("Se imprime el array después de haber agregado 2 productos: ", productManager1.getProducts())

//Se buscan productos por code
console.log("Se busca producto con code \"abc123\"")
productManager1.getProductbyId("abc123")
console.log("Se busca producto con code \"abc124\"")
productManager1.getProductbyId("abc124")
console.log("Se busca producto con code \"abc12\"")
productManager1.getProductbyId("abc12")
