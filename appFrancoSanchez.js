//  Importaciones
import express from "express";
import ProductManager  from "./archivosFrancoSanchez.js";

//Testeo Contexto Asíncrono
const context = async() => {

    try {

    //  Llamamos a la clase mediante un await y creamos el servidor
    const productManager = await new ProductManager;
    const app = await express();

    //  Servidor Abierto
    await app.listen(8082, ()=>console.log("PORT 8082 (ON)"));

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

    const producto3 = {
        title: "Boligoma",
        description: "SemiBueno",
        price: 80,
        thumbnail: ".png",
        code: "ab10964",
        stock: 100
    };

    //Añado productos de Ejemplo
    await productManager.addProduct(producto1);
    await productManager.addProduct(producto2);
    await productManager.addProduct(producto3);

    
    //Query para limitar cantidad de objetos
    app.get("/products", async(req, res)=>{
       
        const limit = await Object.values(req.query);
        const arrayProducts = await productManager.getProducts();
        
        //Logica de añadido si es que se ha colocado limite
        if (limit != "" && limit < arrayProducts.length) {
           const newArray = await arrayProducts.splice(0, limit);
           console.log("thisway");
           res.send(newArray);

        } else {
            res.send(arrayProducts);
        };
        
    });


    //Param para buscar producto por ID
    app.get("/products/:pid", async(req, res)=>{
        const productID = await Object.values(req.params);
        const result = await productManager.getProductById(productID[0]*1);
        await res.send(result);
    });
   
  
    
    } catch{console.error("Houston, tenemos un problema.");};

   
}


// Ejecutar Testeo con Contexto Asíncrono

context();