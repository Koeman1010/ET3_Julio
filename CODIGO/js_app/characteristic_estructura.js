class estructura_characteristic extends Entidad_Abstracta {
    constructor() {
        super();
        this.entidad = 'characteristic';
        this.def_html_characteristic = estructura_characteristic_def;
        this.def_test_characteristic = Entidad_Abstracta.generar_def_test(this.def_html_characteristic);
        this.def_test = this.def_test_characteristic;
        this.def_html = this.def_html_characteristic;

    }
}

const estructura_characteristic_def = {
    attributes_list: [
        "id_characteristic",
        "name_characteristic",
        "data_type_characteristic",
        "category_characteristic",
        "description_characteristic",
        "bibref_characteristic",
        "file_characteristic"
    ],
    columnas_visibles_tabla: [
        "id_characteristic",
        "name_characteristic"
    ],
    columnas_modificadas_tabla: [
        "id_characteristic",
        "name_characteristic",
        "data_type_characteristic",
        "category_characteristic",
        "description_characteristic",
        "bibref_characteristic",
        "file_characteristic"
    ],

    attributes: {
        id_characteristic: {
            html: {
                tag: "input",
                type: "text"
            },
            is_pk: true,
            is_autoincrement: true,
            component_visible_size: 11,
            validation_rules: {
                SEARCH: {
                    max_size: [11, "characteristic__id_characteristic__max_size_KO"],
                    reg_exp: ["^[0-9]*$", "characteristic__id_characteristic__format_KO"]
                }
            }
        },

        name_characteristic: {
            html: {
                tag: "input",
                type: "text"
            },
            component_visible_size: 100,
            validation_rules: {
                ADD: {
                    min_size: [8, "characteristic__name_characteristic__min_size_KO"],
                    max_size: [100, "characteristic__name_characteristic__max_size_KO"],
                    reg_exp: ["^[A-Za-z ]*$", "characteristic__name_characteristic__format_KO"]
                },
                EDIT: {
                    min_size: [8, "characteristic__name_characteristic__min_size_KO"],
                    max_size: [100, "characteristic__name_characteristic__max_size_KO"],
                    reg_exp: ["^[A-Za-z ]*$", "characteristic__name_characteristic__format_KO"]
                },
                SEARCH: {
                    max_size: [100, "characteristic__name_characteristic__max_size_KO"],
                    reg_exp: ["^[A-Za-z ]*$", "characteristic__name_characteristic__format_KO"]
                }
            }
        },

        data_type_characteristic: {
            html: {
                tag: "select"
            },
            valores: ["Texto", "Numérico", "Fecha", "Booleano"], // <-- ESTO ES OBLIGATORIO
            validation_rules: {
                ADD: {
                    selectValido: ['characteristic__data_type_characteristic__select_incorrecto_KO']
                },
                EDIT: {
                    selectValido: ['characteristic__data_type_characteristic__select_incorrecto_KO']
                },
                SEARCH: {
                    selectValidoSEARCH: ['characteristic__data_type_characteristic__select_incorrecto_KO']
                }
            }
        },
        category_characteristic: {
            html: {
                tag: "select"
            },
            valores: ["General", "Específica", "Opcional"], // <-- IGUAL AQUÍ
            validation_rules: {
                ADD: {
                    selectValido: ['characteristic__category_characteristic__select_incorrecto_KO']
                },
                EDIT: {
                    selectValido: ['characteristic__category_characteristic__select_incorrecto_KO']
                },
                SEARCH: {
                    selectValidoSEARCH: ['characteristic__category_characteristic__select_incorrecto_KO']
                }
            }
        }
        ,

        description_characteristic: {
            html: {
                tag: "textarea",
                rows: 50,
                cols: 100
            },
            validation_rules: {
                ADD: {
                    min_size: [80, "characteristic__description_characteristic__min_size_KO"],
                    max_size: [5000, "characteristic__description_characteristic__max_size_KO"],
                    reg_exp: ["^[A-Za-z ]*$", "characteristic__description_characteristic__format_KO"]
                },
                EDIT: {
                    min_size: [80, "characteristic__description_characteristic__min_size_KO"],
                    max_size: [5000, "characteristic__description_characteristic__max_size_KO"],
                    reg_exp: ["^[A-Za-z ]*$", "characteristic__description_characteristic__format_KO"]
                },
                SEARCH: {
                    max_size: [5000, "characteristic__description_characteristic__max_size_KO"],
                    reg_exp: ["^[A-Za-z ]*$", "characteristic__description_characteristic__format_KO"]
                }
            }
        },

        bibref_characteristic: {
            html: {
                tag: "textarea",
                rows: 4,
                cols: 50
            },
            validation_rules: {
                ADD: {
                    min_size: [16, "characteristic__bibref_characteristic__min_size_KO"],
                    max_size: [200, "characteristic__bibref_characteristic__max_size_KO"],
                    reg_exp: ["^[A-Za-z ñÑ !\"'(),-.:;?^_{\\|}~¿»¡« áéíóúÁÉÍÓÚ]*$", "characteristic__bibref_characteristic__format_KO"]
                },
                EDIT: {
                    min_size: [16, "characteristic__bibref_characteristic__min_size_KO"],
                    max_size: [200, "characteristic__bibref_characteristic__max_size_KO"],
                    reg_exp: ["^[A-Za-z ñÑ !\"'(),-.:;?^_{\\|}~¿»¡« áéíóúÁÉÍÓÚ]*$", "characteristic__bibref_characteristic__format_KO"]
                },
                SEARCH: {
                    max_size: [200, "characteristic__bibref_characteristic__max_size_KO"],
                    reg_exp: ["^[A-Za-z ñÑ !\"'(),-.:;?^_{\\|}~¿»¡« áéíóúÁÉÍÓÚ]*$", "characteristic__bibref_characteristic__format_KO"]
                }
            }
        },

        file_characteristic: {
            html_por_accion: {
                ADD: { tag: "input", type: "file" },
                EDIT: { tag: "input", type: "file" },
                SEARCH: { tag: "textarea" },
                SHOW: { tag: "textarea" },
                SHOWCURRENT: { tag: "textarea" },
                DELETE: { tag: "textarea" }
            }
            ,
            validation_rules: {
                ADD: {
                    no_file: "characteristic__nuevo_file_characteristic__empty_KO",
                    file_type: [["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"], "characteristic__nuevo_file_characteristic__type_file_KO"],
                    max_size_file: [200000, "characteristic__nuevo_file_characteristic__max_size_file_KO"],
                    min_size: [7, "characteristic__nuevo_file_characteristic__min_size_KO"],
                    max_size: [100, "characteristic__nuevo_file_characteristic__max_size_KO"],
                    format_name_file: ["^[A-Za-z.]*$", "characteristic__nuevo_file_characteristic__format_name_file_KO"]
                },
                EDIT: {
                    file_type: [["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"], "characteristic__nuevo_file_characteristic__type_file_KO"],
                    max_size_file: [200000, "characteristic__nuevo_file_characteristic__max_size_file_KO"],
                    min_size: [7, "characteristic__nuevo_file_characteristic__min_size_KO"],
                    max_size: [100, "characteristic__nuevo_file_characteristic__max_size_KO"],
                    format_name_file: ["^[A-Za-z.]*$", "characteristic__nuevo_file_characteristic__format_name_file_KO"]
                },
                SEARCH: {
                    max_size: [100, "characteristic__file_characteristic__max_size_KO"],
                    reg_exp: ["^[A-Za-z.]*$", "characteristic__file_characteristic__format_KO"]
                }
            }
        }

    }
};
