class sistema {
	constructor() {
		this.listaTemas = [];
		this.listaPreguntas = [];
	}
}

class tema {
	constructor(nombre, descripcion) {
		this.nombre = nombre;
		this.descripcion = descripcion;
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
}
