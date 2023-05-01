const socket = io();

//  Inicio Socket que recibe mensaje tipo "Products"
socket.on("products", data=>{
    
    //  Defino variables de contenido
    const finalContent = document.getElementById("productsContent");
    let content = "";
    
    //  Conformo la data en mi nueva variable content
    data.forEach(product=>{
        content += `<li><p>${product.title} : ${product.price}$</p></li>`
    })
    
    //  Actualizo al contenido final
    finalContent.innerHTML = content; 

    }); 