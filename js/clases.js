export class sistema {
	constructor() {}
}

export class tema {
	constructor(nombre, nivel) {
		this.nombre = nombre;
		this.nivel = nivel;
	}
}

export class pegunta {
	constructor(pregunta, correcta, incorrecta) {
		this.pregunta = pregunta;
		this.correcta = correcta;
		this.incorrecta = incorrecta;
	}
}
