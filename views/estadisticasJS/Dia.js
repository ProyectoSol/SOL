  $(document).ready(function() {

      var HoraR = document.getElementById("HoraR").innerHTML;
      var RadiacionHora = document.getElementById("RadiacionHora").innerHTML;
   
      var HoraSplit = HoraR.split(",");
      var RadiacionHorasplit = RadiacionHora.split(",");
      

      var invertidoHora = HoraSplit.sort(function(a, b){return a,b});
          var invertidoRadiacion = RadiacionHorasplit.sort(function(a, b){return a,b});

      var ctx2 = $("#mycanvas2").get(0).getContext("2d");

      var data = {
          labels: HoraSplit,
          datasets: [{
              label: "My 2 dataset",
              fillColor: "rgb(92,214,92)", // "rgba(220,220,220,0.2)"
              strokeColor: "rgb(77,255,135)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              backgroundColor: "#ffffff",
              data: RadiacionHorasplit
          }]
      };
      var myLineChart = new Chart(ctx2).Line(data,{
          responsive:true
       });


  })