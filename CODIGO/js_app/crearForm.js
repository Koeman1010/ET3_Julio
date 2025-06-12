class constructor_form {

    constructor(estructura, accion = "EDIT") {
        this.def_html = estructura;
        this.accion = accion;
    }


    crearForm() {
        console.log("🛠️ Creando formulario con campos:", this.def_html.columnas_modificadas_tabla);

        let formulario = document.getElementById("IU_form");
        formulario.appendChild(document.createElement("br"));
        formulario.appendChild(document.createElement("br"));

        for (let atributo of this.def_html.columnas_modificadas_tabla) {
            this.crearFormAtributo(atributo);
            formulario.appendChild(document.createElement("br"));
            formulario.appendChild(document.createElement("br"));
        }
    }



    crearFormAtributo(atributo) {
        let formulario = document.getElementById("IU_form");
        let datos = this.def_html.attributes[atributo];

        if (!datos) {
            console.warn("No hay datos para el atributo:", atributo);
            return;
        }

        // ✅ PRIMERO definimos correctamente el html activo para la acción
        let definicion_html = datos.html_por_accion?.[this.accion] ?? datos.html;

        if (!definicion_html) {
            console.warn("No hay html para la acción:", this.accion, "en el atributo:", atributo);
            return;
        }

        if (!definicion_html.tag) {
            console.warn("No hay tag en el html para:", atributo);
            return;
        }


        datos.html = definicion_html;


        switch (definicion_html.tag.toUpperCase()) {
            case "INPUT":
                this.crearInput(datos, atributo);
                break;
            case "TEXTAREA":
                formulario.appendChild(this.crearLabel(atributo));
                formulario.appendChild(this.crearTextarea(datos, atributo));
                formulario.appendChild(this.crearSpanError(atributo));
                break;
            case "SELECT":
                formulario.appendChild(this.crearLabel(atributo));
                formulario.appendChild(this.crearSelect(datos, atributo));
                formulario.appendChild(this.crearSpanError(atributo));
                break;
            default:
                console.warn(`Elemento desconocido en '${atributo}':`, definicion_html);
                break;
        }
    }



    crearInput(datos, atributo) {
        let formulario = document.getElementById("IU_form");
        const tipo = datos.html?.type || "text";

        if (tipo === "file") {
            // 📌 Si estamos en EDIT, mostramos el archivo actual como textarea
            if (this.accion === "EDIT") {
                formulario.appendChild(this.crearLabel(atributo));

                let textArea = document.createElement("textarea");
                textArea.setAttribute("id", atributo);
                textArea.setAttribute("name", atributo);
                textArea.className = "PH_" + atributo;
                textArea.setAttribute("rows", 2);
                textArea.setAttribute("cols", 50);
                textArea.readOnly = true;
                formulario.appendChild(textArea);
                formulario.appendChild(this.crearSpanError(atributo));

                // Icono con enlace al archivo actual
                let a = document.createElement("a");
                a.setAttribute("id", "link_" + atributo);
                a.setAttribute("href", "http://193.147.87.202/ET2/filesuploaded/files_" + atributo + "/");

                let img = document.createElement("img");
                img.setAttribute("src", "./iconos/FILE.png");
                img.setAttribute("id", "botonFILE");
                img.setAttribute("onmouseover", `changeOnMouseOver(true,"FILE");`);
                img.setAttribute("onmouseout", `changeOnMouseOver(false,"FILE");`);
                img.style.width = '40px';
                img.style.height = '40px';

                a.appendChild(img);
                formulario.appendChild(a);
                formulario.appendChild(document.createElement("br"));
                formulario.appendChild(document.createElement("br"));
            }

            // Campo para subir archivo nuevo
            let nuevo = 'nuevo_' + atributo;
            let inputNuevo = document.createElement("input");
            inputNuevo.setAttribute("type", "file");
            inputNuevo.setAttribute("id", nuevo);
            inputNuevo.setAttribute("name", nuevo);
            inputNuevo.setAttribute("class", "PH_" + nuevo);

            formulario.appendChild(this.crearLabel(nuevo));
            formulario.appendChild(inputNuevo);
            formulario.appendChild(this.crearSpanError(nuevo));

        } else {
            // Otro tipo de input normal
            let input = document.createElement("input");
            input.setAttribute("type", tipo);
            input.setAttribute("id", atributo);
            input.setAttribute("name", atributo);
            input.setAttribute("class", "PH_" + atributo);

            if (datos.html?.size) {
                input.setAttribute("size", datos.html.size);
            }

            formulario.appendChild(this.crearLabel(atributo));
            formulario.appendChild(input);
            formulario.appendChild(this.crearSpanError(atributo));
        }
    }



    crearTextarea(datos, atributo) {
        let text = document.createElement("textarea");
        text.setAttribute("id", atributo);
        text.setAttribute("name", atributo);
        text.className = "PH_" + atributo;
        text.setAttribute("type", "text");
        if (eval(datos["rows"])) text.setAttribute("rows", datos["rows"]);
        if (eval(datos["cols"])) text.setAttribute("cols", datos["cols"]);

        return text;
    }

    crearSelect(datos, atributo) {
        let select = document.createElement("select");
        select.setAttribute("id", atributo);
        select.setAttribute("name", atributo);
        select.className = "PH_" + atributo;

        if (datos["multiple"]) {
            select.setAttribute("size", 2);
            select.setAttribute("multiple", "");
        }

        let opcion = document.createElement("option");
        if (!datos["multiple"]) {
            opcion.setAttribute("value", "");
            opcion.setAttribute("id", "SelectDefault_" + atributo);
            opcion.className = "SelectDefault";
            opcion.innerHTML = "";
        }
        select.appendChild(opcion);

        for (let i = 0; i < datos.valores.length; i++) {
            opcion = document.createElement('option');
            opcion.innerHTML = datos.valores[i];
            opcion.setAttribute("id", datos.valores[i]);
            opcion.setAttribute("value", datos.valores[i]);
            select.appendChild(opcion);
        }

        return select;
    }

    crearLabel(atributo) {
        let label = document.createElement("label");
        label.setAttribute("id", "label_" + atributo);
        label.className = "label_" + atributo;
        label.setAttribute("for", atributo);
        label.innerHTML = atributo;
        return label;
    }

    crearSpanError(atributo) {
        let span = document.createElement("span");
        span.setAttribute("id", "div_error_" + atributo);
        let a = document.createElement("a");
        a.setAttribute("id", "error_" + atributo);
        span.appendChild(a);
        return span;
    }

    eliminarCampos(accion) {
        console.log("🧹 Eliminando campos con acción:", accion);

        // ⚠️ NO ELIMINAMOS NADA en DELETE ni EDIT
        if (accion === 'EDIT' || accion === 'DELETE') return;

        for (let atributo of this.def_html.attributes_list) {
            const datos = this.def_html.attributes[atributo];
            if (!datos || !datos.html) continue;

            switch (accion) {
                case 'ADD':
                    if (datos.esAutoIncremental || datos.is_pk || datos.is_autoincrement) {
                        this.eliminarCampo(atributo);
                    }
                    if (datos.html.tag.toLowerCase() === "input" && datos.html.type === "file") {
                        this.eliminarCampo(atributo);
                        let link = document.getElementById('link_' + atributo);
                        if (link) link.remove();
                    }
                    break;

                case 'SEARCH':
                case 'SHOWCURRENT':
                    if (datos.html.tag.toLowerCase() === "input" && datos.html.type === "file") {
                        this.eliminarCampo("nuevo_" + atributo);
                        let link = document.getElementById('link_' + atributo);
                        if (link) link.remove();
                    }
                    break;
            }
        }
    }





    eliminarCampo(id) {
        const label = document.getElementById('label_' + id);
        if (label) label.remove();

        const campo = document.getElementById(id);
        if (campo) campo.remove();

        const divError = document.getElementById('div_error_' + id);
        if (divError) divError.remove();
    }


    ponernoactivoform(accion) {
        if (accion == "DELETE" || accion == "EDIT" || accion == "SHOWCURRENT") {

            let campos = document.forms['IU_form'].elements;

            for (let i = 0; i < campos.length; i++) {
                if (accion != "EDIT" || this.requiereReadOnlyEDIT(campos[i].id)) {
                    this.desactivarCampo(campos[i].id);
                }
            }
        }
    }

    requiereReadOnlyEDIT(id) {
        return (this.def_html[id] != undefined && (this.def_html[id].esAutoIncremental || this.def_html[id].esPK || (this.def_html[id].tag == "INPUT" && this.def_html[id].type == "file")));
    }

    desactivarCampo(id) {
        let campo = this.def_html.attributes[id];
        if (!campo) return;

        if (campo.html.tag == "SELECT") {
            if (campo.html.multiple) {
                let onchange = `
                let options = document.getElementById(id).getElementsByTagName("option");
                for (option of options) {
                    if (!option.disabled) {
                        option.setAttribute("selected", "");
                    }    
                }`;
                document.getElementById(id).onchange = onchange;
            }

            let options = document.getElementById(id).getElementsByTagName("option");
            for (let option of options) {
                if (!option.selected) {
                    option.setAttribute("disabled", "");
                }
            }
        } else {
            document.getElementById(id).setAttribute('readonly', true);
        }
    }


    SearchPH() {
        //cojer los de PH y ponerles _SEARCH
        let inputs = document.getElementById("IU_form").getElementsByTagName("input");
        let texts = document.getElementById("IU_form").getElementsByTagName("textarea");
        //Para cada hijo si la clase es PH_ añadirle _SEARCH al final
        for (var i = 0; i < inputs.length; i++) {
            var list = inputs[i].classList;
            for (var j = 0; j < list.length; j++) {
                if (list[j] == "PH_" + inputs[i].getAttribute("id")) {
                    inputs[i].classList.remove("PH_" + inputs[i].getAttribute("id"));
                    inputs[i].className = "PH_" + inputs[i].getAttribute("id") + "_SEARCH";
                }
            }
        }
        for (var i = 0; i < texts.length; i++) {
            var list = texts[i].classList;
            for (var j = 0; j < list.length; j++) {
                if (list[j] == "PH_" + texts[i].getAttribute("id")) {
                    texts[i].classList.remove("PH_" + texts[i].getAttribute("id"));
                    texts[i].className = "PH_" + texts[i].getAttribute("id") + "_SEARCH";
                }
            }
        }

    }
}