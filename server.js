const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname,'public'));
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req,res) =>{
    res.render('index.html')
})


//por room
let currentPlayer = 'O'
let playerNumber = 2

io.on('connection', socket => {

    if(playerNumber === 2){
        socket.emit('Player1define',[
            socket.id,
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X',
            playerNumber = playerNumber === 1 ? 2 : 1
        ])
    }else{
        socket.emit('Player2define',[
            socket.id,
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X',
            playerNumber = playerNumber === 1 ? 2 : 1
        ])
    }

    socket.on('Player2REQ',data=>{
        socket.broadcast.emit('Player2REQ',data)
    })
    socket.on('Player1REQ',data=>{
        socket.broadcast.emit('Player1REQ',data)
    })


    socket.on('CellClick', data =>{
        io.emit('fillCell',data)
        socket.emit('NextPlayer',data)
        socket.emit('CheckTable',data)
        
    })
    socket.on('ActivePlayer', data =>{
        socket.broadcast.emit('ActivePlayer',data)
    })
    socket.on('BlockPlayer',data=>{
        socket.broadcast.emit('BlockPlayer',data)
    })
    socket.on('QuadWin',data=>{
        console.log(socket.id+' marcou a '+data['quad'])
        io.emit('QuadWin',data)
        socket.broadcast.emit('ActivePlayer',data)
    })
    socket.on('GamesEnd',data =>{
        console.log(socket.id+' ganhou')
        io.emit('GamesEnd',socket.id)
        io.emit('BlockPlayer',null)
    })
    
})

server.listen(5000)