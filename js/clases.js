class sistema {
	constructor() {
		this.listaTemas = [];
		this.listaPreguntas = [];
		this.listaPuntuaciones = [];
	}

	hayTemas() {
		return this.listaTemas.length != 0;
	}

	hayPreguntas() {
		return this.listaPreguntas.length != 0;
	}

	hayPuntuaciones() {
		return this.listaPuntuaciones.length != 0;
	}

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
			alert(
				"¡No se puede añadir el tema! Alguno de los valores ingresados es nulo."
			);
		} else if (repetido == true) {
			alert(
				"¡No se puede añadir el tema! Ya existe un tema con este nombre."
			);
		} else {
			let nuevoTema = new tema(useNombre, useDescripcion, newColor);
			this.listaTemas.push(nuevoTema);
			exito = true;
		}

		return exito;
	}

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

		for (let i = 0; i < this.listaPreguntas.length && repetido == false && vacio == false; i++) {
			if (this.listaPreguntas[i].texto == useTexto) {
				repetido = true;
			}
		}

		if (vacio == true) {
			alert(
				"¡No se puede añadir la pregunta! No se ha ingresado uno de los datos requeridos."
			);
		} else if (repetido == true) {
			alert(
				"¡No se puede añadir la pregunta! Ya existe una pregunta con este texto."
			);
		} else if (nivel == false) {
			alert(
				"¡No se puede añadir la pregunta! El nivel ingresado debe ser entre 1 y 5."
			);
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
				alert ("¡No se puede añadir la pregunta! La respuesta correcta esta tambien entre las incorrectas.")
			} else {
				let nuevaPregunta = new pregunta(
					useTexto,
					useRespuestaC,
					useRespuestaILista,
					useNivel,
					useTema
				);
				this.listaPreguntas.push(nuevaPregunta);
				exito = true;
			}
		}

		return exito;
	}

	agregarPuntuacion(usePuntuacion) {
		this.listaPuntuaciones.push(usePuntuacion);
	}

	contarPreguntas() {
		return this.listaPreguntas.length;
	}

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

	promedioPuntuaciones() {
		let promedio = 0;

		for (i = 0; i < this.listaPuntuaciones.length; i++) {
			promedio += parseInt(this.listaPuntuaciones[i]);
		}

		promedio = promedio / this.listaPuntuaciones.length;
		return Number.parseFloat(promedio).toFixed(2);
	}

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
		return "Nombre: " + this.nombre + " Descripcion: " + this.descripcion;
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
		return (
			"Texto: " +
			this.texto +
			" Respuesta Correcta: " +
			this.respuestaCorrecta +
			" Respuestas Incorrectas: " +
			this.respuestasIncorrectas +
			" Nivel: " +
			this.nivel +
			" Tema: " +
			this.tema
		);
	}
}
