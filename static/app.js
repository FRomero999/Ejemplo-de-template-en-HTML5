import { data as datos } from "./data.js";

var plantilla = document.querySelector("template").content;
var tabla = document.querySelector("tbody");

let txtNombre = document.querySelector("input[name=nombre]");
let txtAño = document.querySelector("input[name=año]");
let txtPlataforma = document.querySelector("input[name=plataforma]");
let txtDescripcion = document.querySelector("textarea[name=descripcion]");
let btnAñadir = document.querySelector("input[type=submit]");


function insertToTable(element){
    let nuevafila = plantilla.cloneNode(true);

    nuevafila.querySelector(".nombre").textContent=element.nombre;
    nuevafila.querySelector("td:nth-child(2)").textContent=element.año;
    nuevafila.querySelector("td:nth-child(3)").textContent=element.plataforma;
    nuevafila.querySelector("td:nth-child(4)").textContent=element.descripcion;

    tabla.appendChild(nuevafila);
}

function refreshTable(){
    tabla.innerHTML="";
    datos.forEach(element => {
        console.log(element);
        insertToTable(element)
    });
}

function getDataFromForm(){
    return {
        nombre : txtNombre.value,
        año: txtAño.value,
        plataforma: txtPlataforma.value,
        descripcion: txtDescripcion.value
    }
}


btnAñadir.addEventListener("click",(ev)=>{
    ev.preventDefault();
    let entrada = getDataFromForm();
    datos.unshift(entrada);
    //datos.push(entrada);
    refreshTable();
});


refreshTable();