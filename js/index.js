import { crearArticulo } from './articuloDinamico.js'

const anuncios=JSON.parse(localStorage.getItem("anuncios")) || [];
const $contenidoDinamico = document.getElementById("divArticuloDinamico");

const fragmento = document.createDocumentFragment();
anuncios.forEach(item => {
    fragmento.appendChild(crearArticulo(item));
});
$contenidoDinamico.appendChild(fragmento);