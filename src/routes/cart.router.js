//  Importaciones y declaraciones principales
import { Router } from "express";
import CartManager from "../classCart.js";

const router = Router();

const context = async() => {

    //  Creo una nueva clase de CartManager
    const cartManager = await new CartManager;
    
    
    //  Creación de la instancia Carrito
    router.post("/", async(req, res)=>{

        //  Agrego el Carrito y envío el mensaje de success!
        await cartManager.addCart();
        res.send({status:"success", message:"Cart Created"});

    });


    //  Obtengo el carrito segun ID
    router.get("/:cid", async(req, res)=>{

        //  Tomo el ID dado por el cliente y ejecuto el algoritmo
        const cartID = await Object.values(req.params);
        const result = await cartManager.getCartById(cartID[0]*1);


        //  Envío del carrito, o mensaje de error.
        if (result != 404) {
            await res.send(result.products);
        } else {
            res.status(result).send({ status: "error", error: "not found" });
        };

        
    });




    //Agrego el producto solicitado al Carrito Solicitado
    router.post("/:cid/product/:pid", async(req, res)=>{
        
        //  Tomo los ID dados por el cliente, y ejecuto el algoritmo
        const productID = await Object.values(req.params.pid);
        const cartID = await Object.values(req.params.cid);
        const result = await cartManager.addCartProduct(cartID[0]*1, productID[0]*1)

        //  Envío del carrito, o mensaje de error.
        if (result == "cartnotfound") {
            res.status(404).send({status:"error", message:"Cart Not Found"});
        }
        
        else if (result == "productnotfound") {
            res.status(404).send({status:"error", message:"Product Not Found"});
        }

        else {
            res.send({status:"success", message:"Product has been Added"});
        };
        

    });







};


//  Ejecutar y exportar
context();
export default router;