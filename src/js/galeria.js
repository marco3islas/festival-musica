document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
});

const iniciarApp = () => {
    crearGaleria();
}

const crearGaleria = () => {
    const galeria = document.querySelector('.galeria-imagenes');
    galeria.textContent = 'Vamos a crear la Galería'
}
