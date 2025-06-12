class Dom extends test_IU {

	constructor() {
		super();
	}

	// --- Método PRINCIPAL para crear formularios ---
	createForm(accion, parametros, entidad) {

		document.getElementById('IU_form').innerHTML = ''; // Limpiar formulario

		// 1. Cargar el formulario (HTML personalizado o dinámico)
		if (typeof entidad.cargar_formulario_html === "function") {
			entidad.cargar_formulario_html();
		} else {
			this.cargar_formulario_dinamico(accion, entidad);
		}

		// 2. Poner título del formulario
		this.ponerTituloForm(accion, entidad);

		// 3. Eliminar campos que no tocan (según acción)
		entidad.constructor_form.eliminarCampos(accion);

		// 4. Si hay parámetros (EDIT, DELETE, SHOWCURRENT), cargar datos
		if (parametros) {
			this.load_data(parametros, entidad);
		}

		// 5. Colocar validaciones si toca (no en DELETE ni SHOWCURRENT)
		if (accion !== "DELETE" && accion !== "SHOWCURRENT") {
			this.colocarvalidaciones(accion);
		}

		// 6. Poner campos readonly o activos según la acción
		entidad.constructor_form.ponernoactivoform(accion);

		// 7. Añadir botón de submit
		this.colocarboton(accion);

		// 8. Poner onsubmit y action
		this.colocarOnSubmitForm(accion);
		this.colocarActionForm(accion);

		// 9. Mostrar el formulario
		document.getElementById("div_IU_form").style.display = "block";

		setLang();
	}


	// --- Método para crear formulario dinámicamente ---
	cargar_formulario_dinamico(accion = "EDIT", entidad) {
		let estructura = entidad["def_html_" + entidad.entidad];
		if (!estructura) {
			alert("Error: no existe definición de formulario para la entidad.");
			return;
		}
		// Crear el constructor_form desde la entidad (no en Dom directamente)
		entidad.constructor_form = new constructor_form(estructura, accion);
		entidad.constructor_form.crearForm();
		if (accion === "SEARCH") {
			entidad.constructor_form.SearchPH();
		}
	}


	load_data(parametros, entidad) {
		console.log("🔍 Datos recibidos para cargar en el formulario:", parametros);

		for (let key in parametros) {
			let elemento = document.getElementById(key);
			console.log(`⤷ Buscando campo: ${key}`, elemento);

			if (elemento && (elemento.tagName === 'INPUT' || elemento.tagName === 'TEXTAREA' || elemento.tagName === 'SELECT')) {
				if (elemento.type === 'checkbox') {
					elemento.checked = parametros[key] === 'true' || parametros[key] === true;
				} else if (elemento.type !== 'file') {
					if (typeof entidad.mostrardatosespecialesForm === "function") {
						const valorTransformado = entidad.mostrardatosespecialesForm(key, parametros[key]);

						// Si devuelve un valor (como para fechas), se usa
						if (valorTransformado !== undefined) {
							elemento.value = valorTransformado;
						} else {
							elemento.value = parametros[key];
						}
					} else {
						elemento.value = parametros[key];
					}

				}
			} else {
				console.warn(`⚠ Campo no encontrado o no compatible: ${key}`);
			}

			if (typeof entidad.change_value_IU === "function") {
				entidad.change_value_IU(key);
			}
		}
	}



	mostrar_error_campo(id, codigoerror) {
		document.getElementById('div_error_' + id).style.display = 'inline';
		document.getElementById('div_error_' + id).innerHTML = codigoerror;
		document.getElementById('div_error_' + id).className = codigoerror;
		document.getElementById(id).className = 'errorcampo';
		document.getElementById(id).focus();
		setLang();
	}

	mostrar_exito_campo(id) {
		document.getElementById('div_error_' + id).style.display = 'none';
		document.getElementById('div_error_' + id).innerHTML = '';
		document.getElementById(id).className = 'exitocampo';
	}

	modificarcolumnasamostrar(atributo) {
		let nuevascolumnas = Array();
		if (this.columnasamostrar.includes(atributo)) { // borrar ese atributo
			for (let i = 0; i < this.columnasamostrar.length; i++) {
				if (this.columnasamostrar[i] != atributo) {
					nuevascolumnas.push(this.columnasamostrar[i]);
				}
			}
			this.columnasamostrar = nuevascolumnas;
		}
		else {// añadir
			this.columnasamostrar.push(atributo);
		}
		this.crearTablaDatos();
	}

	mostrarocultarcolumnas() {
		for (let columna of this.atributos) {
			if (!this.columnasamostrar.includes(columna)) {
				this.cambiacolumnastabla(columna);
				let arraytds = document.querySelectorAll("td[class='tabla-td-" + columna + "']");
				for (let i = 0; i < arraytds.length; i++) {
					arraytds[i].style.display = 'none';
				}
			}
		}
	}

	cambiacolumnastabla(atributo) {
		document.querySelector("th[class='" + atributo + "']").style.display = 'none';
	}

	crearTablaDatos() {
		document.getElementById("id_tabla_datos").style.display = 'block';

		this.hacertabla();

		this.hacerPaginacion();

		this.construirSelect();

		if (this.datos != "") { this.mostrarocultarcolumnas() };
	}


	construirSelect() {
		document.getElementById("seleccioncolumnas").innerHTML = '';
		let optionselect = '';
		for (let atributo of this.atributos) {
			optionselect = document.createElement('option');
			optionselect.className = atributo;
			optionselect.innerHTML = atributo;
			optionselect.setAttribute("onclick", "validar.modificarcolumnasamostrar('" + atributo + "');");
			optionselect.selected = this.columnasamostrar.includes(atributo);
			document.getElementById("seleccioncolumnas").append(optionselect);
		}
		setLang();
	}


	hacertabla() {

		document.getElementById("text_title_page").className = "text_titulo_page_" + this.entidad;
		document.getElementById('title_page').style.display = 'block';

		if (this.datos == "") { //No hay datos
			document.getElementById("id_tabla_datos").style.display = 'block';
			document.getElementById('titulostablacabecera').innerHTML = '';
			document.getElementById('muestradatostabla').innerHTML = '';
			document.getElementById('muestradatostabla').className = 'RECORDSET_VACIO';
		}
		else {
			var textolineatitulos = '<tr>';
			for (let atributo of this.atributos) {
				textolineatitulos += '<th class="' + atributo + '">' + atributo + '</th>';
			}

			textolineatitulos += '<th colspan="3"></th>';

			textolineatitulos += '</tr>';

			let cabecera = document.getElementById("titulostablacabecera");
			cabecera.innerHTML = textolineatitulos;

			// filas

			var textolineadatos = '';

			for (let i = 0; i < this.datos.length; i++) {

				textolineadatos += '<tr style="background-color:grey;">';

				for (let clave in this.datos[i]) {
					let valorcolumna;
					if (this.datosespecialestabla.includes(clave)) {
						valorcolumna = this.cambiardatosespecialestabla(clave, this.datos[i][clave], i);
					}
					else {
						// limpieza codigo no deseado incrustado html y script
						let san = (obj) => {
							let value = obj?.toString() || '';
							let sanitizedObj = value.replace(/[&<>"'`]/g, function (match) {
								switch (match) {
									case '&': return '&amp;';
									case '<': return '&lt;';
									case '>': return '&gt;';
									case '"': return '&quot;';
									case "'": return '&#039;';
									case '`': return '&#x60;';
								}
							});
							return sanitizedObj;
						}
						valorcolumna = san(this.datos[i][clave]);
					}
					textolineadatos += '<td class="tabla-td-' + clave + '">' + valorcolumna + '</td>';

				}
				// crear los td para cada boton de llamada a funcion de formulario de accion (EDIT, DELETE O SHOWCURRENT)
				let lineaedit = this.crearboton('EDIT', JSON.stringify(this.datos[i]), i);
				let lineadelete = this.crearboton('DELETE', JSON.stringify(this.datos[i]), i);
				let lineashowcurrent = this.crearboton('SHOWCURRENT', JSON.stringify(this.datos[i]), i);

				textolineadatos += lineaedit + lineadelete + lineashowcurrent;
				textolineadatos += '</tr>';

			}
			let cuerpo = document.getElementById('muestradatostabla');
			cuerpo.innerHTML = textolineadatos;
		}
		setLang();
	}

	hacerPaginacion() {
		if (this.datos != "") { //hay datos
			this.levantarPaginacion();
		}
		else {
			document.getElementById("preposicionPag").style.visibility = "hidden";
			document.getElementById("PaginaActual").innerHTML = "";
			document.getElementById("FilasTotales").innerHTML = "";
			document.getElementById("botonANT").style.visibility = "hidden";
			document.getElementById("botonSIG").style.visibility = "hidden";
		}
	}

	levantarPaginacion() {
		document.getElementById("preposicionPag").style.visibility = "visible";

		let filaFinal = parseInt(this.tamPagina) + parseInt(this.empiezaFila);
		if (filaFinal > this.filasTotales) filaFinal = this.filasTotales;
		document.getElementById("PaginaActual").innerHTML = this.empiezaFila + "-" + filaFinal + " ";
		document.getElementById("FilasTotales").innerHTML = " " + this.filasTotales;
		if (this.empiezaFila > 0) { //hay pagina menor al haber tuplas sin mostrar
			let filaInicial = parseInt(this.empiezaFila) - parseInt(this.tamPagina);
			if (filaInicial < 0) filaInicial = 0;
			let textoonclick = "validar.SEARCH(" + filaInicial + ");"
			document.getElementById("botonANT").setAttribute('onclick', textoonclick);
			document.getElementById("botonANT").style.visibility = "visible";
		} else {
			document.getElementById("botonANT").style.visibility = "hidden";
		}
		if (filaFinal < this.filasTotales) { //hay pagina mayor
			let textoonclick = "validar.SEARCH(" + filaFinal + ");"
			document.getElementById("botonSIG").setAttribute('onclick', textoonclick);
			document.getElementById("botonSIG").style.visibility = "visible";
		} else {
			document.getElementById("botonSIG").style.visibility = "hidden";
		}
	}

	crearboton(accion, parametros, i = "") {
		let columna = document.createElement('td');
		let opcion = document.createElement('img');
		const body = document.body;

		opcion.src = `./iconos/` + accion + `.png`;

		opcion.id = "boton" + accion + i;
		let textoonclick = "validar.createForm('" + accion + "'," + parametros + ");"
		opcion.setAttribute('onclick', textoonclick);
		opcion.setAttribute('onmouseover', `changeOnMouseOver(true,"` + accion + `","` + i + `");`);
		opcion.setAttribute('onmouseout', `changeOnMouseOver(false, "` + accion + `","` + i + `");`);
		opcion.style.width = '40px';
		opcion.style.height = '40px';
		columna.appendChild(opcion);
		return columna.outerHTML;
	}

	cerrar_formulario() {
		document.getElementById("IU_form").innerHTML = '';
		document.getElementById("IU_form").setAttribute('onsubmit', "");
		document.getElementById("IU_form").setAttribute('action', "");
		document.getElementById("div_IU_form").style.display = 'none';
	}

	cerrar_test() {
		document.getElementById('div_IU_test').style.display = 'none'; //Para ocultarlo
		//Para limpiarlo
		document.getElementById('resultadodef').innerHTML = '';
		document.getElementById('tablaresultadostest').innerHTML = '';
		document.getElementById('resultadoprueba').innerHTML = '';
		document.getElementById('tablaresultadosprueba').innerHTML = '';
		document.getElementById('resultadotest').innerHTML = '';
		document.getElementById('salidaresultadosprueba').innerHTML = '';
		document.getElementById('modal_action_overlay').style.display = 'none';

		document.querySelectorAll("#tabladatosalumnos img").forEach(btn => btn.onclick = null);

	}

	cerrar_tabla() {
		const ids = [
			"titulostablacabecera",
			"muestradatostabla",
			"id_tabla_datos",
			"title_page",
			"divTablasDatosEntrega",
			"textoInicio"
		];

		ids.forEach(id => {
			const element = document.getElementById(id);
			if (element) {
				switch (id) {
					case "titulostablacabecera":
					case "muestradatostabla":
						element.innerHTML = '';
						break;
					case "id_tabla_datos":
					case "title_page":
						element.style.display = 'none';
						break;
					case "divTablasDatosEntrega":
					case "textoInicio":
						element.style.display = "block";
						break;
				}
			}
		});

		this.ocultar_boton_test();
		this.cerrar_test();
		validar.inicializar(false);
		this.mostrar_boton_test();
	}


	ocultar_boton_test() {
		document.getElementById('botonTEST').style.display = 'none';
	}

	mostrar_boton_test() {
		document.getElementById('botonTEST').style.display = 'inline';
	}

	abrirModalError(errorMsg) {
		document.getElementById('error_action_modal').style.display = 'block';
		document.getElementById('modal_action_overlay').style.display = 'block';
		document.getElementById('error_action_msg').className = errorMsg;
		setLang();
	}

	cerrarModalError() {
		document.getElementById('error_action_modal').style.display = 'none';
		document.getElementById('modal_action_overlay').style.display = 'none';
	}

	inicializar(ejecutarSearch = true) {
		document.getElementById("divTablasDatosEntrega").style.display = "none";


		if (eval(this.datosespecialestabla) == undefined) {
			this.datosespecialestabla = Array();
		}
		if (eval(this.columnasamostrar) == undefined) {
			this.columnasamostrar = Array();
		}
		this.access_functions = new ExternalAccess();
		this.validaciones = new Validaciones_Atomicas();
		this.constructor_form = new constructor_form(eval("this.def_html_" + this.entidad));
		this.dom_validations = new Dom_validations(eval("this.def_test_" + this.entidad), this);
		this.colocador_valores = new colocador_valores(eval("this.def_html_" + this.entidad), this);

		this.cerrar_test()
		if (ejecutarSearch) {
			this.SEARCH();
		}
	}



	ponerTituloForm(accion) {
		document.getElementById('class_contenido_titulo_form').className = 'text_contenido_titulo_form_' + this.entidad + '_' + accion;
	}

	eliminarCamposForm(accion) {
		this.constructor_form.eliminarCampos(accion);
	}

	mostrarAtributosForm(accion, parametros) { //borrar el de clase entidad
		if (accion == "SHOWCURRENT" || accion == "DELETE" || accion == "EDIT") {
			this.colocador_valores.colocarValoresForm(parametros);
		}
	}

	colocarvalidaciones(accion) {
		if (accion != "DELETE" && accion != "SHOWCURRENT") {
			let evento;
			//obtener campos del formulario
			let campos = document.forms['IU_form'].elements;
			//recorrer todos los campos
			for (let i = 0; i < campos.length; i++) {
				if (document.getElementById(campos[i].id).tagName == 'TEXTAREA' || ((document.getElementById(campos[i].id).tagName == 'INPUT') && (document.getElementById(campos[i].id).type !== 'file'))) {
					evento = 'onblur';
				}
				else {
					evento = 'onchange';
				}
				document.getElementById(campos[i].id).setAttribute(evento, 'validar.comprobar("' + campos[i].id + '","' + accion + '");');
			}
		}
	}

	comprobar(id, accion) {
		return this.dom_validations.check(id, accion);
	}

	ponernoactivo(accion) {
		this.constructor_form.ponernoactivoform(accion);
	}

	colocarboton(accion) {
		if (accion != "SHOWCURRENT") {
			//Crea un div para el boton y lo appendea al form
			let divboton = document.createElement('div');
			divboton.id = 'div_boton';
			document.getElementById('IU_form').append(divboton);
			//crea el boton como tipo submit
			let boton = document.createElement('button');
			boton.id = 'submit_button';
			boton.type = 'submit';
			//Crea la imagen de la accion, la añade al boton, y añade el boton al div en el formulario
			let img = document.createElement('img');
			img.src = './iconos/' + accion + '.png';
			boton.append(img);
			document.getElementById('div_boton').append(boton);
			document.getElementById('IU_form').append(document.createElement("br"));
			document.getElementById('IU_form').append(document.createElement("br"));

		}
	}

	colocarOnSubmitForm(accion) {
		switch (accion) {
			case 'EDIT':
			case 'ADD':
			case 'SEARCH':
				document.getElementById("IU_form").setAttribute('onsubmit', 'return validar.comprobar_submit("' + accion + '");');
				break;
			case 'DELETE':
			case 'SHOWCURRENT':
				document.getElementById("IU_form").setAttribute('onsubmit', "return true;");
				break;
			default:
				break;
		}
	}

	comprobar_submit(accion) {
		return this.dom_validations.submit_test(accion);
	}

	colocarActionForm(accion) {
		if (accion != "SHOWCURRENT") document.getElementById("IU_form").setAttribute('action', "javascript:validar." + accion + "();");
	}

	mostrarForm() {
		document.getElementById("div_IU_form").style.display = 'block';
	}


	async SEARCH(empieza = 0, filas = 25) {
		let datosextra = { "empieza": empieza, "filaspagina": filas };
		await this.access_functions.back_request('IU_form', this.entidad, 'SEARCH', datosextra)
			.then((respuesta) => {
				this.createForm('SEARCH', null, this);
				document.getElementById("div_IU_form").style.display = 'none';
				document.getElementById('muestradatostabla').removeAttribute('class');
				this.empiezaFila = respuesta['empieza'];
				this.tamPagina = datosextra["filaspagina"];
				this.filasTotales = respuesta['total'];
				this.datos = respuesta['resource'];
				this.atributos = Object.keys(respuesta['criteriosbusqueda']);
				this.crearTablaDatos();
				setLang();
			});
	}

	async ADD() {
		await this.access_functions.back_request('IU_form', this.entidad, 'ADD')
			.then((respuesta) => {
				this.actuarRespuesta(respuesta);
			});
	}


	async DELETE() {
		await this.access_functions.back_request('IU_form', this.entidad, 'DELETE')
			.then((respuesta) => this.actuarRespuesta(respuesta))
			.catch(err => {
				console.error("Error inesperado tras DELETE:", err);
				this.abrirModalError("ERROR_INTERNO_DELETE");
			});
	}

	async EDIT() {
		const form = new FormData(document.getElementById("IU_form"));

		await this.access_functions.back_request('IU_form', this.entidad, 'EDIT')
			.then((respuesta) => {
				this.actuarRespuesta(respuesta);
			});
	}

	actuarRespuesta(respuesta) {
		if (respuesta?.ok) {
			// Espera un tick del event loop antes de rehacer el DOM
			setTimeout(() => {
				this.createForm("SEARCH", null, this);
				document.getElementById("div_IU_form").style.display = 'none';
				this.SEARCH(this.empiezaFila, this.tamPagina);
			}, 0);
		} else {
			this.abrirModalError(respuesta?.code || "ERROR_INESPERADO");
		}
	}





}
