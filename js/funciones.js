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
		newOption.setAttribute("value", temas[i]);
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
	let newTema = document.getElementById("pregTema").value;

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
	}
}

function actualizarPreguntas() {}
