class sistema {
	constructor() {}
}

class tema {
	constructor(nombre, descripcion) {
		this.nombre = nombre;
		this.descripcion = descripcion;
	}
}

class pegunta {
	constructor(texto, respuestaCorrecta, respuestasIncorrectas, nivel, tema) {
		this.texto = texto;
		this.respuestaCorrecta = respuestaCorrecta;
		this.respuestasIncorrectas = respuestasIncorrectas;
		this.nivel = nivel;
		this.tema = tema;
	}
}
