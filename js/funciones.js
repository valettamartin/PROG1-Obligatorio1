/* 
    Elena Couste - 333562
    Martin Valetta - 251093
*/

window.addEventListener("load", innit);
let MiSistema = new sistema();
let preguntasYaHechas = [];
let respuestaCorrecta = "";
let juegoEnProgreso = false;
let puntuacionActual = 0;
let datosPrueba = preguntas;

function innit() {
	deseaCargarDatos();
	puntuacionMaxima();

	let info = document.getElementById("irInfo");
	let admin = document.getElementById("irAdmin");
	let jugar = document.getElementById("irJugar");

	info.addEventListener("click", () => {
		divManager(info);
		verificarJuegoEnProgreso();
	});
	admin.addEventListener("click", () => {
		divManager(admin);
		verificarJuegoEnProgreso();
	});
	jugar.addEventListener("click", () => divManager(jugar));

	document
		.getElementById("agregarTema")
		.addEventListener("click", agregarTema);
	document
		.getElementById("agregarPreg")
		.addEventListener("click", agregarPregunta);
	document
		.getElementById("creciente")
		.addEventListener("click", actualizarPreguntas);
	document
		.getElementById("decreciente")
		.addEventListener("click", actualizarPreguntas);
	document
		.getElementById("idJugar")
		.addEventListener("click", preguntaAleatoria);
	document
		.getElementById("irJugar")
		.addEventListener("click", reiniciarPreguntas);
	document.getElementById("respuesta1").addEventListener("click", corregir);
	document.getElementById("respuesta2").addEventListener("click", corregir);
	document.getElementById("respuesta3").addEventListener("click", corregir);
	document.getElementById("respuesta4").addEventListener("click", corregir);
	document.getElementById("juegoAyuda").addEventListener("click", juegoAyuda);
	document
		.getElementById("juegoSiguiente")
		.addEventListener("click", siguientePregunta);
	document
		.getElementById("juegoTerminar")
		.addEventListener("click", terminarJuego);

	let jugarBoton = document.getElementById("idJugar");
	jugarBoton.disabled = false;
	document.addEventListener("visibilitychange", handleVisibilityChange);
}

// Consultamos si el usuario desea cargar los datos de datosPrueba.js o no.
// Se ejecuta primero al ejecutar la pagina.
function deseaCargarDatos() {
	let loadYesOrNo = "";
	let loop = true;

	while (loop == true) {
		loadYesOrNo = prompt(
			"¿Desea utilizar los datos precargados? Ingrese s/n."
		);
		loadYesOrNo = loadYesOrNo.toLocaleLowerCase();

		if (loadYesOrNo != "s" && loadYesOrNo != "n") {
			alert("No se ha ingresado una respuesta valida");
		} else {
			loop = false;
			if (loadYesOrNo == "s") {
				cargarDatos();
			}
		}
	}
}

