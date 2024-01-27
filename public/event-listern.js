export default function eventEmiter(socket){
    let currentplayer = []
    
    socket.on('Player1define', data =>{
        document.querySelector(`.Player1`).textContent = `ID: ${data[0]} (${data[1]})`
        currentplayer.push(data[0],data[1],data[2])
    })

    socket.on('Player1REQ',data=>{
        document.querySelector(`.Player1`).textContent = `ID: ${data[0]} (${data[1]})`
    })


    socket.on('Player2REQ',data=>{
        document.querySelector(`.Player2`).textContent = `ID: ${data[0]} (${data[1]})`
        socket.emit('Player1REQ',currentplayer)
    })

    socket.on('Player2define', data =>{
        document.querySelector(`.Player2`).textContent = `ID: ${data[0]} (${data[1]})`
        currentplayer.push(data[0],data[1],data[2])
        socket.emit('Player2REQ',data)
    })


    socket.on('fillCell',data=>{
        let cells = document.querySelectorAll('.cell')
        let index = data['index']
        let player = data['player']
        cells[index].textContent = player
        cells[index].setAttribute('filled','true')
    })

    socket.on('NextPlayer',data=>{
        socket.emit('ActivePlayer',data)
    })
    
    socket.on('GamesEnd',data=>{
        document.querySelector('.Winner').textContent = `${data} wins`
    })


    return{
        currentplayer
    }
}