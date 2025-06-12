class project extends estructura_project {

	constructor() {
		super();
		this.columnasamostrar = ["id_project", "name_project", "start_date_project", "end_date_project", "file_project"];
		this.datosespecialestabla = ["start_date_project", "end_date_project", "file_project"];
		this.dom_validations = new Dom_validations(this.def_test, this);
		this.inicializar();
	}

	mostrardatosespecialesForm(atributo, valoratributo) {
		if (atributo === "start_date_project" || atributo === "end_date_project") {
			let input = document.getElementById(atributo);
			if (input) input.value = this.cambiardatosespecialestabla(atributo, valoratributo);
		}
	}

	cambiardatosespecialestabla(atributo, valoratributo, i) {
		if (atributo === "file_project") {
			if (!valoratributo) return `<a class="no_file_found"></a>`;
			return `
				${valoratributo}
				<a id="link_file_project_${i}" href="http://193.147.87.202/ET2/filesuploaded/files_file_project/${valoratributo}" target="_blank">
					<img id="botonFILE${i}" src="./iconos/FILE.png" width="40px" height="40px"
						onmouseover="changeOnMouseOver(true,'FILE','${i}');"
						onmouseout="changeOnMouseOver(false,'FILE','${i}');" />
				</a>`;
		}

		if (atributo === "start_date_project" || atributo === "end_date_project") {
			const [a, m, d] = valoratributo.split("-");
			return `${d}/${m}/${a}`;
		}

		return valoratributo;
	}

	validacionesespeciales(atributo, prueba) {
		const input = document.getElementById(atributo);
		const valor = input?.value || "";

		if (atributo === "nuevo_file_project" && prueba === "empty") {
			return input?.files.length > 0;
		}

		if (atributo === "start_date_project" || atributo === "end_date_project") {
			if (prueba === "fechavalida") return this.fechaValida(valor);
			if (prueba === "fechaSuperior" && atributo === "start_date_project") {
				const otraFecha = document.getElementById("end_date_project")?.value || "";
				return !otraFecha || this.fechasOrdenadas(valor, otraFecha);
			}
			if (prueba === "fechaInferior" && atributo === "end_date_project") {
				const otraFecha = document.getElementById("start_date_project")?.value || "";
				return !otraFecha || this.fechasOrdenadas(otraFecha, valor);
			}
		}

		return true;
	}

	fechaValida(fecha) {
		const partes = fecha.split("/");
		if (partes.length !== 3) return false;
		const [d, m, a] = partes.map(Number);
		if (!a || m < 1 || m > 12) return false;
		const diasMes = [31, this.esBisiesto(a) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		return d >= 1 && d <= diasMes[m - 1];
	}

	esBisiesto(anio) {
		return (anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0);
	}

	fechasOrdenadas(f1, f2) {
		const [d1, m1, a1] = f1.split("/").map(Number);
		const [d2, m2, a2] = f2.split("/").map(Number);
		if (a1 !== a2) return a1 < a2;
		if (m1 !== m2) return m1 < m2;
		return d1 < d2;
	}
}
