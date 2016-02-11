 $(document).ready(function() {

     var radiacionA = document.getElementById("RadiacionAnual").innerHTML;
     var RadiacionAnual = radiacionA.split(",");

     var anual = document.getElementById("fechaAnual").innerHTML;
     var numAnual = anual.split(",");

     //  var anoF = numAnual.sort(function(a, b){return a,b});
     //    var radioanual = RadiacionAnual.sort(function(a, b){return a,b});

     var ctx = $("#mycanvas3").get(0).getContext("2d");


     var data = {
         labels: numAnual,

         datasets: [{
             label: "My First dataset",
             fillColor: "rgb(255, 128, 191)", // "rgba(220,220,220,0.2)"
             strokeColor: "rgb(255, 153, 204)",
             pointColor: "rgba(220,220,220,1)",
             pointStrokeColor: "#fff",
             pointHighlightFill: "#fff",
             pointHighlightStroke: "rgba(220,220,220,1)",
             data: RadiacionAnual
         }]
     };
     var myLineChart = new Chart(ctx).Line(data);


     //banderas

 })