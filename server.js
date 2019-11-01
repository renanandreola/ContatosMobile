const express = require('express');
const system = express();
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const restify = require('restify');
const mongoose = require('mongoose');
const MONGODB_URL = "mongodb+srv://renan:renan@contatosmobile-pjbzy.gcp.mongodb.net/contatos?retryWrites=true&w=majority";
const ContactsSchema = require('./schemas/contacts');

var port = process.env.PORT || 3000;

let env = nunjucks.configure('views', {
    autoescape: true,
    express: system
});

system.set('engine', env);

require('useful-nunjucks-filters')(env);

const Contacts = mongoose.model('contacts', ContactsSchema);

//MONGO
mongoose.connect(MONGODB_URL, {useNewUrlParser: true}, err => {
    if (err) {
        console.error('[SERVER_ERROR] MongoDB Connection:', err);
        process.exit(1);
    }
    console.info('Mongo connected');


    system.listen(port, () => {
      console.log('Escutando na porta ' + port);
    });

});

//

//NUNJUCKS
system.use(bodyParser.json());       // to support JSON-encoded bodies
system.use(bodyParser.urlencoded({     // to support URL-encoded bodies
extended: true
}));

system.use(express.static('public'));

//

//PÁGINAS
system.get('/', (req, res) => {
  res.render('contacts.html');
});

system.get('/contacts', (req, res) => {
  Contacts.find((err, contacts) => {
       res.render('contacts.html', {contacts: contacts});
     });
 });

//

//REQUISIÇÃO
system.post('/index', (req, res) => {
  var contacts = new Contacts(req.body);

  contacts.save((err, contacts) => {
    console.info(contacts.name + ' salvo');
    res.send('ok');
  })
});
