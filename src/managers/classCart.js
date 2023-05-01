//  Invocación de FileSystem
import fs from "fs";
import ProductManager from "./classPM.js";
import __dirname from "../utils.js";


// Creacion de la Clase CartManager
export default class CartManager {

    // Definimos el Path que van a tener los Archivos
    constructor() {
        this.path = `${__dirname}/files/carts.JSON`
        
    };    

    

    //  Crea el carrito con sus características
    addCart = async () => {
        try {

            
            //  Llamar array de carritos y crear carrito
            const cartsParsed = await this.getCarts();

            const cart = {
                products: []
            };

            // Generar id Autoincrementable
            if (cartsParsed.length === 0) {
                cart.id = 1;
            } else {
                cart.id = cartsParsed[cartsParsed.length-1].id+1;
            };

            // Se reescribe el archivo según el carrito agregado y se retorna
            cartsParsed.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(cartsParsed, null, "\t"));
            return cart;


        } catch (err) {console.log(err)};
    }

        
    //  Metodo que devuelve el arreglo con el espacio creado y los carritos en el.
    getCarts = async() => {

        try {

            //  Sí no existe ningun archivo en this.path, se lo crea

            if(!fs.existsSync(this.path)) {

            await fs.promises.writeFile(this.path, JSON.stringify([], null, "\t"));

            };

            //  Existente o creado, se lee el archivo JSON y se Parsea para usar luego
            const cartString = await fs.promises.readFile(this.path, "utf-8");
            const cartParsed = JSON.parse(cartString);
            return cartParsed;

        } catch (err) {console.log(err)};

    };


    getCartById = async(id) => {

        try {

        // Llamo al array mediante el metódo getCarts
        const cartParsed = await this.getCarts();
        const testId = await cartParsed.find(thatCart => thatCart.id === id);

        //  Encuentra el carrito y lo muestra o da la comprobación erronea
        if (testId) {
            return testId;
        }

        else {
            return 404;
        }


        } catch (err) {console.log(err)};

    }


    //  Funcion que agrega producto al carrito
    addCartProduct = async(cartID, productID) => {

        try {

            //  Llamar array de carritos y carrito por ID
            let cartsParsed = await this.getCarts();
            let cartById = await this.getCartById(cartID);

            // Llamar por ID producto para comprobar que exista
            const productManager = await new ProductManager;
            const testProduct = await productManager.getProductById(productID*1);
            
            //  Comprobaciones Previas
            if (cartById == 404) {
                return "cartnotfound"
            };

            if (testProduct == 404) {
                return "productnotfound"
            };

            //  Tomamos el Array para usarlo 
            let productArray = cartById.products;

            //  Validadcion de repeticion de producto
            const testID = await productArray.find(thatProduct => thatProduct.product == productID);

            //  Comprobamos que haya algun producto o que no se repita este mismo
            if (productArray.length == 0 || !testID) {

                const cartProduct = {
                    product: productID,
                    quantity: 1
                };

               await productArray.push(cartProduct);
            }


            //  Se repite el producto y se suma la cantidad gracias a INDEX
            else {
        
                
                const index = productArray.findIndex(
                    (cp) => cp.product == testID.product);
                
                productArray[index].quantity += 1
    
            }
            
            
            //  Agregamos el nuevo Carrito al array de Carritos 
            cartsParsed = cartsParsed.map((c) => {
                if (c.id === cartById.id) {
                  c.products = productArray;
                }
                return c;
              });
      
            // Se sobreescribe en el archivo y WALA!
            await fs.promises.writeFile(this.path, JSON.stringify(cartsParsed, null, "\t"));
           
        } catch (err) {console.log(err)};

    };

};
