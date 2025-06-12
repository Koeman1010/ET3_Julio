class characteristic extends estructura_characteristic {

	constructor() {
		super();
		this.columnasamostrar = ["id_characteristic", "name_characteristic", "data_type_characteristic", "category_characteristic", "file_characteristic"];
		this.datosespecialestabla = ["file_characteristic"];
		this.dom_validations = new Dom_validations(this.def_test, this);

		this.inicializar();
	}

	cambiardatosespecialestabla(atributo, valoratributo, i) {
		if (atributo === 'file_characteristic') {
			if (valoratributo === '') return `<a class="no_file_found"></a>`;
			return `
				${valoratributo}
				<a id="link_file_characteristic_${i}" href="http://193.147.87.202/ET2/filesuploaded/files_file_characteristic/${valoratributo}" target="_blank">
					<img id="botonFILE${i}" src="./iconos/FILE.png" width="40px" height="40px"
						onmouseover="changeOnMouseOver(true,'FILE','${i}');"
						onmouseout="changeOnMouseOver(false,'FILE','${i}');" />
				</a>`;
		}
	}

	validacionesespeciales(atributo, prueba) {
		if (atributo === 'nuevo_file_characteristic' && prueba === 'empty') {
			const input = document.getElementById(atributo);
			return input?.files.length > 0;
		}

		if (atributo === 'data_type_characteristic' || atributo === 'category_characteristic') {
			const valores = [...this.def_html_characteristic[atributo].valores];
		 if (prueba === 'selectValido') {
				return valores.includes(document.getElementById(atributo)?.value);
			}
			if (prueba === 'selectValidoSEARCH') {
				valores.push('');
				return valores.includes(document.getElementById(atributo)?.value);
			}
		}

		return true;
	}
}
