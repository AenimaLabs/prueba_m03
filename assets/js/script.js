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

            mostrarDatos(response)

            // mostrarGrafico(response)


            //en un principio quise hacer que se cargara en otra pestaña
            //pero ya luego no pude XD
            // window.location.href= "index2.html"
            // window.open("index2.html", "_blank")
            // $('#contenedor').append(response.name)
        })
        .fail(function (status, error) {
            console.error("Error en la solicitud: ", status, error);

        })
}

function mostrarDatos(response) {

    let arregloApariencia = pasandoaArreglo(response.appearance)
    let arregloPoderes = pasandoaArregloPS(response.powerstats)
    let arregloBiografia = pasandoaArreglo(response.biography)
    let arregloTrabajo = pasandoaArreglo(response.work)
    let arregloConexiones = pasandoaArreglo(response.connections)

    console.log("lero lero", arregloConexiones[0].y)
    console.log("waja", arregloTrabajo[0].y)
    console.log("que es esto", arregloPoderes[1].y)


    let cardContainer = $('#cardContainer')

    cardContainer.append(`

<div class="card" >
      <div class="row g-0">
        <div class="col-md-4 d-flex align-items-center">
          <img src="${response.image.url}" class="img-fluid rounded-start" alt="...">
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


}

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
}

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
}

// function mostrarGrafico(response) {
//     console.log(response, "nada")

//     let powerstatsArreglo = []

//     let options = {
//         title: {text: "Estadísticas de Poder para"},
//         axisX:{title : "Frutas Tropicales",titleFontSize: 12},
//         axisY:{title : "Consumo Kg/persona/año",titleFontSize: 12},
//         data: [  // es un arreglo objetos que contiene tipo grafico y datos a graficar
//             {type: "pie",
//             dataPoints: [  // arreglo de objetos con valores de x axis - y axis
//                             { label: "papaya", y: 23},
//                             { label: "naranja", y: 15},
//                             { label: "platano", y: 25},
//                             { label: "mango", y: 30},
//                             { label: "guayaba", y: 20},
//                         ],
//             },
//         ],
//     };


// }


window.onload = function () {
    $(document).ready(function () {


        $("#butTon").click(function (event) {
            event.preventDefault()

            // 3.1 Capturar la información ingresada mediante eventos del DOM con jQuery.
            let numHero = $("#numHeroInput").val();

            // 3.3 Comprobar la información ingresada por el usuario, la cual, solo debe ser un número.
            if (!/^\d+$/.test(numHero)) {
                // 3.8 Implementar estructuras condicionales para generar alertas cuando existan errores en la búsqueda.
                alert("Por favor, ingrese un número válido, no sea desagradable")
                return
            }

            
            $('#cardContainer').empty()
            // $('#chartContainer').empty()

            consultaAPI(numHero)
            $("#numHeroInput").val('');



            let grafico;

            let options4 = {
                title: { text: "Gráfico de TORTA con jQuery CanvasJS" },
                axisX: { title: "Frutas Tropicales", titleFontSize: 12 },
                axisY: { title: "Consumo Kg/persona/año", titleFontSize: 12 },
                data: [
                    {
                        type: "pie",
                        dataPoints: [
                            { label: "papaya", y: 23 },
                            { label: "naranja", y: 15 },
                            { label: "platano", y: 25 },
                            { label: "mango", y: 30 },
                            { label: "guayaba", y: 20 },
                        ],
                    },
                ],
            };

            grafico = $("#chartContainer");


            grafico.CanvasJSChart(options4);

          

        });

    });
}

