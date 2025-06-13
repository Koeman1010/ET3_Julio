class Dom_validations {

	constructor(def_test, entidad) {
		this.def_test = def_test;
		this.entidad = entidad;
		this.validar = new Validaciones_Atomicas();
	}

	load_validations(accion) {
		let formulario = document.getElementById("IU_form");
		let campos = formulario.elements;

		for (let i = 0; i < campos.length; i++) {
			let campo = campos[i];

			if (campo.tagName === "TEXTAREA" || (campo.tagName === "INPUT" && campo.type !== "file")) {
				campo.onblur = () => { this.check(campo.id, accion); };
			} else if (campo.tagName === "SELECT" || (campo.tagName === "INPUT" && campo.type === "file")) {
				campo.onchange = () => { this.check(campo.id, accion); };
			}
		}
	}


	submit_test(accion) {
		let formulario = document.getElementById("IU_form");
		let campos = formulario.elements;
		let correcto = true;

		for (let i = 0; i < campos.length; i++) {
			let campo = campos[i];
			if (campo.tagName === "INPUT" || campo.tagName === "TEXTAREA" || campo.tagName === "SELECT") {
				if (!this.check(campo.id, accion)) {
					correcto = false;
				}
			}
		}

		if (!this.check_special_tests(accion)) {
			correcto = false;
		}

		return correcto;
	}


	check(idCampo, accion) {
		let input = document.getElementById(idCampo);
		if (!input) return false;

		// caso especial: input file vacío en EDIT se considera válido
		if (
			accion === "EDIT" &&
			input.tagName === "INPUT" &&
			input.type === "file" &&
			"files" in input &&
			input.files.length === 0
		) {
			return true;
		}


		let estructura = this.def_test[accion]?.[idCampo];
		console.log("def_test cargado:", this.def_test);

		if (!estructura) return true;

		for (let test in estructura) {
			let regla = estructura[test];

			if (regla.especial) {
				if (!this.entidad.validacionesespeciales(idCampo, regla.valor)) {
					this.entidad.mostrar_error_campo(idCampo, regla.codigo);
					return false;
				}
			} else {
				if (typeof this.validar[test] !== "function") {
					console.error(`❌ La validación '${test}' no está implementada en Validaciones_Atomicas`);
					continue; // o return false si quieres bloquear el submit
				}

				if (!this.validar[test](idCampo, regla.valor)) {
					this.entidad.mostrar_error_campo(idCampo, regla.codigo);
					return false;
				}
			}
		}

		this.entidad.mostrar_exito_campo(idCampo);
		return true;
	}

	/** Valida campos con funciones personalizadas de la entidad */
	check_special_tests(accion) {
		let formulario = document.getElementById("IU_form");
		let campos = formulario.elements;
		let correcto = true;

		for (let i = 0; i < campos.length; i++) {
			let campo = campos[i];
			let nombreFuncion = "check_special_" + campo.id;

			if (typeof this.entidad[nombreFuncion] === 'function') {
				if (!this.entidad[nombreFuncion](campo.value, accion)) {
					correcto = false;
				}
			}
		}

		return correcto;
	}


}
