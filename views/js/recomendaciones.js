$(document).ready(function(){
    
    var radiacion = document.getElementById("nivelUV").innerHTML;
    var fototipo = Math.floor(document.getElementById("fototipo").innerHTML);
  //  alert(radiacion + "  " + fototipo);
    
    radiacion = parseInt(radiacion);
    fototipo =   parseInt(fototipo);
    
    if (fototipo == 1){
        fototipo = 4;
    }
    else if (fototipo == 2){
        fototipo = 3;
    }
     else if (fototipo == 3 || fototipo == 4 || fototipo == 5 || fototipo == 6){
        fototipo = 2;
    }
var radfot = radiacion * fototipo;

        if(radfot >= 1 && radfot <= 4){
            
             document.getElementById("seRecomienda").innerHTML = "Según tu nivel de radiación y tu tonalidad de piel te recomiendo utilizar una crema de 2FPS o 4FPS";
        }
        else if(radfot >=5  && radfot <= 10){
             document.getElementById("seRecomienda").innerHTML = "Según tu nivel de radiación y tu tonalidad de piel te recomiendo utilizar una crema de 6FPS o 10FPS";
        }
         else if(radfot >=11 && radfot <= 25){
             document.getElementById("seRecomienda").innerHTML = "Según tu nivel de radiación y tu tonalidad de piel te recomiendo utilizar una crema de 20FPS o 25FPS";
        }
          else if(radfot >=26  && radfot <= 50){
             document.getElementById("seRecomienda").innerHTML = "Según tu nivel de radiación y tu tonalidad de piel te recomiendo utilizar una crema de 30FPS o 50FPS";
        }
          else if(radfot > 50){
             document.getElementById("seRecomienda").innerHTML = "Según tu nivel de radiación y tu tonalidad de piel te recomiendo utilizar una crema de 50FPS";
        }
        
        
});