class Validaciones_Atomicas {

    constructor() { }

    min_size(id, minsize) {
        return this.evaluar_tam(id, minsize, false);
    }


    max_size(id, maxsize) {
        return this.evaluar_tam(id, maxsize, true);
    }


    format(id, expreg) {
        let valor = document.getElementById(id).value;
        return this.evaluar_regex(valor, expreg);
    }

    reg_exp(id, expreg) {
        let valor = document.getElementById(id).value;
        return this.evaluar_regex(valor, expreg);
    }


    max_size_file(id, maxsize) {
        const input = document.getElementById(id);
        if (!input || !input.files || input.files.length === 0) return true; // si no hay archivo, no se valida
        return input.files[0].size < maxsize;
    }

    type_file(id, tipos) {
        const input = document.getElementById(id);
        if (!input || !input.files || input.files.length === 0) return true;
        return tipos.includes(input.files[0].type);
    }


    format_name_file(id, expreg) {
        const input = document.getElementById(id);
        if (!input || !input.files || input.files.length === 0) return true;
        let nombre = input.files[0].name;
        return this.evaluar_regex(nombre, expreg);
    }

    evaluar_regex(valor, expreg) {
        const regex = new RegExp(expreg);
        return regex.test(valor);
    }


    evaluar_tam(id, parametro, mayor) {
        let elemento = document.getElementById(id);
        switch (elemento.tagName) {
            case 'INPUT':
            case 'TEXTAREA':
                switch (elemento.type) {
                    case "number":
                    case "date":
                    case "password":
                    case "text":
                    case 'textarea':
                        let valorelemento = elemento.value;
                        return mayor ? valorelemento.length <= parametro : valorelemento.length >= parametro;
                    case 'file':
                        if (!elemento.files || elemento.files.length === 0) return true;
                        let valorNameFile = elemento.files[0].name;
                        return mayor ? valorNameFile.length <= parametro : valorNameFile.length >= parametro;

                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

}