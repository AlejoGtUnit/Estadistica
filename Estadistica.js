
function Generar(){
    txtDatos = $("#txtDatos");
    entrada = txtDatos.val();
        
    if (entrada.length > 0){
        datosSeparados = entrada.split(',').map(Number);
        cantidadDatos = datosSeparados.length;

        datosSeparadosOrdenados = datosSeparados.sort(function (a, b) { return a > b; });
        datoMenor = datosSeparadosOrdenados[0];
        datoMayor = datosSeparadosOrdenados[cantidadDatos - 1];
        R = datoMayor - datoMenor;
		K = Math.sqrt(cantidadDatos);
        I = Math.round(R / K);

        $("#datosOrdenados").text("Datos Ordenados: " + datosSeparadosOrdenados.toString());
        $("#menor").text("Dato menor: " + datoMenor);
        $("#mayor").text("Dato mayor: " + datoMayor);
        $("#R").text("R: " + R);
        $("#K").text("K: " + K);
        $("#i").text("i: " + I);

              
        datosSerializados = [];
        fAcumulada = 0;
        sumaLimites = 0;
		$("#resultado tbody").empty();
        do {
            limiteAparenteMenor = (datoMenor) + sumaLimites;
            limiteAparenteMayor = (datoMenor + I - 1) + sumaLimites;
            fi = datosSeparados.filter(function (n) { return (n >= self.limiteAparenteMenor && n <= self.limiteAparenteMayor); }).length;
            fr = self.fi / cantidadDatos;
            frPorcentual = self.fr * 100;
            fAcumulada += fi,
            xi = (self.limiteAparenteMenor + self.limiteAparenteMayor) / 2;

            datosSerializados[datosSerializados.length] = {
                limiteAparenteMenor: limiteAparenteMenor,
                limiteAparenteMayor: limiteAparenteMayor,
                fi: fi,
                fr: fr,
                frPorcentual: frPorcentual,
                fAcumulada: fAcumulada,
                xi: xi,
            };

            $("#resultado tbody").append("<tr>");
            $("#resultado tbody").append("<td>" + limiteAparenteMenor.toString() + " - " + limiteAparenteMayor.toString());
			$("#resultado tbody").append("<td>" + (limiteAparenteMenor - 0.5).toString() + " - " + (limiteAparenteMayor + 0.5).toString());
            $("#resultado tbody").append("<td>" + fi.toFixed(0));
            $("#resultado tbody").append("<td>" + fr.toFixed(2));
            $("#resultado tbody").append("<td>" + Math.round(frPorcentual).toString() + " % ");
            $("#resultado tbody").append("<td>" + fAcumulada.toFixed(0));
            $("#resultado tbody").append("<td>" + xi.toFixed(2));
            $("#resultado tbody").append("<tr>");

            sumaLimites += I;
        }
        while (limiteAparenteMayor <= datoMayor);
    }
    else
        alert("Debe ingresar datos para generar tabla de distribucion de frecuencias.");
}