/* Recorre todos los objetos contenidos en el array preguntas[] de datosPrueba.js (renombrado como datosPrueba[] arriba del codigo por comodidad), y crea con ellos en MiSistema lo siguiente:
	-> Un Tema en caso de recorrer todos los temas (MiSistema.listaTemas) ya creados y verrificar que no se ha creado previamente.
	-> Una pregunta en caso de recorrer todas las preguntas (MiSistema.listaPreguntas) ya creadas y verificar que no se ha creado previamente.
*/
// Se ejecuta al confirmar que se desean cargar datos en deseaCargarDatos()
function cargarDatos() {
	let loop = true;
	let esta = false;

	let temaNombre = "";
	let temaDesc = "";
	let temaColor = "";
	let colorLoop = true;

	let preguntaTexto = "";
	let preguntaNivel = 0;
	let preguntaCorr = "";
	let preguntaIncorr = [];
	let preguntaTema;

	for (i = 0; i < datosPrueba.length; i++) {
		loop = true;
		esta = false;

		for (j = 0; j < MiSistema.listaTemas.length && loop; j++) {
			if (MiSistema.listaTemas[j].nombre == datosPrueba[i].tema.nombre) {
				esta = true;
				loop = false;
			}
		}
		if (esta == false) {
			temaNombre = datosPrueba[i].tema.nombre;
			temaDesc = datosPrueba[i].tema.descripcion;
			colorLoop = true;
			while (colorLoop == true) {
				temaColor = randomColor();
				let seRepite = false;
				for (i = 0; i < MiSistema.listaTemas.length; i++) {
					if (MiSistema.listaTemas[i].color == temaColor) {
						seRepite = true;
					}
				}
				if (seRepite == false) {
					colorLoop = false;
				}
			}
			MiSistema.agregarTema(temaNombre, temaDesc, temaColor);
		}

		esta = false;
		loop = true;
		for (j = 0; j < MiSistema.listaPreguntas.length && loop; j++) {
			if (MiSistema.listaPreguntas[j].texto == datosPrueba[i].texto) {
				esta = true;
				loop = false;
			}
		}
		if (esta == false) {
			loop = true;
			for (j = 0; j < MiSistema.listaTemas.length && loop; j++) {
				if (
					datosPrueba[i].tema.nombre == MiSistema.listaTemas[j].nombre
				) {
					preguntaTema = MiSistema.listaTemas[j];
					loop = false;
				}
			}
			preguntaTexto = datosPrueba[i].texto;
			preguntaNivel = datosPrueba[i].nivel;
			preguntaCorr = datosPrueba[i].respuestaCorrecta;
			preguntaIncorr = datosPrueba[i].respuestasIncorrectas.toString();
			MiSistema.agregarPregunta(
				preguntaTexto,
				preguntaCorr,
				preguntaIncorr,
				preguntaNivel,
				preguntaTema
			);
		}
	}

	actualizarPreguntas();
	actualizarTemas();
}

// Se fija cual fue el div seleccionado (se le pasa como parametro), y aplica display none a todos los que no son este para ocultarlos y display block a este para mostrarlo.
// Se ejecuta en innit al clickear uno de los botones del nav.
function divManager(selectedButton) {
	switch (selectedButton) {
		case document.getElementById("irInfo"):
			document.getElementById("informacion").style.display = "block";
			document.getElementById("administrar").style.display = "none";
			document.getElementById("jugar").style.display = "none";
			break;

		case document.getElementById("irAdmin"):
			document.getElementById("informacion").style.display = "none";
			document.getElementById("administrar").style.display = "block";
			document.getElementById("jugar").style.display = "none";
			break;

		case document.getElementById("irJugar"):
			document.getElementById("informacion").style.display = "none";
			document.getElementById("administrar").style.display = "none";
			document.getElementById("jugar").style.display = "block";
			break;
	}
}

// Crea un color aleatorio entre el amarillo y el marron, y lo ofrece como retorno en formato string con un valor de color hsl dentro.
// Se ejecuta al crear un tema para asignarle un color identificador.
function randomColor() {
	let hue = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
	let saturation = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
	let lightness = Math.floor(Math.random() * (60 - 30 + 1)) + 30;

	let color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	return color;
}

// Agrega un nuevo tema con los valores presentes en el formulario de Alta de Temas presente en Administrar.  Llama a randomColor() tantas veces como sea necesario para generar un color que no haya sido previamente asignado a otro tema. En caso en que todos los datos sean validos, ejecuta las funciones pertinentes a la recarga de la pagina.
// Se llama al clickear el boton de Agregar en Alta de Temas
function agregarTema() {
	let newNombre = document.getElementById("temaNombre").value;
	let newDescripcion = document.getElementById("temaDesc").value;

	let newColor;
	let loop = true;
	while (loop == true) {
		newColor = randomColor();
		let seRepite = false;
		for (i = 0; i < MiSistema.listaTemas.lenggetElementByIdth; i++) {
			if (MiSistema.listaTemas[i].color == newColor) {
				seRepite = true;
			}
		}
		if (seRepite == false) {
			loop = false;
		}
	}

	let exito = MiSistema.agregarTema(newNombre, newDescripcion, newColor);

	if (exito == true) {
		document.getElementById("altaTemas").reset();
		actualizarTemas();
		temaSinPregunta();
		actualizarTemasSinPreg();
	}
}

