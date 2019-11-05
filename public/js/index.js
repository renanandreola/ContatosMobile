var inputs = $('#insert input').on('keyup', verificarInputs);
function verificarInputs() {
    const preenchidos = inputs.get().every(({value}) => value)
    $('#insert button').prop('disabled', !preenchidos);
};

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateName(name){
return !!name.match(/[A-Z][a-z]* [A-Z][a-z]*/);
}

function send (event) {
  event.preventDefault();



  var name = $("#name").val();
  var email = $("#email").val();
  var phone = $("#phone").val();


  $("input").removeClass("is-invalid");

  // VÁLIDAÇÃO DOS CAMPOS DO FORMULÁRIO
if (name == "" || !validateName(name)) {
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

function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

//
function openNavright() {
  document.getElementById("mySidenavright").style.width = "100%";
}

/* Set the width of the side navigation to 0 */
function closeNavright() {
  document.getElementById("mySidenavright").style.width = "0";
}

//

// PHONE MASK
$("#phone").mask("(99) 9999-9999?9");






//
//
// $('#namer').click(function () {
//   $.ajax({
//     url: '/api/contacts/' + $(this).attr('id'),
//     success: function (r) {
//       $("#nameright").val(r.name);
//       $("#emailright").val(r.email);
//       $("#phoneright").val(r.phone);
//      }
//   });
// });
