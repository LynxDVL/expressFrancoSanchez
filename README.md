# expressFrancoSanchez¿
Esta es mi primera entrega, está bien completo, hay que crear los productos y los carritos!

#                                   1/05/2023

Nuevos métodos para POSTMAN, los GETS SON LOS SIGUIENTES PARA UTILIZACIÓN DE WEBSOCKETS Y HANDLEBARS:
* GET: http://localhost:8082 (La ruta base, Muestra la lista de productos con la ayuda de HANDLEBARS)
* GET: http://localhost:8082/realtimeproducts (Esta ruta, es igual que la anterior pero ahora es DINÁMICA, cada vez que intenten agregar o eliminar un producto se actualizara en *TIEMPO REAL*)

Información Importante:
* Se agregaron Emits en products.router, en las secciones de Agregar y Eliminar un producto.
* Middleware en app.js que permite la función de arriba, y abrimos la escucha de peticiónes mediante Socket en app.js
* Definimos public static, para crear realTimeProducts.js, que es el ejecutor de las peticiones del SOCKET
* Archivos de tipo handlebars que son usados en los nuevos métodos!
* Utils.js que define nuestro nuevo PATH, para con el usarlo a comodidad.





#                                   24/04/2023

Los metodos para los Carritos son los siguentes en POSTMAN: (Hay que crear los productos también).
* POST: http://localhost:8082/api/carts (Crea un carrito)
* GET: http://localhost:8082/api/carts/:id de uno de los carritos creados (muestra todos los productos que hay dentro del carrito seleccionado)
* POST: http://localhost:8082/api/carts/:idCarrito/product/:idProducto (Sí el producto existe lo agrega al carrito elegido)

Los metodos para los Productos son los siguientes en POSTMAN:
* GET: http://localhost:8082/api/products (Muestra todos los productos)
* GET: http://localhost:8082/api/products/:idProducto (Muestra el producto según ID)
* POST: http://localhost:8082/api/products 
Envíar en el Body la siguiente información
 const product = {
                title,
                description,
                price:price*1,
                thumbnail,
                code,
                stock:stock*1,
                status: opcional(si no se pone nada queda en true),
            };
(Postea un producto con las caracteristícas dadas)
* PUT: http://localhost:8082/api/products/:idProducto (Actualiza el objeto, se puede modificar con cualquiera de las premisas arriba dadas en el post del producto)
* DELETE: http://localhost:8082/api/products/:idProducto (Elimina el producto por ID)

Variables nuevas de carritos:
* cartManager: Importa una nueva clase de mi gestor de carritos
* cartID: toma el object.values del req.paramas para luego obtener solo el numero del ID
* result: Suele ser la variable que ejecuta una funcion de cartManager con el ID dado
* productArray: Es el array del ID dado para el post de un producto en cierto carrito
* cartByID & testProduct: Estas variables me sirven para verificar si existe el carrito y el producto, y también para luego usarlos en la funcion.
* cartsParsed: Obtiene todos los carritos para usarlos en las funciones del gestor de carritos.


