/* 
    Elena Couste - 333562
    Martin Valetta - 251093
*/
class sistema {
	constructor() {
		this.listaTemas = [];
		this.listaPreguntas = [];
		this.listaPuntuaciones = [];
	}

	// Devuelve true unicamente si existe algun tema ya creado.
	hayTemas() {
		return this.listaTemas.length != 0;
	}

	// Devuelve true unicamente si existe alguna pregunta ya creada.
	hayPreguntas() {
		return this.listaPreguntas.length != 0;
	}

	// Devuelve true unicamente si existe alguna puntuacion ya ingresada.
	hayPuntuaciones() {
		return this.listaPuntuaciones.length != 0;
	}

	// Agrega un tema nuevo a la lista de temas, primero verificando que este tema no se encutentre repetido y todos sus valores ingresados sean validos.
	// Retorna true o false como medio de identificacion de si se pudo crear o no el tema.
	agregarTema(useNombre, useDescripcion, newColor) {
		let exito = false;
		let repetido = false;
		let vacio = false;

		if (useNombre.length == 0 || useDescripcion.length == 0) {
			vacio = true;
		}

		for (
			let i = 0;
			i < this.listaTemas.length && repetido == false && vacio == false;
			i++
		) {
			if (this.listaTemas[i].nombre == useNombre) {
				repetido = true;
			}
		}

		if (vacio == true) {
			alert("¡No se puede añadir el tema! Alguno de los valores ingresados es nulo.");
		} else if (repetido == true) {
			alert("¡No se puede añadir el tema! Ya existe un tema con este nombre.");
		} else {
			let nuevoTema = new tema(useNombre, useDescripcion, newColor);
			this.listaTemas.push(nuevoTema);
			exito = true;
		}

		return exito;
	}

	// Verifica que todos los datos de las preguntas ingresadas sean validos, y en caso en que asi sea crea una nueva pregunta, separando el string de respuestas incorrectas en un array en el que cada coma separa un valor de otro, y se recortan los espacios al principio y final de cada uno.
	// Retorna true o false como medio de identificacion de si se pudo crear o no el tema.
	agregarPregunta(useTexto, useRespuestaC, useRespuestaI, useNivel, useTema) {
		let exito = false;
		let repetido = false;
		let vacio = false;
		let nivel = true;

		if (
			useTexto.length == 0 ||
			useRespuestaC.length == 0 ||
			useRespuestaI.length == 0 ||
			useNivel.toString().length == 0 ||
			useTema.length == 0
		) {
			vacio = true;
		}

		if (useNivel < 1 || useNivel > 5) {
			nivel = false;
		}

		for (
			let i = 0;
			i < this.listaPreguntas.length &&
			repetido == false &&
			vacio == false;
			i++
		) {
			if (this.listaPreguntas[i].texto == useTexto) {
				repetido = true;
			}
		}

		if (vacio == true) {
			alert("¡No se puede añadir la pregunta! No se ha ingresado uno de los datos requeridos.");
		} else if (repetido == true) {
			alert("¡No se puede añadir la pregunta! Ya existe una pregunta con este texto.");
		} else if (nivel == false) {
			alert("¡No se puede añadir la pregunta! El nivel ingresado debe ser entre 1 y 5.");
		} else {
			let useRespuestaILista = [];
			let found = true;
			while (found == true) {
				if (useRespuestaI.includes(",")) {
					let index = useRespuestaI.indexOf(",");
					let pushRespuesta = useRespuestaI.slice(0, index);
					pushRespuesta = pushRespuesta.trim();
					useRespuestaILista.push(pushRespuesta);
					useRespuestaI = useRespuestaI.slice(index + 1);
				} else {
					useRespuestaI = useRespuestaI.trim();
					useRespuestaILista.push(useRespuestaI);
					found = false;
				}
			}

			if (useRespuestaILista.includes(useRespuestaC)) {
				alert("¡No se puede añadir la pregunta! La respuesta correcta esta tambien entre las incorrectas.");
			} else {
				let nuevaPregunta = new pregunta(useTexto, useRespuestaC, useRespuestaILista, useNivel, useTema);
				this.listaPreguntas.push(nuevaPregunta);
				exito = true;
			}
		}

		return exito;
	}

	// Añade una nueva puntuacion a la lista de puntuaciones.
	agregarPuntuacion(usePuntuacion) {
		this.listaPuntuaciones.push(usePuntuacion);
	}

	// Cuenta la cantidad de preguntas utilizando length para medir listaPreguntas[]
	contarPreguntas() {
		return this.listaPreguntas.length;
	}

	// Ordena las preguntas por tema alfabeticamente, y en caso en que tengan el mismo tema ordena por nivel de mayor a menor.
	sortPreguntasTemaCrec() {
		this.listaPreguntas.sort(function (a, b) {
			let temaA = a.tema.nombre.toString();
			let temaB = b.tema.nombre.toString();
			let ret = temaA.localeCompare(temaB);
			if (ret == 0) {
				ret = a.nivel - b.nivel;
			}
			return ret;
		});
	}

	// Ordena las preguntas por tema de forma inversamente alfabetica, y en caso en que tengan el mismo tema ordena por nivel de mayor a menor.
	sortPreguntasTemaDecr() {
		this.listaPreguntas.sort(function (a, b) {
			let temaA = a.tema.nombre.toString();
			let temaB = b.tema.nombre.toString();
			let ret = temaB.localeCompare(temaA);
			if (ret == 0) {
				ret = a.nivel - b.nivel;
			}
			return ret;
		});
	}

	// Calcula el promedio de todas las puntuaciones en listaPuntuaciones con dos digitos despues de la coma.
	promedioPuntuaciones() {
		let promedio = 0;

		for (i = 0; i < this.listaPuntuaciones.length; i++) {
			promedio += parseInt(this.listaPuntuaciones[i]);
		}

		promedio = promedio / this.listaPuntuaciones.length;
		return Number.parseFloat(promedio).toFixed(2);
	}

	// Crea y retorna una lista de temas que contiene unicamente los temas que son utilizados en alguna pregunta.
	listarTemasConPreguntas() {
		let temas = [];

		for (let question of this.listaPreguntas) {
			if (temas.includes(question.tema) == false) {
				temas.push(question.tema);
			}
		}

		return temas;
	}
}

class tema {
	constructor(nombre, descripcion, color) {
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.color = color;
	}

	toString() { 
		return this.nombre + ": " + this.descripcion;
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
		return ("Texto: " + this.texto + " Respuesta Correcta: " + this.respuestaCorrecta + " Respuestas Incorrectas: " + this.respuestasIncorrectas + " Nivel: " + this.nivel + " Tema: " + this.tema);
	}
}