// Realiza el refresh en tiempo real de los temas. Se encarga de actualizar los select, vaciandolos y creandolos nuevamente y añadiendo todos los temas presentes en MiSistema.listaTemas siempre que es llamada.
// Es llamada cada ves que un tema nuevo es creado.
function actualizarTemas() {
	let temas = MiSistema.listaTemas;
	let cantTemas = 0;
	let texto = "";
	let listaDeTemas = document.getElementById("listaTemas");
	listaDeTemas.innerHTML = "";
	let pregs = document.getElementById("pregTema");
	pregs.innerHTML = "";
	let jugar = document.getElementById("jugarTema");
	jugar.innerHTML = "";
	let totalTemas = document.getElementById("totalTemas");
	totalTemas.innerHTML = "";

	for (let i = 0; i < temas.length; i++) {
		cantTemas++;
		let newOption = document.createElement("option");
		newOption.setAttribute("value", JSON.stringify(temas[i]));
		newOption.innerText = temas[i].nombre;
		let newOption2 = newOption.cloneNode();
		newOption2.innerText = temas[i].nombre;
		document.getElementById("pregTema").appendChild(newOption);
		document.getElementById("jugarTema").appendChild(newOption2);

		if (MiSistema.hayTemas() == true) {
			document.getElementById("listaTemasVacia").style.display = "none";

			let t = MiSistema.listaTemas[i];
			let newLi = document.createElement("li");
			let newLitext = document.createTextNode(t);
			newLi.appendChild(newLitext);
			document.getElementById("listaTemas").appendChild(newLi);
		}
	}
	texto = "Lista de temas (total de temas: " + cantTemas + ")";
	let objtext = document.createTextNode(texto);
	totalTemas.appendChild(objtext);
}

//Esta función actualiza los select de temas.
function actualizarTemasSinPreg() {
	let temas = MiSistema.listaTemas;
	let jugar = document.getElementById("jugarTema");
	jugar.innerHTML = "";

	for (let i = 0; i < temas.length; i++) {
		let newOption = document.createElement("option");
		newOption.setAttribute("value", JSON.stringify(temas[i]));
		newOption.innerText = temas[i].nombre;
		document.getElementById("jugarTema").appendChild(newOption);
	}
}

// Agrega una nueva pregunta con los datos del formulario Alta de Preguntas en caso de ser todos validos.
// Se ejecuta al clickear Agregar en el formulario de Alta de Preguntas.
function agregarPregunta() {
	let newTexto = document.getElementById("pregText").value;
	let newRespuestaC = document.getElementById("pregResp").value;
	let newRespuestaI = document.getElementById("pregIncorr").value;
	let newNivel = document.getElementById("pregNivel").value;
	let newTema = JSON.parse(document.getElementById("pregTema").value);

	let exito = MiSistema.agregarPregunta(
		newTexto,
		newRespuestaC,
		newRespuestaI,
		newNivel,
		newTema
	);

	if (exito == true) {
		document.getElementById("altaPreg").reset();
		actualizarPreguntas();
		temaSinPregunta();
	}
}

