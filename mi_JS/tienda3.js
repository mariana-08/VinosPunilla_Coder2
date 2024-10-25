class Tienda {

    constructor(usuario, clave, vinos) {
        this.usuario = usuario;
        this.clave = clave;
        this.vinos = vinos;
        this.carrito = [];
    }

    iniciarTienda() {
        alert("Bienvenidos a Vinos Punilla. \n Ingresa tu usuario y contraseña para continuar");

        const usuarioIngresado = prompt("Ingresa tu usuario");
        const claveIngresada = prompt("Ingresa tu contraseña");

        if (this.validarUsuario(usuarioIngresado, claveIngresada)) {
            alert("Bienvenido " + usuarioIngresado + " a la tienda de Vinos Punilla. \n A continuación podrás ver un menú con las opciones disponibles.");

            this.mostrarMenuVinos();

        } else {
            alert("Usuario y/o contraseña incorrectos. Recarga la página.");
        }
    }

    validarUsuario(usuarioIngresado, claveIngresada) {
        if (usuarioIngresado !== "" && claveIngresada !== "") {
            return usuarioIngresado === this.usuario && claveIngresada === this.clave;
        } else {
            alert("El usuario y/o contraseña no deben estar vacíos. Recarga la página.");
            return false;
        }
    }

    mostrarMenuVinos() {
        let opcion = "";
        while (opcion !== "4") {
            opcion = prompt("Selecciona una opción: \n1)-  Filtrar vinos por precio. \n2)- Comprar vinos. \n3)- Mostrar carrito. \n4)- Salir");
            
            switch (opcion) {
                case "1":
                    this.selecionarOrden();
                    break;
                case "2":   
                    this.iniciarCarrito();
                    break;
                case "3":
                    this.mostrarCarrito();
                    break;
                case "4":
                    alert("Gracias por visitar Vinos Punilla.");
                    break;
                default:
                    alert("Opción no válida. Inténtalo de nuevo.");  
            } 
        }   
    }  

    //metodo para seleccionar el orden de los vinos
    selecionarOrden() {
        const orden = prompt("Selecciona el orden: \n A) de menor a mayor. \n B) de mayor a menor.").toLowerCase();
        if (orden === "a") {
            this.filtrarPrecios(true);

        } else if (orden === "b") {
            this.filtrarPrecios(false);

        } else {
            alert("Opción no válida. Inténtalo de nuevo.");

        } 
    }
    //fin metodo selecionarOrden

    /// inicia el proceso de compra de vinos
    iniciarCarrito() {
        let sumaCarrito = 0;
        let lista_vinos = "";

        while (true) {
            let cod_vino = prompt("Ingresa el código del vino que deseas comprar (o presiona Cancelar para finalizar):");

            if (cod_vino === null) {
                break;
            }

            cod_vino = parseInt(cod_vino);

            if (isNaN(cod_vino)) {
                alert("Debe ingresar un número válido.");
                continue;
            }

            const prod_vino = this.obtenerVino(cod_vino);

            if (prod_vino) {
                this.agregarAlCarrito(prod_vino);
                alert("Compraste el vino " + prod_vino.nombre + " por $" + prod_vino.precio);

                lista_vinos += prod_vino.nombre + "\n";
                sumaCarrito += prod_vino.precio;
            } else {
                alert("Código de vino inválido.");
            }
        }

        if (sumaCarrito > 0) {
            alert("Compraste:\n" + lista_vinos + "\nPrecio total: $" + sumaCarrito);
        } else {
            alert("No compraste ningún vino.");
        }
    }
    // finaliza el proceso de compra de vinos 

    //metodo para obtener un vino por su codigo
    obtenerVino(cod_vino) {
        return this.vinos.find(vino => vino.id === cod_vino) || null;
    }

    //metodo para agregar un vino al carrito
    agregarAlCarrito(vino) {
        this.carrito.push(vino);
    }
    //termina metodo agregarAlCarrito
    
    //metodo para ordenar los vinos por precio
    filtrarPrecios(ascendente) {
        const preciosOrdenados = this.vinos.sort((a, b) => {
            if (ascendente) {
                return a.precio - b.precio;
            } else {
                return b.precio - a.precio;
            }        
        });
        let listaPrecios = "";
        preciosOrdenados.forEach(vino => {
            listaPrecios += vino.nombre + " - $" + vino.precio + "\n";
        });
        alert("Vinos ordenados por precio:\n" + listaPrecios);
    }
    //termina metodo filtrarPrecios

    //metodo para mostrar el carrito de compras
    mostrarCarrito() {
        if (this.carrito.length === 0) {
            alert("No tienes vinos en el carrito.");
            return;
        } else {
            let lista_vinos = "Tu carrito de compras:\n";
            let sumaCarrito = 0;
            this.carrito.forEach(vino => {
                lista_vinos += vino.nombre + "\n";
                sumaCarrito += vino.precio;
            });
            alert("Compraste:\n" + lista_vinos + "\nPrecio total: $" + sumaCarrito);
        }        
    }//termina metodo mostrarCarrito

    
}//termina la clase Tienda

// Crea una instancia de la tienda y empieza el proceso
const tienda = new Tienda(user, pass, vinos);
tienda.iniciarTienda();


/*comentarios personales*/
/*
Valido usuario: Verifico el usuario y la contraseña sean correctos antes de permitir el acceso a la tienda.
Tengo: 
Menú: tiene opciones para filtrar vinos por precio, comprar vinos, mostrar el carrito y salir.
en filtrar por precio, ordena los vinos de menor a mayor o de mayor a menor.
Hago el proceso de compra: Permite al usuario agregar vinos al carrito y muestra el total de la compra.
En mostrar carrito: Muestra los vinos en el carrito y el precio total.
en salir finalizo 
tengo que ver como interarctuar con el usuario cuando tenga dom 
*/