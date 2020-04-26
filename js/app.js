const buscadorDOM = document.querySelector('#buscar input');
const ui = new UI();

const primera = () => {
    ui.mostrarEstablecimientos();
}

const buscador = () => {
    if (buscadorDOM.value.length > 5) {
        ui.obtenerSugerencia(buscadorDOM.value);
    } else {
        ui.mostrarEstablecimientos();
    }
}

document.addEventListener('DOMContentLoaded', primera);
buscadorDOM.addEventListener('input', buscador);