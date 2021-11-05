// Elementos del DOM y Variables

var contador = 0;
var opciones = document.getElementById("lista");
var imagen = document.getElementById("img-preg2");
var numerico = document.getElementById("numerico");
var pregunta = document.getElementById("enunciado");
var opcion1 = document.getElementById("opcion1");
var opcion2 = document.getElementById("opcion2");
var opcion3 = document.getElementById("opcion3");
var botonenviar = document.getElementById("btn-enviar");
var inputfecha = document.getElementById("inputfecha");
var correctas = 0;
var todas = [];


// funcion para cargar preguntas en el BODY.

function cargar_pregunta(cont) {
	
  inputfecha = document.getElementById("inputfecha");
  numerico = document.getElementById("numerico");
  imagen.style.display = "none";
  numerico.style.display = "none";
  inputfecha.style.display = "none";
  opciones.style.display = "none";
  console.log(contador, objeto.length);

  if (contador == objeto.length - 1) {
    botonenviar.textContent = "Terminar intento";
  } else if (contador == objeto.length) {
    botonenviar.style.display = "none";
    terminar();
    return;
  }

  if (objeto[cont].tipo == "RADIO") {
    opciones.style.display = "unset";
    pregunta.textContent = cont + 1 + ") " + objeto[cont].pregunta;
    opcion1.textContent = objeto[cont].A;
    opcion2.textContent = objeto[cont].B;
    opcion3.textContent = objeto[cont].C;
  } else if (objeto[cont].tipo == "NUM") {
    pregunta.textContent = cont + 1 + ") " + objeto[cont].pregunta;
    numerico.style.display = "unset";
  } else if (objeto[cont].tipo == "FECHA") {
    pregunta.textContent = cont + 1 + ") " + objeto[cont].pregunta;
    inputfecha.style.display = "unset";
  }

  if (objeto[cont].img != null) {
    imagen.src = objeto[cont].img;
    imagen.style.display = "unset";
  }
}

cargar_pregunta(0);

// funcion para validar preguntas

function validar(respuesta) {
  console.log("funcion validar", respuesta);
  if (respuesta) {
    if (respuesta.value == objeto[contador].correcta) {
      correctas++;
      todas.push({id:objeto[contador].id, verif: true});
    } else todas.push({id:objeto[contador].id, verif: false});
    contador = contador + 1;
    cargar_pregunta(contador);
  } else {
    alert("Por favor, conteste la pregunta correspondiente.");
    return;
  }
}

botonenviar.onclick = function verificarTipo() {
  if (objeto[contador].tipo == "RADIO") {
    rcorrecta = document.querySelector("input[type=radio]:checked");
    validar(rcorrecta);
  } else if (objeto[contador].tipo == "NUM") {
    numerico = document.getElementById("numerico");
    validar(numerico);
  } else if (objeto[contador].tipo == "FECHA") {
    inputfecha = document.getElementById("inputfecha");
    validar(inputfecha);
  }
};

// funcion para terminar el cuestionario

function terminar() {
  var contenedor = document.getElementById("caja");
  var resultado = document.getElementById("resultados");
  var boxresultados = document.getElementById("boxresultados");
  contenedor.style.display = "none";
  boxresultados.style.display = "unset";
  resultado.textContent =
    "Has respondido correctamente " +
    correctas +
    " de " +
    objeto.length +
    " preguntas";

 if(todas.length != 0){
    let nodo;
    let texto;

    for(i = 0; i < todas.length; i++){

            nodo = document.createElement('h4');
            if(todas[i].verif == true){
              nodo.className = "h4correctas"
              texto = document.createTextNode("Pregunta " + todas[i].id + "." + " correcta")
            }
            else{
              texto = document.createTextNode("Pregunta " + todas[i].id + "." + " incorrecta")
              nodo.className = "h4incorrectas"
            }

            nodo.appendChild(texto);
            boxresultados.appendChild(nodo);
    } 
  }
}