// Actualiza las preguntas, metiendolas en la tabla y actualizando el contador de preguntas registradas. Tambien actualiza en tiempo real el tamaño de la tabla para mantenerlo siempre constante, independientemente de la cantidad de preguntas que contenga.
// Se ejecuta siempre que una pregunta nueva es creada o se cambia el orden de la tabla.
function actualizarPreguntas() {
	ordenarTabla();
	let vaciarTabla = document.getElementById("tablaPreguntasBody");
	vaciarTabla.innerHTML = "";
	let preguntasUse = MiSistema.listaPreguntas;
	let totalPreg = document.getElementById("totalPreg");
	totalPreg.innerHTML = "";
	let cantPreg = 0;
	let textoP = "";

	let objTablaPreg = document.getElementById("tablaPreguntasBody");
	let objTabla = document.getElementById("tablaPreguntas");

	objTabla.style.paddingBottom = "170px";

	for (let i = 0; i < preguntasUse.length; i++) {
		cantPreg++;

		if (MiSistema.hayPreguntas() == true) {
			var objFila = objTablaPreg.insertRow();

			let celdaTema = objFila.insertCell();
			celdaTema.innerHTML = preguntasUse[i].tema.nombre;
			celdaTema.style.border = "black solid 1px";
			celdaTema.style.backgroundColor = preguntasUse[i].tema.color;

			let celdaNivel = objFila.insertCell();
			celdaNivel.innerHTML = preguntasUse[i].nivel;
			celdaNivel.style.border = "black solid 1px";
			celdaNivel.style.backgroundColor = preguntasUse[i].tema.color;

			let celdaPregunta = objFila.insertCell();
			celdaPregunta.innerHTML = preguntasUse[i].texto;
			celdaPregunta.style.border = "black solid 1px";
			celdaPregunta.style.backgroundColor = preguntasUse[i].tema.color;

			let celdaCorrecta = objFila.insertCell();
			celdaCorrecta.innerHTML = preguntasUse[i].respuestaCorrecta;
			celdaCorrecta.style.border = "black solid 1px";
			celdaCorrecta.style.backgroundColor = preguntasUse[i].tema.color;

			let celdaIncorrecta = objFila.insertCell();
			celdaIncorrecta.innerHTML = preguntasUse[i].respuestasIncorrectas;
			celdaIncorrecta.style.border = "black solid 1px";
			celdaIncorrecta.style.backgroundColor = preguntasUse[i].tema.color;
		}

		let altura = objFila.offsetHeight;
		let index = objTabla.style.paddingBottom.indexOf("p");

		if (objTabla.style.paddingBottom.slice(0, index) - (altura + 4) > 0) {
			objTabla.style.paddingBottom =
				objTabla.style.paddingBottom.slice(0, index) -
				(altura + 4) +
				"px";
		} else {
			objTabla.style.paddingBottom = "0px";
		}
	}

	textoP = "Total de preguntas registradas: " + cantPreg + " preguntas";
	let objtextP = document.createTextNode(textoP);
	totalPreg.appendChild(objtextP);
	promedioPregTemas();
}

/*ordenarTabla utiliza las funciones sort de MiSistema que en caso de seleccionar creciente, ordena por orden alfabético
creciente y si se trata del mismo tema, por nivel creciente, y al seleccionar decreciente, ordena por orden alfabético
decreciente, y al igual que en caso creciente, si el tema es igual, por nivel creciente.
*/
function ordenarTabla() {
	if (document.getElementById("creciente").checked) {
		MiSistema.sortPreguntasTemaCrec();
	} else {
		MiSistema.sortPreguntasTemaDecr();
	}
}

/* promedioPregoTemas utiliza la funcion contarPreguntas de MiSistema, luego recorre la lista de preguntas
para contar la cantidad de temas ditintos que hay, hace el promedio con la cantidad de temas y preguntas
y lo agrega al texto de administrar.
*/
function promedioPregTemas() {
	let p = MiSistema.listaPreguntas;
	let cantTemas = 0;
	let listaDeTemas = [];
	let cantPreg = 0;
	let promedio = 0;
	let pregPorTema = document.getElementById("pregPorTema");
	pregPorTema.innerHTML = "";
	let texto = "";

	if (MiSistema.hayPreguntas() == true) {
		cantPreg = MiSistema.contarPreguntas();
		for (let i = 0; i < p.length; i++) {
			if (listaDeTemas.includes(p[i].tema.nombre) == false) {
				cantTemas++;
				listaDeTemas.push(p[i].tema.nombre);
			}
		}
		promedio = cantPreg / cantTemas;
		promedio = promedio.toFixed(2);

		texto =
			"Promedio de preguntas por tema (cantidad total de preguntas/cantidad total de temas): " +
			promedio;
		let objtextProm = document.createTextNode(texto);
		pregPorTema.appendChild(objtextProm);
	}
}

