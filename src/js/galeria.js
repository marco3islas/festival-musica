document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
});

const iniciarApp = () => {
    crearGaleria();
    scrollNav();
}

const scrollNav = () => {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e){
            e.preventDefault();
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"});
        });
    });
}

const crearGaleria = () => {
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <=12 ; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML=`
        <source srcset="build/img/thumb/${i}.avif" type="image/avif"></source>
        <source srcset="build/img/thumb/${i}.webp" type="image/webp"></source>
        <img loading="lazy" width="200" heigth="300" src="build/img/thumb/${i}.jpg" alt="Imagen de la galería">
        `;
        imagen.onclick = () => mostrarImagen(i);
        console.log(imagen);
        
        galeria.appendChild(imagen);
    }
}
// crea el overlay con la imagen

const mostrarImagen = (id) => {
        const imagen = document.createElement('PICTURE');
        imagen.innerHTML=`
        <source srcset="build/img/grande/${id}.avif" type="image/avif"></source>
        <source srcset="build/img/grande/${id}.webp" type="image/webp"></source>
        <img loading="lazy" width="200" heigth="300" src="build/img/grande/${id}.jpg" alt="Imagen de la galería">
        `;
    const overlay = document.createElement('DIV');
          overlay.appendChild(imagen);
          overlay.classList.add('overlay');
          overlay.onclick = () => {
         const body = document.querySelector('body');
         body.classList.remove('no-scroll');
         overlay.remove();
         }



// Boton para cerrar el modal
    const cerrarFoto = document.createElement('p');
    cerrarFoto.textContent = 'X';
    cerrarFoto.classList.add('btn-cerrar');
    
    cerrarFoto.onclick = () => {
        const body = document.querySelector('body');
        body.classList.remove('no-scroll');
        overlay.remove();
    }

    overlay.appendChild(cerrarFoto);

// Lo añade al html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('no-scroll');
}
