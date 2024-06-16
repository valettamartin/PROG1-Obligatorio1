window.addEventListener("load", innit);
let MiSistema = new sistema();
let preguntasYaHechas = [];
let respuestaCorrecta = "";

function innit() {
	deseaCargarDatos();

	let info = document.getElementById("irInfo");
	let admin = document.getElementById("irAdmin");
	let jugar = document.getElementById("irJugar");

	info.addEventListener("click", () => divManager(info));
	admin.addEventListener("click", () => divManager(admin));
	jugar.addEventListener("click", () => divManager(jugar));

	document.getElementById("agregarTema").addEventListener("click", agregarTema);
	document.getElementById("agregarPreg").addEventListener("click", agregarPregunta);
	document.getElementById("creciente").addEventListener("click", actualizarPreguntas);
	document.getElementById("decreciente").addEventListener("click", actualizarPreguntas);
	document.getElementById("idJugar").addEventListener("click", preguntaAleatoria);
	document.getElementById("idJugar").addEventListener("click", restaurarBotones);
	document.getElementById("irJugar").addEventListener("click", reiniciarPreguntas);
	document.getElementById("respuesta1").addEventListener("click", corregir);
	document.getElementById("respuesta2").addEventListener("click", corregir);
	document.getElementById("respuesta3").addEventListener("click", corregir);
	document.getElementById("respuesta4").addEventListener("click", corregir);
	document.getElementById("juegoAyuda").addEventListener("click", juegoAyuda);
}

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

function cargarDatos() {
	let temasUnicos = {};

    preguntas.forEach(pregunta => {
        const tema = pregunta.tema;
        if (!temasUnicos[tema.nombre]) {
            MiSistema.agregarTema(tema.nombre, tema.descripcion, randomColor()); 
            temasUnicos[tema.nombre] = true;
        }
    });

    preguntas.forEach(pregunta => {
        let tema = MiSistema.listaTemas.find(t => t.nombre === pregunta.tema.nombre);
        if (tema) {
            MiSistema.agregarPregunta(pregunta.texto, pregunta.respuestaCorrecta, pregunta.respuestasIncorrectas.join(", "), pregunta.nivel, tema);
        }
    });

	actualizarPreguntas();
	actualizarTemas();
}

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

function randomColor() {
	let hue = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
	let saturation = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
	let lightness = Math.floor(Math.random() * (60 - 30 + 1)) + 30;

	let color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	return color;
}

