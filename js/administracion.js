import { crearTabla } from './tablaDinamica.js'
import { Anuncio_Mascota } from './Anuncio_Mascota.js';
import {
    validarCampoVacio,
    validarLongitud,
    validarLongitudDos,
    validarRango,
  } from "./validaciones.js";

const $spinner = document.getElementById("spinner");
const $divTabla=document.getElementById("divTabla");
const anuncios=JSON.parse(localStorage.getItem("anuncios")) || [];
actualizarTabla();

const $formulario=document.forms[0];
const {btnGuardar, btnCancelar, btnEliminar, txtId, txtTitulo, txtDescripcion, rbtAnimal, txtPrecio,txtRaza, txtFechaNacimiento, txtVacuna,chkJugueton,chkAmoroso,chkGuardian} = $formulario;
const controles = $formulario.elements;

for (let i = 0; i < controles.length; i++){
  const control = controles.item(i);

  if (control.matches("input")){
    if (control.matches("[type=button]")){
      continue;
    }
    else{
      control.addEventListener("blur", validarCampoVacio);
    }
  }
  
  if(control.matches("#txtTitulo")){
    control.addEventListener("input", validarLongitud);
  }
  else if(control.matches("#txtDescripcion"))
  {
    control.addEventListener("input", validarLongitudDos)
  }
  else if(control.matches("#txtPrecio")){
    control.addEventListener("change", validarRango);
  }
  
}

window.addEventListener("click",(e)=>{
    if(e.target.matches("td")){
        console.log(e.target.parentElement.dataset.id);
        let id=e.target.parentElement.dataset.id;

        btnGuardar.innerHTML = "Modificar";
        btnEliminar.classList.remove("esconderBoton");
        btnEliminar.classList.add("mostrarBoton");

        cargarFormulario(anuncios.find((anuncio)=>anuncio.id==id));
    } 
    else if(e.target.matches("#btnEliminar")){
        handlerDelete(parseInt($formulario.txtId.value));
        restablecerFormulario();
    }  
});

function cargarFormulario(anuncio){
  
  txtId.value = anuncio.id;
  txtTitulo.value=anuncio.titulo;
  txtDescripcion.value=anuncio.descripcion;
  rbtAnimal.value=anuncio.animal;
  txtPrecio.value=anuncio.precio;
  txtRaza.value=anuncio.raza;
  txtFechaNacimiento.value=anuncio.fechaNacimiento;
  txtVacuna.value=anuncio.vacunado;

  for(let i = 0; i < controles.length; i++)
  {
    switch(anuncio.caracteristicas[i])
    {
      case "jugueton":
        chkJugueton.checked=true;
        break;
      case "amoroso":
        chkAmoroso.checked=true;
        break;
      case "guardian":
        chkGuardian.checked=true;
        break;
    }
  }
}

$formulario.addEventListener("submit",(e)=>{
    e.preventDefault();
     
    if(validarEnvio()&& !validarFormSinCompletar()){
        let caracteristicas=[];

        document.querySelectorAll("[type=checkbox]").forEach(item=>{
          if(item.checked===true)
          {
            caracteristicas.push(item.value);
          }
        })

        const formAnuncio =new Anuncio_Mascota(txtId.value,txtTitulo.value,txtDescripcion.value,txtPrecio.value,rbtAnimal.value,
                                               txtRaza.value,txtFechaNacimiento.value,txtVacuna.value,caracteristicas);
    
        if(txtId.value === ''){
            formAnuncio.id=Date.now();
            handlerCreate(formAnuncio);
        }
        else{
            handlerUpdate(formAnuncio);
        }
        restablecerFormulario();
    }
    else{
        return;
    }

})

const handlerCreate = (nuevoAnuncio)=>{

  anuncios.push(nuevoAnuncio);
  
  mostrarMensaje("Alta");
  ejecutarSpinner();
  actualizarStorage(anuncios);
  actualizarTabla(); 
}

const handlerUpdate = (anuncioEditado) =>{

  let indice = anuncios.findIndex((anuncio)=>{
    return anuncio.id==anuncioEditado.id;
  })
  anuncios.splice(indice,1);
  anuncios.push(anuncioEditado);

  mostrarMensaje("Modificación");
  ejecutarSpinner();
  actualizarStorage(anuncios);
  actualizarTabla();

}

const handlerDelete = (id)=>{

  let indice = anuncios.findIndex((anuncio)=>{
    return anuncio.id==id;
  })
  anuncios.splice(indice,1);

  mostrarMensaje("Baja");
  ejecutarSpinner();
  actualizarStorage(anuncios);
  actualizarTabla();

}

function ejecutarSpinner(){
  const i = document.createElement("i");
  i.setAttribute("class", "fa fa-spinner fa-spin fa-3x fa-fw");
  $spinner.appendChild(i);

  setTimeout(()=>{
      $spinner.removeChild(i);
  }, 2000);
};

function actualizarTabla(){
    while($divTabla.hasChildNodes()){
        $divTabla.removeChild($divTabla.firstElementChild);
    }
    const data =JSON.parse(localStorage.getItem("anuncios"));
    if(data){
        $divTabla.appendChild(crearTabla(anuncios));
    }
};

const actualizarStorage=(data)=>{
    localStorage.setItem("anuncios",JSON.stringify(data));
}

btnCancelar.addEventListener("click", (e)=>{
  restablecerFormulario();
});

function restablecerFormulario(){
  $formulario.reset();

  const i = document.createElement("i");
  i.setAttribute("class", "fa-solid fa-floppy-disk");  
  btnGuardar.innerHTML = "";
  btnGuardar.appendChild(i);
  btnGuardar.appendChild(document.createTextNode("Guardar"));

  btnEliminar.classList.remove("mostrarBoton");
  btnEliminar.classList.add("esconderBoton");
  txtId.value = "";
}

function validarEnvio(){
    const controles = $formulario.elements;

    for (const control of controles) {
      if (control.classList.contains("inputError")) {
        return false;
      }
    }
    return true;
};
  
function validarFormSinCompletar(){
    if ($formulario.txtTitulo.value== "" ||
        $formulario.txtDescripcion.value== "" ||
        $formulario.txtPrecio.value== "" ||
        $formulario.txtRaza.value== "" ||
        $formulario.txtFechaNacimiento.value== ""){
        return true;
    }
    return false;
};

let mensajeCustom=document.getElementById("mensajePersonalizado");

function mostrarMensaje(accion){

  const mensajeAMostrar = document.createElement("p");
  mensajeAMostrar.appendChild(document.createTextNode(`Confirmación! ${accion} realizada con éxito`));
  
  mensajeCustom.appendChild(mensajeAMostrar);

  mensajeCustom.classList.add("visibilidadMensaje");
};

cerrarMensaje.addEventListener("click", (e)=>{

  mensajeCustom.classList.remove("visibilidadMensaje");

});

