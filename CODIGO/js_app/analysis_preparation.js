class analysis_preparation extends estructura_analysis_preparation {

	constructor() {
		super();

		this.entidad = "analysis_preparation";
		this.def_html_analysis_preparation = estructura_analysis_preparation_def;
		this.columnasamostrar = [
			"id_analysis_preparation",
			"name_analysis_preparation",
			"file_analysis_preparation"
		];
		this.datosespecialestabla = ["file_analysis_preparation"];
		this.dom_validations = new Dom_validations(this.def_test, this);

		this.inicializar();
	}

	check_special_nuevo_file_analysis_preparation(valor, accion) {
		const input = document.getElementById("nuevo_file_analysis_preparation");
		return input?.files.length > 0;
	}


	cambiardatosespecialestabla(atributo, valoratributo, i) {
		if (atributo === "file_analysis_preparation") {
			if (valoratributo === "") return `<a class="no_file_found"></a>`;
			return `
				${valoratributo}
				<a id="link_file_analysis_preparation_${i}" href="http://193.147.87.202/ET2/filesuploaded/files_file_analysis_preparation/${valoratributo}" target="_blank">
					<img id="botonFILE${i}" src="./iconos/FILE.png" width="40px" height="40px"
						onmouseover="changeOnMouseOver(true, 'FILE', '${i}');"
						onmouseout="changeOnMouseOver(false, 'FILE', '${i}');" />
				</a>`;
		}
	}
}
