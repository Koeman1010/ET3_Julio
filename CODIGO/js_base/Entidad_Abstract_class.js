class Entidad_Abstracta extends Dom {

    constructor() {
        super();
    }

    inicializar() {
        this.access_functions = new ExternalAccess();
        this.validaciones = new Validaciones_Atomicas();
        this.constructor_form = new constructor_form(this["def_html_" + this.entidad]);
        this.dom_validations = new Dom_validations(this["def_test_" + this.entidad], this);
        this.colocador_valores = new colocador_valores(this["def_html_" + this.entidad], this);

        document.getElementById("divTablasDatosEntrega").style.display = "none";

        if (typeof this.datosespecialestabla === 'undefined') {
            this.datosespecialestabla = [];
        }
        if (typeof this.columnasamostrar === 'undefined') {
            this.columnasamostrar = [];
        }

        this.cerrar_test();
        super.inicializar(false);
        this.SEARCH();
    }

    createForm(accion, parametros) {
        // Simplemente llama a la lógica de Dom (ya heredada)
        super.createForm(accion, parametros, this);
    }

    change_value_IU(id) {
        // Método vacío que puede ser sobreescrito en cada entidad concreta.
    }

    static generar_def_test(def_html) {
        const resultado = { ADD: {}, EDIT: {}, SEARCH: {} };

        for (const [atributo, definicion] of Object.entries(def_html.attributes)) {
            const reglas = definicion.validation_rules || {};
            for (const accion of ["ADD", "EDIT", "SEARCH"]) {
                if (!reglas[accion]) continue;

                if (!resultado[accion][atributo]) {
                    resultado[accion][atributo] = {};
                }

                for (const [clave, valor] of Object.entries(reglas[accion])) {
                    // Si es regla personalizada (string directa)
                    if (typeof valor === "string") {
                        resultado[accion][atributo][clave] = {
                            valor: valor,
                            codigo: `${def_html.entidad || "entidad"}__${atributo}__${clave}_KO`,
                            especial: true
                        };
                    }
                    // Si es array [valor, código]
                    else if (Array.isArray(valor)) {
                        resultado[accion][atributo][clave] = {
                            valor: valor[0],
                            codigo: valor[1],
                            especial: clave === "empty" || clave.includes("personalize")
                        };
                    }
                }
            }
        }
        return resultado;
    }



}