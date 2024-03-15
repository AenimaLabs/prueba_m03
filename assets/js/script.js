function consultaAPI(numHero) {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.superheroapi.com/api.php/1117243916369294/" + numHero,
        "method": "GET",
        "dataType": "json"
    };

    $.ajax(settings)
        .done(function (response) {

            if (response.response == "error") {

                alert("Héroe no encontrado")
                return
            }

            mostrarDatos(response)
            mostrarGrafico(response)


            //en un principio quise hacer que se cargara en otra pestaña
            //pero ya luego no pude XD
            // window.location.href= "index2.html"
            // window.open("index2.html", "_blank")
            // $('#contenedor').append(response.name)
        })
        .fail(function (status, error) {
            console.error("Error en la solicitud: ", status, error);

        })
};

function mostrarDatos(response) {

    let arregloApariencia = pasandoaArreglo(response.appearance)
    let arregloPoderes = pasandoaArregloPS(response.powerstats)
    let arregloBiografia = pasandoaArreglo(response.biography)
    let arregloTrabajo = pasandoaArreglo(response.work)
    let arregloConexiones = pasandoaArreglo(response.connections)

    let cardContainer = $('#cardContainer')

    console.log(arregloPoderes[0])
    console.log(arregloConexiones[0])

    //inyecta la card con los datos traídos desde la api
    cardContainer.append(`

<div class="card bg-dark text-light" >
      <div class="row g-0">
        <div class="col-md-4 d-flex align-items-center">
          <img id="imagenSuperHero" src="${response.image.url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body  ">
            <h5 class="card-title">SuperHero Encontrado</h5>
            <p class="card-text">Nombre: ${response.name}</p>
            <p class="card-text">Conexiones: ${arregloConexiones[0].y}</p>
            <ul class="list-group list-group-flush" >
              <li class="list-group-item">Ocupación: ${arregloTrabajo[0].y}</li>
              <li class="list-group-item">Primera Aparición: ${arregloBiografia[4].y}</li>
              <li class="list-group-item">Altura: ${arregloApariencia[2].y} </li>
              <li class="list-group-item">Peso: ${arregloApariencia[3].y}</li>
              <li class="list-group-item">Alias: ${arregloBiografia[2].y}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</div>
`)

    // Referencia al elemento de la imagen
    let $imagen = $('#imagenSuperHero');

    // Maneja el evento de carga de la imagen
    $imagen.on('load', function () {
        console.log('La imagen se ha cargado correctamente.');
    });

    // Maneja el evento de error de carga de la imagen
    $imagen.on('error', function () {
        console.error('Error al cargar la imagen. La imagen no es accesible (404 Not Found).');
        console.log('URL de la imagen:', $imagen.attr('src'));
        console.log('Estado de la imagen:', '404 Not Found');
        //reemplaza la imagen fallida por una imgagen local
        $imagen.attr('src', './assets/img/sinmanoparaimagen.avif')

    });


};

function pasandoaArreglo(arreglo) {
    let datosArreglo = []
    //usando su for in
    for (const key in arreglo
    ) {
        datosArreglo.push({
            label: key,
            // y: arreglo[key]
            y: (arreglo[key] == "-") ? "sin información" : (arreglo[key])
        })
    }
    return datosArreglo
};

function pasandoaArregloPS(arreglo) {
    let datosXY = [];
    //se recorre el objeto
    //key es el elemento individual del objeto
    for (const key in arreglo) {
        datosXY.push(
            {
                label: key,   // esta seria la propiedad
                y: (arreglo[key] == "null") ? 0 : Number((arreglo[key])) // esta seria el value

                // condición ? expr1 : expr2    -> operador condicional ternario

            });
    };

    return datosXY
};

function mostrarGrafico(response) {

    let arregloPoderes = pasandoaArregloPS(response.powerstats)
    
    if (arregloPoderes.every(poder => poder.y === 0)) {
        alert('Los valores de intelligence, strength, speed, durability, power y combat son 0. No se puede graficar.');
        return;
    }
    let dataPoints = [];

    for (let i = 0; i < arregloPoderes.length; i++) {
        dataPoints.push({
            name: arregloPoderes[i].label,
            y: arregloPoderes[i].y,
            // exploded: (i === 0) // Explode el primer indice
        });
    }
    let chart = new CanvasJS.Chart("chartContainer", {

        animationEnabled: true,
        title: {
            text: `Estadísticas de Poder para ${response.name}`,
            fontFamily: "Bangers, system-ui"
        },
       
        theme:"dark2",
        responsive: true,
        legend: {
            cursor: "pointer",
            itemclick: explodePie,
            fontFamily: "Bangers, system-ui"
        },
        data: [{
            type: "pie",
            showInLegend: true,
            toolTipContent: "{name}: <strong>{y}</strong>",
            indexLabel: "{name}  ({y})",
            dataPoints: dataPoints           
        }]
    });
    chart.render();
};

function explodePie(e) {
    if (typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    } else {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    }
    e.chart.render();

};

(function (jQuery) {

    $.fn.fadeOutPlugin = function () {
        return this.each(function () {
            $(this).fadeOut(1000);
        });
    };
 

$.fn.fadeInPlugin = function () {
    return this.each(function () {
        $(this).fadeIn(1000);
    });
};


}(jQuery));



window.onload = function () {
    $(document).ready(function () {

        $("#navnav").click(function (event) {
            event.preventDefault()

            const plugin = $(".fotoform")            
            plugin.fadeInPlugin()
            $('#chartContainer').empty()
            $('#cardContainer').empty()

                      
           

            
            // consultaAPI(numHero)
            // $("#numHeroInput").val('');

        });      


        $("#butTon").click(function (event) {
            event.preventDefault()

            // 3.1 Capturar la información ingresada mediante eventos del DOM con jQuery.
            let numHero = $("#numHeroInput").val();

            // 3.3 Comprobar la información ingresada por el usuario, la cual, solo debe ser un número.
            if (!/^\d+$/.test(numHero)) {
                // 3.8 Implementar estructuras condicionales para generar alertas cuando existan errores en la búsqueda.
                alert("Por favor, ingrese un número válido, no sea desagradable")
                $("#numHeroInput").val('');
                return
            }

             const plugin = $(".fotoform")            
            plugin.fadeOutPlugin()

            //vaciar el container de la card cada vez que busque un superhero
            $('#cardContainer').empty()
            
            
           

            consultaAPI(numHero)
            $("#numHeroInput").val('');



        });
    });
}

