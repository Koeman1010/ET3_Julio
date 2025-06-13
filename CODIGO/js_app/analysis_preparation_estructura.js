class estructura_analysis_preparation extends Entidad_Abstracta {
    constructor() {
        super();
        this.entidad = 'analysis_preparation';
        this.def_html_analysis_preparation = estructura_analysis_preparation_def;
        this.def_test_analysis_preparation = Entidad_Abstracta.generar_def_test(this.def_html_analysis_preparation);
        this.def_test = this.def_test_analysis_preparation;
        this.def_html = this.def_html_analysis_preparation;
    }
}

const estructura_analysis_preparation_def = {
    attributes_list: [
        "id_analysis_preparation",
        "name_analysis_preparation",
        "bib_analysis_preparation",
        "description_analysis_preparation",
        "file_analysis_preparation"
    ],
    columnas_visibles_tabla: [
        "id_analysis_preparation",
        "name_analysis_preparation"
    ],
    columnas_modificadas_tabla: [
        "id_analysis_preparation",
        "name_analysis_preparation",
        "bib_analysis_preparation",
        "description_analysis_preparation",
        "file_analysis_preparation"
    ],
    attributes: {
        id_analysis_preparation: {
            html: { tag: "input", type: "text" },
            is_pk: true,
            is_autoincrement: true,
            component_visible_size: 11,
            validation_rules: {
                SEARCH: {
                    max_size: [11, "analysis_preparation__id_analysis_preparation__max_size_KO"],
                    reg_exp: ["^[0-9]*$", "analysis_preparation__id_analysis_preparation__format_KO"]
                }
            }
        },
        name_analysis_preparation: {
            html: { tag: "input", type: "text" },
            component_visible_size: 100,
            validation_rules: {
                ADD: {
                    min_size: [8, "analysis_preparation__name_analysis_preparation__min_size_KO"],
                    max_size: [100, "analysis_preparation__name_analysis_preparation__max_size_KO"],
                    reg_exp: ["^[A-Za-z ]*$", "analysis_preparation__name_analysis_preparation__format_KO"]
                },
                EDIT: {
                    min_size: [8, "analysis_preparation__name_analysis_preparation__min_size_KO"],
                    max_size: [100, "analysis_preparation__name_analysis_preparation__max_size_KO"],
                    reg_exp: ["^[A-Za-z ]*$", "analysis_preparation__name_analysis_preparation__format_KO"]
                },
                SEARCH: {
                    max_size: [100, "analysis_preparation__name_analysis_preparation__max_size_KO"],
                    reg_exp: ["^[A-Za-z ]*$", "analysis_preparation__name_analysis_preparation__format_KO"]
                }
            }
        },
        bib_analysis_preparation: {
            html: { tag: "textarea", rows: 4, columns: 50 },
            validation_rules: {
                ADD: {
                    min_size: [6, "analysis_preparation__bib_analysis_preparation__min_size_KO"],
                    max_size: [200, "analysis_preparation__bib_analysis_preparation__max_size_KO"],
                    reg_exp: [
                        "^[A-Za-z ñÑ !\"'(),-.:;?^_{\\|}~¿»¡« áéíóúÁÉÍÓÚ]*$",
                        "analysis_preparation__bib_analysis_preparation__format_KO"
                    ]
                },
                EDIT: {
                    min_size: [6, "analysis_preparation__bib_analysis_preparation__min_size_KO"],
                    max_size: [200, "analysis_preparation__bib_analysis_preparation__max_size_KO"],
                    reg_exp: [
                        "^[A-Za-z ñÑ !\"'(),-.:;?^_{\\|}~¿»¡« áéíóúÁÉÍÓÚ]*$",
                        "analysis_preparation__bib_analysis_preparation__format_KO"
                    ]
                },
                SEARCH: {
                    max_size: [200, "analysis_preparation__bib_analysis_preparation__max_size_KO"],
                    reg_exp: [
                        "^[A-Za-z ñÑ !\"'(),-.:;?^_{\\|}~¿»¡« áéíóúÁÉÍÓÚ]*$",
                        "analysis_preparation__bib_analysis_preparation__format_KO"
                    ]
                }
            }
        },
        description_analysis_preparation: {
            html: { tag: "textarea", rows: 50, columns: 100 },
            validation_rules: {
                ADD: {
                    min_size: [80, "analysis_preparation__description_analysis_preparation__min_size_KO"],
                    max_size: [5000, "analysis_preparation__description_analysis_preparation__max_size_KO"],
                    reg_exp: ["^[A-Za-z ]*$", "analysis_preparation__description_analysis_preparation__format_KO"]
                },
                EDIT: {
                    min_size: [80, "analysis_preparation__description_analysis_preparation__min_size_KO"],
                    max_size: [5000, "analysis_preparation__description_analysis_preparation__max_size_KO"],
                    reg_exp: ["^[A-Za-z ]*$", "analysis_preparation__description_analysis_preparation__format_KO"]
                },
                SEARCH: {
                    max_size: [5000, "analysis_preparation__description_analysis_preparation__max_size_KO"],
                    reg_exp: ["^[A-Za-z ]*$", "analysis_preparation__description_analysis_preparation__format_KO"]
                }
            }
        },
        file_analysis_preparation: {
            html_por_accion: {
                ADD: { tag: "input", type: "file" },
                EDIT: { tag: "input", type: "file" },
                SEARCH: { tag: "textarea" },
                SHOW: { tag: "textarea" },
                SHOWCURRENT: { tag: "textarea" },
                DELETE: { tag: "textarea" }
            },
            validation_rules: {
                ADD: {
                    file_type: [
                        [
                            "application/pdf",
                            "application/msword",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        ],
                        "analysis_preparation__nuevo_file_analysis_preparation__type_file_KO"
                    ],
                    max_size_file: [2000000, "analysis_preparation__nuevo_file_analysis_preparation__max_size_file_KO"],
                    min_size: [7, "analysis_preparation__nuevo_file_analysis_preparation__min_size_KO"],
                    max_size: [100, "analysis_preparation__nuevo_file_analysis_preparation__max_size_KO"],
                    format_name_file: ["^[A-Za-z.]*$", "analysis_preparation__nuevo_file_analysis_preparation__format_name_file_KO"]
                },
                EDIT: {
                    file_type: [
                        [
                            "application/pdf",
                            "application/msword",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        ],
                        "analysis_preparation__nuevo_file_analysis_preparation__type_file_KO"
                    ],
                    max_size_file: [2000000, "analysis_preparation__nuevo_file_analysis_preparation__max_size_file_KO"],
                    min_size: [7, "analysis_preparation__nuevo_file_analysis_preparation__min_size_KO"],
                    max_size: [100, "analysis_preparation__nuevo_file_analysis_preparation__max_size_KO"],
                    format_name_file: ["^[A-Za-z.]*$", "analysis_preparation__nuevo_file_analysis_preparation__format_name_file_KO"]
                },
                SEARCH: {
                    max_size: [100, "analysis_preparation__file_analysis_preparation__max_size_KO"],
                    reg_exp: ["^[A-Za-z.]*$", "analysis_preparation__file_analysis_preparation__format_KO"]
                }
            }
        }

    }
};



