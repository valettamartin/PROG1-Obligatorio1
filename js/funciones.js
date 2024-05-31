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

	document.getElementById("agregarTema").addEventListener("click", nuevoTema);
	document.getElementById("agregarPreg").addEventListener("click", nuevaPregunta);
}

function deseaCargarDatos() {
	let loadYesOrNo = "";
	let loop = true;

	while (loop == true) {
		loadYesOrNo = prompt("¿Desea utilizar los datos precargados? Ingrese s/n.");
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


function nuevoTema() {
	let descripcion = document.getElementById("temaDesc").value;
	let nombre = document.getElementById("temaNombre").value;

	if (MiSistema.listaTemas.some(tema => tema.nombre == nombre)) {
		alert("¡Este tema ya existe!")
	} else {
		añadirTema(nombre, descripcion)
	}
}


function añadirTema(nombreUsar, descripcionUsar) {
	let nuevoTema = new tema(nombreUsar, descripcionUsar);
	MiSistema.listaTemas.push(nuevoTema)

	let newOption = document.createElement("option");
	let newLi = document.createElement("li");	

	newLi.innerText = nombreUsar;
	newOption.innerText = nombreUsar;

	document.getElementById("pregTema").appendChild(newOption);
	document.getElementById("listaTemas").appendChild(newLi);
	document.getElementById("altaTemas").reset();
}


function nuevaPregunta() {
	let tema = document.getElementById("pregTema").value; 
	let nivel = document.getElementById("pregNivel").value;
	let texto = document.getElementById("pregText").value;
	let correcto = document.getElementById("pregResp").value;
	let incorrecto = document.getElementById("pregIncorr").value;

	if (MiSistema.listaPreguntas.some(tema => tema.texto == texto)) {
		alert("¡Esta pregunta ya existe!")
	} else {
		añadirPregunta(tema, nivel, texto, correcto, incorrecto);
	}
}

function añadirPregunta() {
	let nuevaPregunta = new preguntas(tema, nivel, texto, correcto, incorrecto);
	MiSistema.listaPreguntas.push(nuevaPregunta);

	let newTr = document.createElement("tr");
	let newTemaTd = document.createElement("td");
	let newNivelTd = document.createElement("td");
	let newTextoTd = document.createElement("td");
	let newCorrectoTd = document.createElement("td");
	let newIncorrectoTd = document.createElement("td");

	newTemaTd.innerText = tema;
	newNivelTd.innerText = nivel;
	newTextoTd.innerText = texto;
	newCorrectoTd.innerText = correcto;
	newIncorrectoTd.innerText = incorrecto;

	newTr.appendChild(newTemaTd);
	newTr.appendChild(newNivelTd);
	newTr.appendChild(newTextoTd);
	newTr.appendChild(newCorrectoTd);
	newTr.appendChild(newIncorrectoTd);

	document.getElementById("tablaPreguntas").appendChild(newTr);
	document.getElementById("altaPreg").reset();
}