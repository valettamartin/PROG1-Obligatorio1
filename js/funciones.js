window.addEventListener("load", innit);
let MiSistema = new sistema();

function innit() {
	//deseaCargarDatos();

	let info = document.getElementById("irInfo");
	let admin = document.getElementById("irAdmin");
	let jugar = document.getElementById("irJugar");

	info.addEventListener("click", () => divManager(info));
	admin.addEventListener("click", () => divManager(admin));
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
			}
		}
	}
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

function agregarTema() {
	let newNombre = document.getElementById("temaNombre").value;
	let newDescripcion = document.getElementById("temaDesc").value;

	let exito = MiSistema.agregarTema(newNombre, newDescripcion);

	if (exito == true) {
		document.getElementById("altaTemas").reset();
		actualizarTemas();
		temaSinPregunta();
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
	let totalTemas = document.getElementById("totalTemas");
	totalTemas.innerHTML = "";

	for (let i = 0; i < temas.length; i++) {
		cantTemas++;
		let newOption = document.createElement("option");
		newOption.setAttribute("value", JSON.stringify(temas[i]));
		newOption.innerText = temas[i].nombre;
		document.getElementById("pregTema").appendChild(newOption);

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

function actualizarPreguntas() {
	ordenarTabla();
	let vaciarTabla = document.getElementById("tablaPreguntasBody");
	vaciarTabla.innerHTML = "";
	let preguntas = MiSistema.listaPreguntas;
	let totalPreg = document.getElementById("totalPreg");
	totalPreg.innerHTML = "";
	let cantPreg = 0;
	let textoP = "";

	for (let i = 0; i < preguntas.length; i++) {
		cantPreg++;

		if (MiSistema.hayPreguntas() == true) {
			let objTablaPreg = document.getElementById("tablaPreguntasBody");
			let objFila = objTablaPreg.insertRow();
			let celdaTema = objFila.insertCell();
			celdaTema.innerHTML = preguntas[i].tema.nombre;
			let celdaNivel = objFila.insertCell();
			celdaNivel.innerHTML = preguntas[i].nivel;
			let celdaPregunta = objFila.insertCell();
			celdaPregunta.innerHTML = preguntas[i].texto;
			let celdaCorrecta = objFila.insertCell();
			celdaCorrecta.innerHTML = preguntas[i].respuestaCorrecta;
			let celdaIncorrecta = objFila.insertCell();
			celdaIncorrecta.innerHTML = preguntas[i].respuestasIncorrectas;
		}
	}

	textoP = "Total de preguntas registradas: " + cantPreg + " preguntas";
	let objtextP = document.createTextNode(textoP);
	totalPreg.appendChild(objtextP);
	promedioPregTemas();
}

//FALTA//function agregarPuntuacion() {}

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
}
