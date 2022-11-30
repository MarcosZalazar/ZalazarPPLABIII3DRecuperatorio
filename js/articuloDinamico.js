export function crearArticulo(item) {

    const articulo = document.createElement("article");
    const titulo = document.createElement("h3");
    const descripcion = document.createElement("p");
    const precio = document.createElement("p");
    const ulContenedora = document.createElement("ul");
    const raza = document.createElement("li");
    const fecha = document.createElement("li");
    const vacunas = document.createElement("li");
    const iRaza = document.createElement("i");
    const iFecha = document.createElement("i");
    const iVacunas = document.createElement("i");
    const caracteristicasPrincipales = document.createElement("p");
    const boton = document.createElement("button");
    
    iRaza.setAttribute("class", "fa-sharp fa-solid fa-shield-dog");
    iFecha.setAttribute("class", "fa-solid fa-calendar-days");
    iVacunas.setAttribute("class", "fa-solid fa-syringe");
    raza.appendChild(iRaza);
    fecha.appendChild(iFecha);    
    vacunas.appendChild(iVacunas);
    ulContenedora.appendChild(raza);
    ulContenedora.appendChild(fecha);
    ulContenedora.appendChild(vacunas);

    titulo.appendChild(document.createTextNode(item.titulo));
    descripcion.appendChild(document.createTextNode(item.descripcion));
    precio.appendChild(document.createTextNode(`$${item.precio}`));
    raza.appendChild(document.createTextNode(item.raza));
    vacunas.appendChild(document.createTextNode(item.vacunado));
    fecha.appendChild(document.createTextNode(item.fechaNacimiento));
    caracteristicasPrincipales.appendChild(document.createTextNode(`Características principales:${item.caracteristicas}`));
    boton.appendChild(document.createTextNode("Ver Mascota"));

    articulo.appendChild(titulo);
    articulo.appendChild(descripcion);
    articulo.appendChild(precio);
    articulo.appendChild(ulContenedora);
    articulo.appendChild(caracteristicasPrincipales);
    articulo.appendChild(boton);
    
    articulo.classList.add("articuloDinamicos");

    return articulo;
}
