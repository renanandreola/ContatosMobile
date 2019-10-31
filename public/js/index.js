var inputs = $('input').on('keyup', verificarInputs);
function verificarInputs() {
    const preenchidos = inputs.get().every(({value}) => value)
    $('button').prop('disabled', !preenchidos);
};

function send (event) {
  event.preventDefault();



  var name = $("#name").val();
  var email = $("#email").val();
  var phone = $("#phone").val();

  $("input").removeClass("invalid");

  // VÁLIDAÇÃO DOS CAMPOS DO FORMULÁRIO
if (name == "") {
  $("#name").addClass("invalid");
    return;
}

if (email == "") {
  $("#email").addClass("invalid");
    return
}

if (phone == "") {
  $("#phone").addClass("invalid");
    return
}else {
  var data = {
    name: name,
    phone: phone,
    email: email
  }
  $.post('/index', data, function (res) {
       if(res === 'ok') {
         setTimeout(function(){
          location.reload();
        },1500);
         $('index').trigger('reset');
         location.href = "/contacts";
       } else {
        }
    })
      clear();
  }
}
function clear (){
  $("#name").val("");
  $("#phone").val("");
  $("#email").val("");
}
