class estructura_project extends Entidad_Abstracta {
	constructor() {
		super();
		this.entidad = 'project';
		this.def_html_project = estructura_project_def;
		this.def_test_project = Entidad_Abstracta.generar_def_test(this.def_html_project);
		this.def_test = this.def_test_project;
	}
}

const estructura_project_def = {
	attributes_list: [
		"id_project", "name_project", "start_date_project", "end_date_project", "responsable_project",
		"organization_project", "code_project", "acronym_project", "id_sampling_methodology",
		"description_project", "file_project"
	],
	columnas_visibles_tabla: ["id_project", "name_project", "responsable_project"],
	columnas_modificadas_tabla: [
		"id_project", "name_project", "start_date_project", "end_date_project", "responsable_project",
		"organization_project", "code_project", "acronym_project", "id_sampling_methodology",
		"description_project", "file_project"
	],
	attributes: {
		id_project: {
			html: { tag: 'input', type: 'text' },
			is_pk: true,
			is_autoincrement: true,
			is_null: true,
			validation_rules: {
				SEARCH: {
					max_size: [11, "project__id_project__max_size_KO"],
					reg_exp: ["^[0-9]*$", "project__id_project__format_KO"]
				}
			}
		},
		name_project: {
			html: { tag: 'input', type: 'text' },
			is_null: false,
			validation_rules: {
				ADD: {
					min_size: [15, "project__name_project__min_size_KO"],
					max_size: [100, "project__name_project__max_size_KO"],
					reg_exp: ["^[A-Za-z ]*$", "project__name_project__format_KO"]
				},
				EDIT: {
					min_size: [15, "project__name_project__min_size_KO"],
					max_size: [100, "project__name_project__max_size_KO"],
					reg_exp: ["^[A-Za-z ]*$", "project__name_project__format_KO"]
				},
				SEARCH: {
					max_size: [100, "project__name_project__max_size_KO"],
					reg_exp: ["^[A-Za-z ]*$", "project__name_project__format_KO"]
				}
			}
		},
		start_date_project: {
			html: { tag: 'input', type: 'text' },
			is_null: false,
			validation_rules: {
				ADD: {
					reg_exp: ["^[0-9]{2}/[0-9]{2}/[0-9]{4}$", "project__start_date_project__format_KO"],
				},
				EDIT: {
					reg_exp: ["^[0-9]{2}/[0-9]{2}/[0-9]{4}$", "project__start_date_project__format_KO"],
				},
				SEARCH: {
					reg_exp: ["^[0-9]{0,2}[/]{0,1}[0-9]{0,2}[/]{0,1}[0-9]{0,4}$", "project__start_date_project__format_SEARCH_KO"]
				}
			}
		},
		end_date_project: {
			html: { tag: 'input', type: 'text' },
			is_null: false,
			validation_rules: {
				ADD: {
					reg_exp: ["^[0-9]{2}/[0-9]{2}/[0-9]{4}$", "project__end_date_project__format_KO"],
				},
				EDIT: {
					reg_exp: ["^[0-9]{2}/[0-9]{2}/[0-9]{4}$", "project__end_date_project__format_KO"],
				},
				SEARCH: {
					reg_exp: ["^[0-9]{0,2}[/]{0,1}[0-9]{0,2}[/]{0,1}[0-9]{0,4}$", "project__end_date_project__format_SEARCH_KO"]
				}
			}
		},
		responsable_project: {
			html: { tag: 'input', type: 'text' },
			is_null: false,
			validation_rules: {
				ADD: {
					min_size: [6, "project__responsable_project__min_size_KO"],
					max_size: [60, "project__responsable_project__max_size_KO"],
					reg_exp: ["^[A-Za-z áéíóúÁÉÍÓÚ ñÑ]*$", "project__responsable_project__format_KO"]
				},
				EDIT: {
					min_size: [6, "project__responsable_project__min_size_KO"],
					max_size: [60, "project__responsable_project__max_size_KO"],
					reg_exp: ["^[A-Za-z áéíóúÁÉÍÓÚ ñÑ]*$", "project__responsable_project__format_KO"]
				},
				SEARCH: {
					max_size: [60, "project__responsable_project__max_size_KO"],
					reg_exp: ["^[A-Za-z áéíóúÁÉÍÓÚ ñÑ]*$", "project__responsable_project__format_KO"]
				}
			}
		},
		organization_project: {
			html: { tag: 'input', type: 'text' },
			is_null: false,
			validation_rules: {
				ADD: {
					min_size: [6, "project__organization_project__min_size_KO"],
					max_size: [100, "project__organization_project__max_size_KO"],
					reg_exp: ["^[A-Za-z áéíóúÁÉÍÓÚ ñÑ]*$", "project__organization_project__format_KO"]
				},
				EDIT: {
					min_size: [6, "project__organization_project__min_size_KO"],
					max_size: [100, "project__organization_project__max_size_KO"],
					reg_exp: ["^[A-Za-z áéíóúÁÉÍÓÚ ñÑ]*$", "project__organization_project__format_KO"]
				},
				SEARCH: {
					max_size: [100, "project__organization_project__max_size_KO"],
					reg_exp: ["^[A-Za-z áéíóúÁÉÍÓÚ ñÑ]*$", "project__organization_project__format_KO"]
				}
			}
		},
		code_project: {
			html: { tag: 'input', type: 'text' },
			is_null: false,
			validation_rules: {
				ADD: {
					min_size: [6, "project__code_project__min_size_KO"],
					max_size: [50, "project__code_project__max_size_KO"],
					reg_exp: [`^[A-Za-z ñÑ!"'(),-.:;?^_{|}~¿»¡«]*$`, "project__code_project__format_KO"]
				},
				EDIT: {
					min_size: [6, "project__code_project__min_size_KO"],
					max_size: [50, "project__code_project__max_size_KO"],
					reg_exp: [`^[A-Za-z ñÑ!"'(),-.:;?^_{|}~¿»¡«]*$`, "project__code_project__format_KO"]
				},
				SEARCH: {
					max_size: [50, "project__code_project__max_size_KO"],
					reg_exp: [`^[A-Za-z ñÑ!"'(),-.:;?^_{|}~¿»¡«]*$`, "project__code_project__format_KO"]
				}
			}
		},
		acronym_project: {
			html: { tag: 'input', type: 'text' },
			is_null: false,
			validation_rules: {
				ADD: {
					min_size: [6, "project__acronym_project__min_size_KO"],
					max_size: [15, "project__acronym_project__max_size_KO"],
					reg_exp: [`^[A-Za-zñÑ!"'(),-.:;?^_{|}~¿»¡«]*$`, "project__acronym_project__format_KO"]
				},
				EDIT: {
					min_size: [6, "project__acronym_project__min_size_KO"],
					max_size: [15, "project__acronym_project__max_size_KO"],
					reg_exp: [`^[A-Za-zñÑ!"'(),-.:;?^_{|}~¿»¡«]*$`, "project__acronym_project__format_KO"]
				},
				SEARCH: {
					max_size: [15, "project__acronym_project__max_size_KO"],
					reg_exp: [`^[A-Za-zñÑ!"'(),-.:;?^_{|}~¿»¡«]*$`, "project__acronym_project__format_KO"]
				}
			}
		},
		id_sampling_methodology: {
			html: { tag: 'input', type: 'text' },
			is_null: false,
			validation_rules: {
				ADD: {
					min_size: [1, "project__id_sampling_methodology__min_size_KO"],
					max_size: [11, "project__id_sampling_methodology__max_size_KO"],
					reg_exp: ["^[1-9][0-9]*$", "project__id_sampling_methodology__format_KO"]
				},
				EDIT: {
					min_size: [1, "project__id_sampling_methodology__min_size_KO"],
					max_size: [11, "project__id_sampling_methodology__max_size_KO"],
					reg_exp: ["^[1-9][0-9]*$", "project__id_sampling_methodology__format_KO"]
				},
				SEARCH: {
					max_size: [11, "project__id_sampling_methodology__max_size_KO"],
					reg_exp: ["^[0-9]*$", "project__id_sampling_methodology__format_KO"]
				}
			}
		},
		description_project: {
			html: { tag: 'textarea', cols: 100, rows: 5 },
			is_null: false,
			validation_rules: {
				ADD: {
					min_size: [30, "project__description_project__min_size_KO"],
					max_size: [500, "project__description_project__max_size_KO"]
				},
				EDIT: {
					min_size: [30, "project__description_project__min_size_KO"],
					max_size: [500, "project__description_project__max_size_KO"]
				},
				SEARCH: {
					max_size: [500, "project__description_project__max_size_KO"]
				}
			}
		},
		file_project: {
			html: { tag: 'input', type: 'file' },
			is_null: true,
			validation_rules: {
				ADD: {
					nofile: ["nofile", "project__nuevo_file_project__nofile_KO"],
					max_size_file: [2000000, "project__nuevo_file_project__max_size_file_KO"],
					type_file: [
						[
							"application/pdf",
							"application/msword",
							"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
						],
						"project__nuevo_file_project__type_file_KO"
					],
					min_size: [7, "project__nuevo_file_project__min_size_KO"],
					max_size: [100, "project__nuevo_file_project__max_size_KO"],
					reg_exp: ["^[A-Za-z.]*$", "project__nuevo_file_project__format_name_file_KO"]
				},
				EDIT: {
					max_size_file: [2000000, "project__nuevo_file_project__max_size_file_KO"],
					type_file: [
						[
							"application/pdf",
							"application/msword",
							"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
						],
						"project__nuevo_file_project__type_file_KO"
					],
					min_size: [7, "project__nuevo_file_project__min_size_KO"],
					max_size: [100, "project__nuevo_file_project__max_size_KO"],
					reg_exp: ["^[A-Za-z.]*$", "project__nuevo_file_project__format_name_file_KO"]
				},
				SEARCH: {
					max_size: [100, "project__file_project__max_size_KO"],
					reg_exp: ["^[A-Za-z.]*$", "project__file_project__format_KO"]
				}
			}
		}
	}
};
