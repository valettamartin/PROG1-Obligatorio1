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

	document.getElementById("agregarTema").addEventListener("click",agregarTema)
	document.getElementById("agregarPreg").addEventListener("click",agregarPregunta)
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
	let newNombre = document.getElementById("temaNombre").value
	let newDescripcion = document.getElementById("temaDesc").value

	MiSistema.agregarTema(newNombre, newDescripcion);
	document.getElementById("altaTemas").reset()
}

function agregarPregunta() {
	let newTexto = document.getElementById("pregText").value;
	let newRespuestaC = document.getElementById("pregResp").value;
	let newRespuestaI = document.getElementById("pregIncorr").value;
	let newNivel = document.getElementById("pregNivel");
}