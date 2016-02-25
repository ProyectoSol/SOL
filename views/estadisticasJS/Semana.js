   $(document).ready(function() {
       var radiacion = document.getElementById("radioA").innerHTML;
       var semana = radiacion.split(",");

       var semanaDia = document.getElementById("SemanaDia").innerHTML;
       var diaSemana = semanaDia.split(",");
   
       var diaSemanaI = diaSemana.sort(function(a, b){return a,b});

        var invertido = semana.sort(function(a, b){return a,b});




       var ctx = $("#mycanvas").get(0).getContext("2d");


       var data = {
          
           labels: diaSemana,
           datasets: [{
              
               label: "My First dataset",
               fillColor: "rgb(51, 173, 255)", // "rgba(220,220,220,0.2)"
               strokeColor: "rgb(0, 204, 255)",
               pointColor: "rgba(220,220,220,1)",
               pointStrokeColor: "#fff",
               
               pointHighlightFill: "#fff",
               pointHighlightStroke: "rgba(220,220,220,1)",
               data: semana
           }]
       };
       var myLineChart = new Chart(ctx).Line(data,{
          responsive:true
       });


       //banderas

   })