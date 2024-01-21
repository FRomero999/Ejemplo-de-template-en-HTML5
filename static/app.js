import { data as datos} from "./data.js";

var listado = [];

var plantilla = document.querySelector("template").content;
var tabla = document.querySelector("tbody");

let txtNombre = document.querySelector("input[name=nombre]");
let txtAño = document.querySelector("input[name=año]");
let txtPlataforma = document.querySelector("input[name=plataforma]");
let txtDescripcion = document.querySelector("textarea[name=descripcion]");
let btnAñadir = document.querySelector("input[type=submit]");
let btnJson = document.querySelector("button#btnjson");
let btnGuardar = document.querySelector("button#btnguardar");
let btnCargar = document.querySelector("button#btncargar");


let url = "./../data.json";


function insertToTable(element,position){
    let nuevafila = plantilla.cloneNode(true);

    nuevafila.querySelector(".nombre").textContent=element.nombre;
    nuevafila.querySelector("td:nth-child(2)").textContent=element.año;
    nuevafila.querySelector("td:nth-child(3)").textContent=element.plataforma;
    nuevafila.querySelector("td:nth-child(4)").textContent=element.descripcion;
    nuevafila.querySelector("button").dataset.pos=position;

    nuevafila.querySelector("button").addEventListener("click",(event)=>{
        let pos = event.target.dataset.pos;
        showInfo(pos);
    });


    tabla.appendChild(nuevafila);

}

function showInfo(pos){

    document.querySelector("dialog h3").textContent = listado[pos].nombre;
    document.querySelector("dialog p").textContent = listado[pos].descripcion;
    
    document.querySelector("dialog").showModal();
}

function refreshTable(){
    tabla.innerHTML="";
    listado.forEach( (element,index) => {
        //console.log(element);
        insertToTable(element,index); 
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
    listado.unshift(entrada);
    //listado.push(entrada);
    refreshTable();
});


btnJson.addEventListener("click",(ev)=>{

        ev.preventDefault();

        console.log("Cargando listado...");

        fetch(url).then(
            (respuesta) => {
                console.log(respuesta.statusText)
                return respuesta.json();
            }
        ).then( 
            (data)=>{
                // listado ya codificados
                console.log(data);
                //data.forEach(insertToTable);
                data.forEach( (el)=>listado.push(el) );
                refreshTable();
            }
        ).catch( (error)=>{
            console.log(error);
        });


});

btnGuardar.addEventListener("click", (ev)=>{
    ev.preventDefault();
    if(window.localStorage){
        window.localStorage.setItem("listado",JSON.stringify(listado));
    }
});

btnCargar.addEventListener("click", (ev)=>{
    ev.preventDefault();
    if(window.localStorage){
        try{
            listado=JSON.parse(window.localStorage.getItem("listado"));
        } catch(ex) {
            console.log("Error al parsear");
            console.log(ex);
        }
        refreshTable();

    }
});

window.addEventListener("load",function(){
    datos.forEach( (el)=>listado.push(el) );
    console.log(listado);
    refreshTable();
})


