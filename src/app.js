//  Importaciones
import express from "express";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/cart.router.js"


//Testeo Contexto Asíncrono
const context = async() => {

    try {

    //  Llamamos a la clase mediante un await y creamos el servidor
    const app = await express();

    //  Lectura Correcta
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    //  Redirección a las rutas indicadas
    app.use("/api/products", productsRouter);
    app.use("/api/carts", cartsRouter);


    //  Servidor Abierto
    await app.listen(8082, ()=>console.log("PORT 8082 (ON)"));
    
    
    
    
    } catch{console.error("Houston, tenemos un problema.");};

   
}


// Ejecutar Testeo con Contexto Asíncrono

context();