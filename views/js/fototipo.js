 $(document).ready(function() {

      var cont = 1;
      var mensajes = [" ", "Selecciona color de piel", "Selecciona color de ojos", "Selecciona cantidad de lunares", "Selecciona frecuencia de enrojecimiento", "Selecciona frecuencia de bronceado"];
      var Arrayfototipo = [];
   

      var bar = 0;

      function seven() {
        if (cont == 7) {
          $("#mensaje").html("<h1>Has terminado la seleccion de fototipo</h1>");

          $.get("/fototipo/" + Arrayfototipo, {}, function(usuarioc) {});
          $(".eliminar").remove();

        }
      }

      $("#f1").click(function() {
        bar = bar + 16.667;
        cont = cont + 1;

        $("#mensaje").html(mensajes[cont - 1]);
        Arrayfototipo.push(1);
        for (var i = 1; i < 7; i++) {
          $('#f' + i + '').css('background-image', 'url(images/' + cont + '' + i + '.jpg)');
        }
        $(".progress-bar").css('width', bar + '%');
        seven();

      });
      $("#f2").click(function() {
        bar = bar + 16.667;
        cont = cont + 1;

        $("#mensaje").html(mensajes[cont - 1]);
        Arrayfototipo.push(2);
        for (var i = 1; i < 7; i++) {

          $('#f' + i + '').css('background-image', 'url(images/' + cont + '' + i + '.jpg)');
        }
        $(".progress-bar").css('width', bar + '%');
       seven();
      });
      $("#f3").click(function() {
        cont = cont + 1;
        bar = bar + 16.667;

        $("#mensaje").html(mensajes[cont - 1]);
        Arrayfototipo.push(3);
        for (var i = 1; i < 7; i++) {
          $('#f' + i + '').css('background-image', 'url(images/' + cont + '' + i + '.jpg)');
        }
        $(".progress-bar").css('width', bar + '%');
        seven();
      });
      $("#f4").click(function() {
        cont = cont + 1;
        bar = bar + 16.667;
        $("#mensaje").html(mensajes[cont - 1]);
        Arrayfototipo.push(4);
        for (var i = 1; i < 7; i++) {
          $('#f' + i + '').css('background-image', 'url(images/' + cont + '' + i + '.jpg)');
        }
        $(".progress-bar").css('width', bar + '%');
        seven();
      });




    });