/* En esta función se recorre la lista de temas y la de preguntas, en caso de no haber preguntas para un tema,
lo agrega a la lista de temas sin preguntas y si no hay temas sin preguntas muesta "sin datos" en la lista.
*/
function temaSinPregunta() {
	let p = MiSistema.listaPreguntas;
	let t = MiSistema.listaTemas;
	let listaTemaSinPregunta = document.getElementById("listaTemaNoPreg");
	listaTemaSinPregunta.innerHTML = "";
	let cantTemas = 0;
	let texto = "";
	let listaTemasSinPregunta = [];

	if (MiSistema.hayTemas() == true) {
		for (let i = 0; i < t.length; i++) {
			let esta = false;
			for (let j = 0; j < p.length; j++) {
				if (t[i].nombre == p[j].tema.nombre) {
					esta = true;
				}
			}

			if (esta == false) {
				cantTemas++;
				listaTemasSinPregunta.push(t[i].nombre);
				let newLi = document.createElement("li");
				let newLitext = document.createTextNode(t[i]);
				newLi.appendChild(newLitext);
				document.getElementById("listaTemaNoPreg").appendChild(newLi);
			}
		}
		if (cantTemas == 0) {
			let newLiVacio = document.createElement("li");
			texto = "Sin datos";
			let newLitextVacio = document.createTextNode(texto);
			newLiVacio.appendChild(newLitextVacio);
			document.getElementById("listaTemaNoPreg").appendChild(newLiVacio);
		}
	}
	return listaTemasSinPregunta;
}

// reiniciarPreguntas se utiliza al tocar el botón jugar y vacía la lista de preguntasYaHechas.
function reiniciarPreguntas() {
	preguntasYaHechas = [];
}

//Esta función se utiliza en caso de cambiarse de pestaña, de ser así, se llama a la función terminarJuego.
function handleVisibilityChange() {
	if (document.hidden) {
		if (juegoEnProgreso) {
			terminarJuego();
		}
	}
}

//La siguiente función verifica que haya una partida en proceso, de lo contrario llama a terminarJuego.
function verificarJuegoEnProgreso() {
	if (juegoEnProgreso) {
		terminarJuego();
	}
}

/* peguntaAleatoria, muestra  el bloque de texto de pregunta y respuestas, deshabilita el bóton de jugar, restaura los botones, 
verifica que haya preguntas para el tema y nivel seleccionados, en caso de no haber muesta un mensaje, y de lo contrario crea 
una lista con las posibles preguntas, toma una aleatoria que no este en preguntasYaHechas para mostrar, y luego la añade a preguntasYaHechas, 
en caso de no haber mas preguntas disponibles llama a la función terminarJuego.
*/
function preguntaAleatoria() {
	document.getElementById("gameDiv").style.display = "block";
	juegoEnProgreso = true;
	let jugarBoton = document.getElementById("idJugar");
	jugarBoton.disabled = true;
	let temaIndex = document.getElementById("jugarTema").selectedIndex;
	let nivel = document.getElementById("jugarNivel").value;
	let preguntasUse = MiSistema.listaPreguntas;
	let listarPreguntas = [];
	let hayNivel = false;
	let listaTemasSinPregunta = temaSinPregunta();
	let textoPregunta = document.getElementById("idTextoPregunta");
	textoPregunta.innerHTML = "";
	let texto = "";
	let listaBotones = document.getElementById("respuestasContainer").querySelectorAll("*");
	let botonSiguientePreg = document.getElementById("juegoSiguiente");
	botonSiguientePreg.disabled = false;

	restaurarBotones();

	if (listaTemasSinPregunta.includes(document.getElementById("jugarTema").options[temaIndex].text)) {
		texto = "NO HAY PREGUNTA";
		let objtext = document.createTextNode(texto);
		textoPregunta.appendChild(objtext);

		for (let i = 0; i < listaBotones.length; i++) {
			listaBotones[i].value = "Error";
			listaBotones[i].innerText = "Error";
		}

		alert("Error, no hay preguntas disponibles para el tema seleccionado, por favor seleccione otro tema");

		jugarBoton.disabled = false;
		juegoEnProgreso = false;
		return;
	} else {
		let temaSeleccionado = document.getElementById("jugarTema").options[temaIndex].text;
		let temaColor = JSON.parse(document.getElementById("jugarTema").options[temaIndex].value);
		temaColor = temaColor.color;

		for (i = 0; i < listaBotones.length; i++) {
			listaBotones[i].style.backgroundColor = temaColor;
		}
		textoPregunta.style.backgroundColor = temaColor;

		for (let i = 0; i < preguntasUse.length; i++) {
			let temaPregunta = preguntasUse[i].tema.nombre;
			let nivelPregunta = preguntasUse[i].nivel;

			if (temaPregunta == temaSeleccionado && nivelPregunta == nivel) {
				hayNivel = true;
				if (!preguntasYaHechas.includes(preguntasUse[i].texto)) {
					listarPreguntas.push(preguntasUse[i].texto);
				}
			}
		}
		if (!hayNivel) {
			alert("Error, no hay preguntas para el tema elegido con el nivel seleccionado, por favor cambie de tema o de nivel");
			texto = "NO HAY PREGUNTA";
			let objtext = document.createTextNode(texto);
			textoPregunta.appendChild(objtext);

			for (let i = 0; i < listaBotones.length; i++) {
				listaBotones[i].value = "Error";
				listaBotones[i].innerText = "Error";
			}

			jugarBoton.disabled = false;
			juegoEnProgreso = false;
		} else {
			let preguntaSeleccionada = listarPreguntas[ Math.floor(Math.random() * listarPreguntas.length) ];
			preguntasYaHechas.push(preguntaSeleccionada);
			texto = preguntaSeleccionada;
			let objtext = document.createTextNode(texto);
			textoPregunta.appendChild(objtext);
			respuestasAleatorias(preguntaSeleccionada);

			if (listarPreguntas.length == 1) {
				botonSiguientePreg.disabled = true;
			}
			if (listarPreguntas.length == 0) {
				terminarJuego();
			}
		}
	}
}

