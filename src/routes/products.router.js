//  Importaciones y declaraciones principales
import { Router } from "express";
import ProductManager from "../managers/classPM.js";

const router = Router();

const context = async() => {

    const productManager = await new ProductManager;
//Query para limitar cantidad de objetos
    router.get("/", async(req, res)=>{
        
        const limit = await Object.values(req.query);
        const arrayProducts = await productManager.getProducts();
        
        //Logica de añadido si es que se ha colocado limite
        if (limit != "" && limit < arrayProducts.length) {
            const newArray = await arrayProducts.splice(0, limit);
            res.send(newArray);

        } else {
            res.send(arrayProducts);
        };
        
    });


    //Param para buscar producto por ID
    router.get("/:pid", async(req, res)=>{
        const productID = await Object.values(req.params);
        const result = await productManager.getProductById(productID[0]*1);
        await res.send(result);
    });

    //  Publicar producto, ahora emitiendo señal para actualizar en realTIME
    router.post("/", async(req, res)=>{
        const product = await req.body; 
        await productManager.addProduct(product);
        const products = await productManager.getProducts();
        await req.io.emit("products", products);
        res.send({status:"success", message:"Product added"});
    });

    router.put("/:pid", async(req, res)=>{
        const productID = await Object.values(req.params);
        const updateProduct = await req.body;
        await productManager.updateProduct(productID[0]*1, updateProduct);
        res.send({status:"success", message:"Product updated"});
    });

    router.delete("/:pid", async(req, res)=>{
        const productID = await Object.values(req.params);
        await productManager.deleteProduct(productID[0]*1);
        const products = await productManager.getProducts();
        await req.io.emit("products", products);
        res.send({status:"success", message:"Product deleted"});
    });
}


//  Ejecutar y exportar
context();
export default router;