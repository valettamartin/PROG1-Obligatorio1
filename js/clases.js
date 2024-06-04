class sistema {

	constructor() {
		this.listaTemas = [];
		this.listaPreguntas = [];
	}

	hayTemas() {
		return this.listaTemas.length = 0
	}

	hayPreguntas() {
		return this.listaPreguntas.length = 0
	}

	agregarTema(useNombre, useDescripcion) {

		let repetido = false;
		let vacio = false;

		if ((useNombre.length == 0) || (useDescripcion.length == 0)) {
			vacio = true;
		}

		for (i=0 ; (i<this.listaTemas.length) && (repetido == false) && (vacio == false) ; i++) {
			if (this.listaTemas[i].nombre == useNombre) {
				repetido = true;
			}
		}

		if (vacio == true) {
			alert ("¡No se puede añadir el tema! Alguno de los valores ingresados es nulo.");
		} else if (repetido == true) {
			alert ("¡No se puede añadir el tema! Ya existe un tema con este nombre.");
		} else {
			let nuevoTema = new tema(useNombre, useDescripcion);
			this.listaTemas.push(nuevoTema);
		}
	}

	agregarPregunta(useTexto, useRespuestaC, useRespuestaI, useNivel, useTema) {

		let repetido = false;
		let vacio = false;
		let valido = true;
		let nivel = true;

		if (useRespuestaI.includes(useRespuestaC)) {
			valido = false;
		}

		if ((useTexto.length == 0) || (useRespuestaC.length == 0) || (useRespuestaI.length == 0) || (useNivel.toString().length == 0) || (useTema.length == 0)) {
			vacio = true;
		}

		if ((useNivel < 1 ) || (useNivel > 5)) {
			nivel = false;
		}

		for (i=0 ; (i<this.listaPreguntas.length) && (repetido == false) && (valido == true) && (vacio == false); i++) {
			if (this.listaPreguntas[i].texto == useTexto) {
				repetido = true;
			}
		}

		if (valido == false) {
			alert ("¡No se puede añadir la pregunta! La respuesta correcta esta tambien entre las incorrectas.")
		} else if(vacio == true) {
			alert ("¡No se puede añadir la pregunta! No se ha ingresado uno de los datos requeridos.")
		} else if(repetido == true) {
			alert ("¡No se puede añadir la pregunta! Ya existe una pregunta con este texto.")
		} else if(nivel == false) {
			alert ("¡No se puede añadir la pregunta! El nivel ingresado debe ser entre 1 y 5.")
		} else {
			let nuevaPregunta = new pregunta(useTexto, useRespuestaC, useRespuestaI, useNivel, useTema);
			this.listaPreguntas.push(nuevaPregunta);
		}

	}

	sortPreguntasTemaCrNivelCr() {}

	sortPreguntasTemaDeNivelCr() {}

}


class tema {

	constructor(nombre, descripcion) {
		this.nombre = nombre;
		this.descripcion = descripcion;
	}

	toString() {
		return "Nombre: " + this.nombre + " Descripcion: " + this.descripcion
	}

}


class pregunta {

	constructor(texto, respuestaCorrecta, respuestasIncorrectas, nivel, tema) {
		this.texto = texto;
		this.respuestaCorrecta = respuestaCorrecta;
		this.respuestasIncorrectas = respuestasIncorrectas;
		this.nivel = nivel;
		this.tema = tema;
	}

	toString() {
		return "Texto: " + this.texto + " Respuesta Correcta: " + this.respuestaCorrecta + " Respuestas Incorrectas: " + this.respuestasIncorrectas + " Nivel: " + this.nivel + " Tema: " + this.tema
	}

}
