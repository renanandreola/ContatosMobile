var inputs = $('input').on('keyup', verificarInputs);
function verificarInputs() {
    const preenchidos = inputs.get().every(({value}) => value)
    $('button').prop('disabled', !preenchidos);
};

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function send (event) {
  event.preventDefault();



  var name = $("#name").val();
  var email = $("#email").val();
  var phone = $("#phone").val();

  $("input").removeClass("is-invalid");

  // VÁLIDAÇÃO DOS CAMPOS DO FORMULÁRIO
if (name == "") {
  $("#name").addClass("is-invalid");
    return;
}

if (email == "" || !validateEmail(email)) {
  $("#email").addClass("is-invalid");
    return
}

if (phone == "") {
  $("#phone").addClass("is-invalid");
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
