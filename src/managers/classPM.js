//  Invocación de FileSystem
import fs from "fs";
import __dirname from "../utils.js";

// Creacion de la Clase ProductManager
export default class ProductManager {

    // Definimos el Path que van a tener los Archivos
    constructor() {

        this.path = `${__dirname}/files/products.JSON`
        
    };
    
     
    //  Metodo para Agregar Productos
    addProduct = async({title, description, price, thumbnail, code, stock}) => {

        try  {

            //  Invocar Array de productos

            const productParsed = await this.getProducts();


            const product = {
                title,
                description,
                price:price*1,
                thumbnail,
                code,
                stock:stock*1,
                status: true,
            };


            // Validar que Code No Sea Igual
            const noRepeatCode = productParsed.find(thatProduct => thatProduct.code === product.code)

            if (noRepeatCode) {
                return console.log(`The code "${noRepeatCode.code}" already exists.`);
            };


            // Generar id Autoincrementable
            if (productParsed.length === 0) {
                product.id = 1;
            } else {
                product.id = productParsed[productParsed.length-1].id+1;
            };

            // Se reescribe el archivo según el producto agregado y se retorna
            productParsed.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(productParsed, null, "\t"));
            return product;

        } catch (err) {console.log(err)};

        };


    //  Metodo que devuelve el arreglo con todos los productos creados
    getProducts = async() => {

        try {

            //  Sí no existe ningun archivo en this.path, se lo crea

            if(!fs.existsSync(this.path)) {

            await fs.promises.writeFile(this.path, JSON.stringify([], null, "\t"));

            };

            //  Existente o creado, se lee el archivo JSON y se Parsea para usar luego
            const productString = await fs.promises.readFile(this.path, "utf-8");
            const productParsed = JSON.parse(productString);
            return productParsed;

        } catch (err) {console.log(err)};

    };

    //  Metodo que busca el arreglo del producto que coincida con el id
    getProductById = async(id) => {

        try {
            // Llamo al array mediante el metódo getProducts
            const productParsed = await this.getProducts();
            const testId = await productParsed.find(thatProduct => thatProduct.id === id);

            if (testId) {
                return testId;
            }

            else {
                return 404;
            }

        } catch (err) {console.log(err);};
    
    };


    //  Metodo para Actualizar Productos
    updateProduct = async(id, object) => {

        try {
        
          //    Obtengo el array de productos y el producto a modificar
          let productParsed = await this.getProducts();  
          let productByID = await this.getProductById(id);
        
          //    Hago las modificaciones en el producto elegido, y lo guardo en la variable de producto a modificar
          if (productByID) {
            productByID = {
              ...productByID,
              ...object,
            };
            
            /*  Utilizo el Map para actualizar en el array de productos, 
            el producto elegido, con mi nuevo prototipo de producto ya actualizado */

            productParsed = productParsed.map((p) => {
              if (p.id === productByID.id) {
                p = productByID;
              }
              return p;
            });
    
            // Se sobreescribe en el archivo y WALA!
            await fs.promises.writeFile(this.path, JSON.stringify(productParsed, null, "\t"));
    
            return productByID;
          };

        } catch (err) {
          console.error(err);
        };
      };


    //  Metodo para Eliminar Productos
    deleteProduct = async(id) => {

        try {

            //  Invocar Array de productos
            let productParsed = await this.getProducts();

            //  Filter Eliminador de productos
            productParsed = productParsed.filter((p) => p.id != id);

            await fs.promises.writeFile(this.path, JSON.stringify(productParsed, null, "\t"));

            } catch (err) {
                console.error(err);
          };
        };
 
    };




//Testeo Contexto Asíncrono
const context = async() => {

    try {

        //  Llamamos a la clase mediante un await
    const productManager = await new ProductManager;

    //  Creación de productos ejemplo
    const producto1 = {
        title: "Carton",
        description: "Bueno",
        price: 100,
        thumbnail: ".jpg",
        code: "ab10954",
        stock: 100
    };
    
    const producto2 = {
        title: "Cartulina",
        description: "SemiBueno",
        price: 80,
        thumbnail: ".png",
        code: "ab10934",
        stock: 100
    };

    const productoUpdate = {
        title: "boligoma"
    };
    
    // Testeo de Metódos
  
    await productManager.addProduct(producto1);
    await productManager.addProduct(producto2);
     
    const returnProduct = await productManager.getProductById(2);
    console.log(returnProduct);

    await productManager.deleteProduct(2);

    await productManager.updateProduct(1, productoUpdate);
   
    
    const test = await productManager.getProducts(); 
    console.log(test); 
    
    } catch{console.error("Houston, tenemos un problema.");};

   
}

