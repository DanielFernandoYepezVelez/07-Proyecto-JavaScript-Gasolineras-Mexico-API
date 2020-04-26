class UI {
    constructor() {
        /* Instanciar la clase API */
        this.api = new API();

        /* Crear los markers(pines) con layerGroup */
        this.markers = new L.LayerGroup();

        // Iniciar el mapa
        this.mapa = this.inicializarMapa();
    }

    inicializarMapa() {
        // Inicializar y obtener la propiedad del mapa
        const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
        const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; ' + enlaceMapa + ' Contributors',
                maxZoom: 18,
            }).addTo(map);

        return map;
    }

    mostrarEstablecimientos() {
        this.api.obtenerDatos()
            .then(datos => {
                const respuesta = datos.respuestaJSON.results;
                this.mostrarPines(respuesta);
            });
    }

    mostrarPines(datos) {
        /* Siempre Se Van a limpiar los markers(pines) */
        this.markers.clearLayers();

        /* Recorrer Los datos Para Renderizar Cada marker(Pin) */
        datos.forEach(dato => {
            const { calle, regular, longitude, latitude, premium } = dato;

            /* Crear popup o globo de información */
            const opcionesPopUp = new L.popup()
                .setContent(
                    `<p>Calle: ${calle}</p>
                     <p><b>Regular:</b>$ ${regular} </p>
                     <p><b>Premium:</b>$ ${premium} </p>
                `);

            /* Crear El Pin, pasando las opciones de la latitud y longitude */
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
            ]).bindPopup(opcionesPopUp);

            /* YA Agregamos a la capa */
            this.markers.addLayer(marker);
        });

        /* DESPUES esta capa se agrega al mapa */
        this.markers.addTo(this.mapa);
    }

    obtenerSugerencia(busqueda) {
        this.api.obtenerDatos()
            .then(datos => {
                const resultados = datos.respuestaJSON.results;
                this.filtrarSugerencia(resultados, busqueda);
            });
    }

    /* CREANDO UN BUSCADOR */
    /* Este Codigo Sirve Para Cualquier escenario de un buscador */
    /* Para taer los que no coinciden o los que si coinciden con la busquedad */
    filtrarSugerencia(resultados, busqueda) {
        const filtro = resultados.filter(filtro => filtro.calle.indexOf(busqueda) !== (-1));
        this.mostrarPines(filtro)
    }
}