function agregarTema() {
	let newNombre = document.getElementById("temaNombre").value;
	let newDescripcion = document.getElementById("temaDesc").value;

	let newColor;
	let loop = true;
	while (loop == true) {
		newColor = randomColor();
		let seRepite = false;
		for (i = 0; i < MiSistema.listaTemas.length; i++) {
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
		document.getElementById("pregTema").appendChild(newOption);
		document.getElementById("jugarTema").appendChild(newOption2);

		if (MiSistema.hayTemas() == true) {
			document.getElementById("listaTemasVacia").style.display = "none";

			let t = MiSistema.listaTemas[i].nombre;
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

function agregarPregunta() {
	let newTexto = document.getElementById("pregText").value;
	let newRespuestaC = document.getElementById("pregResp").value;
	let newRespuestaI = document.getElementById("pregIncorr").value;
	let newNivel = document.getElementById("pregNivel").value;
	let newTema = JSON.parse(document.getElementById("pregTema").value);

	let exito = MiSistema.agregarPregunta(newTexto, newRespuestaC, newRespuestaI, newNivel, newTema);

	if (exito == true) {
		document.getElementById("altaPreg").reset();
		actualizarPreguntas();
		temaSinPregunta();
	}
}

function actualizarPreguntas() {
	ordenarTabla();
	let vaciarTabla = document.getElementById("tablaPreguntasBody");
	vaciarTabla.innerHTML = "";
	let preguntas = MiSistema.listaPreguntas;
	let totalPreg = document.getElementById("totalPreg");
	totalPreg.innerHTML = "";
	let cantPreg = 0;
	let textoP = "";

	let objTablaPreg = document.getElementById("tablaPreguntasBody");
	let objTabla = document.getElementById("tablaPreguntas");

	objTabla.style.paddingBottom = "170px";

	for (let i = 0; i < preguntas.length; i++) {
		cantPreg++;

		if (MiSistema.hayPreguntas() == true) {
			var objFila = objTablaPreg.insertRow();

			let celdaTema = objFila.insertCell();
			celdaTema.innerHTML = preguntas[i].tema.nombre;
			celdaTema.style.border = "black solid 1px";
			celdaTema.style.backgroundColor = preguntas[i].tema.color;

			let celdaNivel = objFila.insertCell();
			celdaNivel.innerHTML = preguntas[i].nivel;
			celdaNivel.style.border = "black solid 1px";
			celdaNivel.style.backgroundColor = preguntas[i].tema.color;

			let celdaPregunta = objFila.insertCell();
			celdaPregunta.innerHTML = preguntas[i].texto;
			celdaPregunta.style.border = "black solid 1px";
			celdaPregunta.style.backgroundColor = preguntas[i].tema.color;

			let celdaCorrecta = objFila.insertCell();
			celdaCorrecta.innerHTML = preguntas[i].respuestaCorrecta;
			celdaCorrecta.style.border = "black solid 1px";
			celdaCorrecta.style.backgroundColor = preguntas[i].tema.color;

			let celdaIncorrecta = objFila.insertCell();
			celdaIncorrecta.innerHTML = preguntas[i].respuestasIncorrectas;
			celdaIncorrecta.style.border = "black solid 1px";
			celdaIncorrecta.style.backgroundColor = preguntas[i].tema.color;
		}

		let altura = objFila.offsetHeight;
		let index = objTabla.style.paddingBottom.indexOf("p")

		if (objTabla.style.paddingBottom.slice(0,index) - (altura + 4) > 0) {
			objTabla.style.paddingBottom = objTabla.style.paddingBottom.slice(0,index) - (altura + 4) + "px";
		} else {
			objTabla.style.paddingBottom = "0px";
		}
	}

	textoP = "Total de preguntas registradas: " + cantPreg + " preguntas";
	let objtextP = document.createTextNode(textoP);
	totalPreg.appendChild(objtextP);
	promedioPregTemas();
}

function ordenarTabla() {
	if (document.getElementById("creciente").checked) {
		MiSistema.sortPreguntasTemaCrec();
	} else {
		MiSistema.sortPreguntasTemaDecr();
	}
}

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
				let newLitext = document.createTextNode(t[i].nombre);
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

function reiniciarPreguntas() {
	preguntasYaHechas = [];
}

function preguntaAleatoria() {
	let temaIndex = document.getElementById("jugarTema").selectedIndex;
	let nivel = document.getElementById("jugarNivel").value;
	let preguntas = MiSistema.listaPreguntas;
	let listarPreguntas = [];
	let hayNivel = false;
	let listaTemasSinPregunta = temaSinPregunta();
	let textoPregunta = document.getElementById("idTextoPregunta");
	textoPregunta.innerHTML = "";
	let texto = "";
	let resp1 = document.getElementById("respuesta1");
	let resp2 = document.getElementById("respuesta2");
	let resp3 = document.getElementById("respuesta3");
	let resp4 = document.getElementById("respuesta4");
	let listaBotones = [resp1, resp2, resp3, resp4];

	if (
		listaTemasSinPregunta.includes(
			document.getElementById("jugarTema").options[temaIndex].text
		)
	) {
		texto = "NO HAY PREGUNTA";
		let objtext = document.createTextNode(texto);
		textoPregunta.appendChild(objtext);
		for (let i = 0; i < listaBotones.length; i++) {
			listaBotones[i].value = "Error";
			listaBotones[i].innerText = "Error";
		}
		alert(
			"Error, no hay preguntas disponibles para el tema seleccionado, por favor seleccione otro tema"
		);
		return;
	} else {
		let temaSeleccionado =
			document.getElementById("jugarTema").options[temaIndex].text;

		for (let i = 0; i < preguntas.length; i++) {
			let temaPregunta = preguntas[i].tema.nombre;
			let nivelPregunta = preguntas[i].nivel;

			if (temaPregunta === temaSeleccionado && nivelPregunta === nivel) {
				hayNivel = true;
				if (!preguntasYaHechas.includes(preguntas[i].texto)) {
					listarPreguntas.push(preguntas[i].texto);
				}
			}
		}
		if (!hayNivel || listarPreguntas.length === 0) {
			alert(
				"Error, no hay preguntas para el tema elegido con el nivel seleccionado, por favor cambie de tema o de nivel"
			);
			texto = "NO HAY PREGUNTA";
			let objtext = document.createTextNode(texto);
			textoPregunta.appendChild(objtext);
			for (let i = 0; i < listaBotones.length; i++) {
				listaBotones[i].value = "Error";
				listaBotones[i].innerText = "Error";
			}
		} else {
			let preguntaSeleccionada =
				listarPreguntas[
					Math.floor(Math.random() * listarPreguntas.length)
				];
			preguntasYaHechas.push(preguntaSeleccionada);

			texto = preguntaSeleccionada;
			let objtext = document.createTextNode(texto);
			textoPregunta.appendChild(objtext);
			respuestasAleatorias(preguntaSeleccionada);
		}
	}
}

function respuestasAleatorias(preguntaElegida) {
	let listaRespuestas = [];
	let preguntas = MiSistema.listaPreguntas;
	let resp1 = document.getElementById("respuesta1");
	let resp2 = document.getElementById("respuesta2");
	let resp3 = document.getElementById("respuesta3");
	let resp4 = document.getElementById("respuesta4");
	let botones = [resp1, resp2, resp3, resp4];

	for (let i = 0; i < preguntas.length; i++) {
		if (preguntas[i].texto == preguntaElegida) {
			respuestaCorrecta = preguntas[i].respuestaCorrecta;
			listaRespuestas.push(respuestaCorrecta);
			for (let j = 0; j < 3; j++) {
				listaRespuestas.push(preguntas[i].respuestasIncorrectas[j]);
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

	for (let i = 0; i < botones.length; i++) {
		botones[i].value = listaRespuestas[i];
		botones[i].innerText = listaRespuestas[i];
	}
}

function corregir(event) {
	let respuestaSeleccionada = event.target.value;
	let botonSeleccionado = event.target;
	if (respuestaSeleccionada === respuestaCorrecta) {
		botonSeleccionado.classList.add("correcto");
		reproducirSonido("./audios/correcto.mp3");
	} else {
		botonSeleccionado.classList.add("incorrecto");
		reproducirSonido("./audios/incorrecto.mp3");
	}

	let botones = document.querySelectorAll(".questionGeneralFormat");
	botones.forEach((boton) => {
		boton.disabled = true;
	});
}

function restaurarBotones() {
	let botones = document.querySelectorAll(".questionGeneralFormat");
	botones.forEach((boton) => {
		boton.classList.remove("correcto", "incorrecto");
		boton.disabled = false;
	});
}

function reproducirSonido(src) {
	let audio = new Audio(src);
	audio.play();
}

function agregarPuntuacion() {}

function actualizarPuntuacion() {
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

function juegoAyuda() {
	let preguntaActual = document.getElementById("idTextoPregunta").innerText
	let loop = true;

	for (i=0 ; (i<MiSistema.listaPreguntas.length) && (loop) ; i++) {
		if (preguntaActual == MiSistema.listaPreguntas[i].texto) {
			preguntaActual = MiSistema.listaPreguntas[i].respuestaCorrecta;
			loop = false;
		}
	}

	preguntaActualPrint = preguntaActual.slice(0,1);
	alert("El primer carácter de la respuesta correcta es: " + preguntaActualPrint);
}