/* respuestasAleatorias, crea una lista con la respuesta correcta y las incorrectas, la reordena,
y para cada bóton de respuestas toma una respuesta de esa lista.
*/
function respuestasAleatorias(preguntaElegida) {
	let listaRespuestas = [];
	let preguntasUse = MiSistema.listaPreguntas;
	let containerRespuestas = document.getElementById("respuestasContainer");
	let temaColor = "";

	for (let i = 0; i < preguntasUse.length; i++) {
		if (preguntasUse[i].texto == preguntaElegida) {
			temaColor = preguntasUse[i].tema.color;
			respuestaCorrecta = preguntasUse[i].respuestaCorrecta;
			listaRespuestas.push(respuestaCorrecta);
			for (let j = 0 ; j < preguntasUse[i].respuestasIncorrectas.length ; j++) {
				listaRespuestas.push(preguntasUse[i].respuestasIncorrectas[j]);
			}
			break;
		}
	}

	function reOrdenarLista(lista) {
		for (let i = lista.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[lista[i], lista[j]] = [lista[j], lista[i]];
		}
	}

	reOrdenarLista(listaRespuestas);

	containerRespuestas.innerHTML = "";

	for (let i = 0; i < listaRespuestas.length; i++) {
		let newButton = document.createElement("input");
		newButton.classList.add("questionGeneralFormat");
		newButton.type = "button";
		newButton.value = listaRespuestas[i];
		newButton.innerText = listaRespuestas[i];
		newButton.style.backgroundColor = temaColor;

		containerRespuestas.appendChild(newButton);
	}

	let añadirListenerABoton = document.getElementById("respuestasContainer").querySelectorAll("*");

	añadirListenerABoton.forEach(function(boton) {
		boton.addEventListener("click", corregir);
	})
}

/* La funcion corregir se utiliza cuando se selecciona una respuesta, modifica la puntuación actual, activa el
sonido correspondiente y cambia el color del boton seleccionado, dependiendo de si es correcta o incorrecta la respuesta.
Luego llama a actualizarPuntuación.
*/
function corregir(event) {
	let respuestaSeleccionada = event.target.value;
	let botonSeleccionado = event.target;
	if (respuestaSeleccionada === respuestaCorrecta) {
		botonSeleccionado.style.backgroundColor = "green";
		reproducirSonido("./audios/correcto.mp3");
		puntuacionActual += 10;
	} else {
		botonSeleccionado.style.backgroundColor = "red";
		reproducirSonido("./audios/incorrecto.mp3");
		puntuacionActual -= 1;
	}

	let botones = document.querySelectorAll(".questionGeneralFormat");
	botones.forEach((boton) => {
		boton.disabled = true;
	});

	actualizarPuntuacion();
}

