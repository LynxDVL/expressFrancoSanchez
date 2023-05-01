//  Importaciónes y creacion de variables para dar el contexto
import { Router } from "express";
import ProductManager from "../managers/classPM.js";

const router = Router();

const context = async() => {

    //  Nueva Clase de Product Manager
    const productManager = await new ProductManager;

    //  Get de Home que muestra todos los productos.
    router.get("/", async(req, res) => {
        const product = await productManager.getProducts();
        res.render("home", {product});
    });
    
    //  Get de RealTimeProducts 
    router.get("/realtimeproducts", async(req, res) => {
        const product = await productManager.getProducts();
        res.render("realTimeProducts", {product});
    });
    
};

context();
export default router;