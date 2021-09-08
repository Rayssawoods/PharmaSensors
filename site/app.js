var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nodeMailer = require('nodemailer');
var bodyParser = require('body-parser');

//Registrar as rotas
var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var leiturasRouter = require('./routes/leituras');
var usersRouter = require('./routes/users');
var app = express();



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Usar as rotas registradas

app.use('/', indexRouter);

app.use('/usuarios', usuariosRouter);
app.use('/leituras', leiturasRouter);
app.use('/users', usersRouter);

app.post('/send-email', function (req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            // should be replaced with real sender's account
            user: 'oscar.casavelha@gmail.com',
            pass: 'StephenHawking11'
        }
    });
    let mailOptions = {
        // should be replaced with real recipient's account
        // from: req.body.from,
        to: 'support@grupopharmasensors.zendesk.com',
        subject: req.body.subject,
        body: req.body.message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.writeHead(301, { Location: 'interno/contate-nos.html' });
    res.end();
  });
  let server = app.listen(8081, function(){
    let port = server.address().port;
    console.log("Server started at http://localhost:3000", port);
});


module.exports = app;
