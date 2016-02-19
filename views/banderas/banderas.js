 $(document).ready(function() {

     var radiacion = document.getElementById("nivelUV").innerHTML;
  
     if(radiacion >= 0 && radiacion <=2){
      document.getElementById("banderaimg").src = "/banderas/verde.png"
     }
    else if(radiacion >= 3 && radiacion <=6){
      document.getElementById("banderaimg").src = "/banderas/amarillo.png"
     }
   else if(radiacion >= 7 && radiacion <=9){
      document.getElementById("banderaimg").src = "/banderas/azul.png"
     }
   else if(radiacion >= 10 && radiacion <=11){
      document.getElementById("banderaimg").src = "/banderas/rojo.png"
     }
    else if(radiacion = 12){
      document.getElementById("banderaimg").src = "/banderas/lila.png"
     }
     
 })