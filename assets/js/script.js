$(document).ready(function () {
    $("#butTon").click(function () {
        // 3.1 Capturar la información ingresada mediante eventos del DOM con jQuery.
        let numHero = $("#numHeroInput").val()

        // 3.3 Comprobar la información ingresada por el usuario, la cual, solo debe ser un número.
        if (!/^\d+$/.test(numHero)) {

            alert("Ingrese un número válido")
            return
        }

        else { console.log(numHero) }


    })
})