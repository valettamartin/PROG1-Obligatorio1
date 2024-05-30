window.addEventListener("load", innit);

function innit() {
	//deseaCargarDatos();
	let info = document.getElementById("irInfo");
	let admin = document.getElementById("irAdmin");
	let jugar = document.getElementById("irJugar");
	info.addEventListener("click", () => divManager(info));
	admin.addEventListener("click", () => divManager(admin));
	jugar.addEventListener("click", () => divManager(jugar));
	document.getElementById("agregarTema").addEventListener("click", nuevoTema);
}

function deseaCargarDatos() {
	let loadYesOrNo = "";
	let loop = true;
	while (loop == true) {
		loadYesOrNo = prompt("¿Desea cargar datos? Ingrese s/n.");
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
	let descripcion = document.getElementById("temaDesc");
	let nombre = document.getElementById("temaNombre");
	let nuevoTema = new tema(nombre, descripcion);
}
