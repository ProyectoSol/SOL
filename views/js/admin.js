$(document).ready(function() {
  $("#boton1").click(function() {
    var usuario = $('#campousuario').val();
    $.get("/clientedatos/" + usuario, function(usuarioc) {
      $('#usuario').val(usuarioc.usuario);
      $('#email').val(usuarioc.email);
      $('#dispositivo').val(usuarioc.dispositivo);
      $('#nombre').val(usuarioc.nombre);
      $('#apellido').val(usuarioc.apellido);
      $('#fechaNac').val(usuarioc.fecha);

      if (usuarioc.admin == '1') {
        $('#checkadmin').prop('checked', true);
      }
      else {
        $('#checkadmin').prop('checked', false);
      }

      if (usuarioc.confirmado == '1') {
        $('#checkconfirm').prop('checked', true);
      }
      else {
        $('#checkconfirm').prop('checked', false);
      }

    });
  });

});

$.ajax({
  type: "GET",
  url: 'https://sol-anthonyprz.c9users.io/usercompletos',
  dataType: "json",
  success: function(data) {
    var arrayUsu = [];
    for (var i = 0; i < data.length; i++) {
      arrayUsu.push(data[i].usuario);
    }
    $("#campousuario").autocomplete({
      source: arrayUsu
    });
    $("#numUsuarios").text(arrayUsu.length);

  },
  error: function(XMLHttpRequest, textStatus, errorThrown) {
    console.log("Status: " + textStatus);
    console.log("Error: " + errorThrown);
  }
});


//-----------------------------------------------DISPOSITIVO
$.ajax({
  type: "GET",
  url: 'https://sol-anthonyprz.c9users.io/dispositivoscompletos',
  dataType: "json",
  success: function(data) {
    var arrayDisp = [];
    for (var i = 0; i < data.length; i++) {
      arrayDisp.push(data[i].dispositivo);
    }
    $("#IdDispositivo").autocomplete({
      source: arrayDisp
    });
    $("#numDispositivos").text(arrayDisp.length);


  },
  error: function(XMLHttpRequest, textStatus, errorThrown) {
    console.log("Status: " + textStatus);
    console.log("Error: " + errorThrown);
  }
});

$(document).ready(function() {
  $("#boton2").click(function() {
    var dispositivo = $('#IdDispositivo').val();
    $.get("/dispositivo/" + dispositivo, {
      dispositivo: dispositivo
    }, function(dispositivoC) {
      $('#ddispositivo').val(dispositivoC.dispositivo);
      $('#ciudad').val(dispositivoC.ciudad);

    });
  });
});