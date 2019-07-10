const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(cors());


const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const cors = require('cors');


io.on('connection',socket =>{
    socket.on('connectRoom', box => {
        socket.join(box);
    });
});

mongoose.connect(
    'mongodb+srv://omnistack:omnistack@cluster0-zxxkg.mongodb.net/omnistack?retryWrites=true&w=majority',
    {
    useNewUrlParser: true
}
);

app.use((req,res, next) => {
    req.io = io;

    return next;
});


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(3333);

