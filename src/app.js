//  Importaciones
import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";



//Testeo Contexto Asíncrono
const context = async() => {

    try {

    //  Llamamos a la clase mediante un await y creamos el servidor
    const app = await express();


    //  Servidor Abierto conectado con WebSocket
    const server = await app.listen(8082, ()=>console.log("PORT 8082 (ON)"));

    app.use(express.static(`${__dirname}/public`));

    const io = new Server(server);


    //  Encendemos Motores y definimos vistas para la plantilla
    app.engine("handlebars", handlebars.engine());
    app.set("views", `${__dirname}/views`);
    app.set("view engine", "handlebars");

  
    //  Lectura Correcta
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    
    //  Hago que las demás rutas puedan usar websocket conectandolo con este middleware
    app.use((req,res,next)=>{
        req.io = io;
        next();
    });

    //  Redirección a las rutas indicadas
    app.use("/api/products", productsRouter);
    app.use("/api/carts", cartsRouter);
    app.use("/", viewsRouter);


    //  Receptor de Peticiones 
    io.on("connection", socket=>{
        console.log("Nuevo cliente conectado");
    });

    
    
    
    
    } catch{console.error("Houston, tenemos un problema.");};

   
}


// Ejecutar Testeo con Contexto Asíncrono

context();