//Esta función restaura los botones a sus valores y formatos originales.
function restaurarBotones() {
	let botones = document.querySelectorAll(".questionGeneralFormat");
	botones.forEach((boton) => {
		boton.style.backgroundColor = "#e87c24";
		boton.disabled = false;
	});
}

// reproducirSonido se activa al seleccionar una respuesta.
function reproducirSonido(src) {
	let audio = new Audio(src);
	audio.play();
}

//La siguiente función va actualizando el puntaje durante una partida.
function actualizarPuntuacion() {
	let puntaje = document.getElementById("puntajeAcumulado");
	puntaje.innerText =
		"Puntaje acumulado en esta partida: " + puntuacionActual;
}

/* puntuacionMaxima utiliza la lista de puntuaciones de MiSistema, busca la máxima puntuación en ella
y modifica el texto de administrar con la puntuación máxima actual.
*/
function puntuacionMaxima() {
	let puntuacion = MiSistema.listaPuntuaciones;
	let maxPuntaje = document.getElementById("maxpuntaje");
	maxPuntaje.innerHTML = "";
	let maximo = 0;
	let textoPuntaje = "";

	for (let i = 0; i < puntuacion.length; i++) {
		let puntaje = puntuacion[i];
		if (puntaje > maximo) {
			maximo = puntaje;
		}
	}

	textoPuntaje = "Maximo puntaje obtenido por un jugador: " + maximo;
	let objtextPuntaje = document.createTextNode(textoPuntaje);
	maxPuntaje.appendChild(objtextPuntaje);
}

// Busca la respuesta correcta de la pregunta actualmente mostrada, y luego crea un string con el primer caracter de dicha respuesta y lo muestra por medio de un alert.
// Se ejecuta al clickear el boton ayuda de Jugar.
function juegoAyuda() {
	let preguntaActual = document.getElementById("idTextoPregunta").innerText;
	let loop = true;

	for (i = 0; i < MiSistema.listaPreguntas.length && loop; i++) {
		if (preguntaActual == MiSistema.listaPreguntas[i].texto) {
			preguntaActual = MiSistema.listaPreguntas[i].respuestaCorrecta;
			loop = false;
		}
	}

	preguntaActualPrint = preguntaActual.slice(0, 1);
	alert(
		"El primer carácter de la respuesta correcta es: " + preguntaActualPrint
	);
}

//siguientePregunta se activa al seleccionar el botón Siguiente Pregunta, y llama a la función preguntaAleatoria.
function siguientePregunta() {
	preguntaAleatoria();
}

/*La siguiente función se activa al seleccionar el botón terminar o al cambiar de pestaña.
Pasa a mostrar solo el bloque con el tema y el nivel a eligir.
Luego muestra un mensaje con el puntaje obtenido y añade este puntaje  a la lista de puntuaciones, para luego ser usado en puntajeMaximo.
Luego restaura los textos de la pregunta y las respuestas, los botones, y actualiza la puntuación máxima.
*/
function terminarJuego() {
	document.getElementById("gameDiv").style.display = "none";
	alert("El puntaje obtenido es: " + puntuacionActual);
	let jugarBoton = document.getElementById("idJugar");
	let textoPregunta = document.getElementById("idTextoPregunta");
	textoPregunta.innerHTML = "";
	let texto = "";
	let listaBotones = document.getElementById("respuestasContainer").querySelectorAll("*");

	MiSistema.agregarPuntuacion(puntuacionActual);
	puntuacionActual = 0;
	actualizarPuntuacion();

	texto = "TEXTO DE LA PREGUNTA";
	let objtext = document.createTextNode(texto);
	textoPregunta.appendChild(objtext);
	for (let i = 0; i < listaBotones.length; i++) {
		listaBotones[i].value = "Respuesta " + (i + 1);
		listaBotones[i].innerText = "Respuesta " + (i + 1);
	}
	restaurarBotones();
	jugarBoton.disabled = false;

	puntuacionMaxima();
	juegoEnProgreso = false;
}
