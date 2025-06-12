class ExternalAccess {

    constructor() { }

    back_request(formulario, controlador, action, datosextra = null) {
        let datos;

        if (formulario === '') {
            datos = new FormData();
        } else {
            formulario = document.getElementById(formulario);
            datos = new FormData(formulario);
        }

        datos.append('controlador', controlador);
        datos.append('action', action);

        if (datosextra != null) {
            for (let clave in datosextra) {
                datos.append(clave, datosextra[clave]);
            }
        }

        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "POST",
                url: "http://193.147.87.202/ET2/index.php",
                data: datos,
                processData: false,
                contentType: false,
            })
                .done(res => {
                    try {
                        console.log("💡 Respuesta cruda del servidor:", res);

                        // Forzar a JSON si viene como string
                        let json = typeof res === "string" ? JSON.parse(res) : res;

                        // Verificamos estructura
                        if (!json || typeof json !== "object" || !("ok" in json)) {
                            throw new Error("La respuesta no tiene el campo 'ok'");
                        }

                        resolve(json);
                    } catch (e) {
                        console.error("❌ Error al interpretar respuesta como JSON:", e, res);
                        reject("RESPUESTA_NO_VALIDA");
                    }
                })
                .fail((jqXHR, textStatus, errorThrown) => {
                    console.error("❌ Fallo AJAX:", textStatus, errorThrown);
                    try {
                        // Intenta parsear incluso cuando jQuery falla
                        let json = typeof jqXHR.responseText === "string" ? JSON.parse(jqXHR.responseText) : jqXHR.responseText;

                        if (json?.ok !== undefined) {
                            resolve(json); // aunque jQuery diga fail, si backend dijo OK, lo usamos
                        } else {
                            reject("FALLO_BACKEND");
                        }
                    } catch (e) {
                        console.error("❌ Fallo interpretando .responseText:", jqXHR.responseText);
                        reject("FALLO_AJAX_FATAL");
                    }
                });

        });
    }


}
