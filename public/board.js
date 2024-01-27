export default function renderboard(socket){
    
    function createboard(board){
        let k =1
        for(let i=1; i<4; i++){
            board.append(`<div id="line${i}"></div>`)
            for(let j=1; j<4; j++){
                $(`#line${i}`).append(`<div id="quad${k}" class="quad">
                <div id="l1">
                <div id="q${k}" class="cell"></div>
                <div id="q${k}" class="cell"></div>
                <div id="q${k}" class="cell"></div>
                </div>
                <div id="l2">
                <div id="q${k}" class="cell"></div>
                <div id="q${k}" class="cell"></div>
                <div id="q${k}" class="cell"></div>
                </div>
                <div id="l3">
                <div id="q${k}" class="cell"></div>
                <div id="q${k}" class="cell"></div>
                <div id="q${k}" class="cell"></div>
                </div>
                </div>`)
                k++
            }
        }

    }

    function cellToTable(index){

        let Tdraws = {
            1: [0, 9, 18, 27, 36, 45, 54, 63, 72],
            2: [1, 10, 19, 28, 37, 46, 55, 64, 73],
            3: [2, 11, 20, 29, 38, 47, 56, 65, 74],
            4: [3, 12, 21, 30, 39, 48, 57, 66, 75],
            5: [4, 13, 22, 31, 40, 49, 58, 67, 76],
            6: [5, 14, 23, 32, 41, 50, 59, 68, 77],
            7: [6, 15, 24, 33, 42, 51, 60, 69, 78],
            8: [7, 16, 25, 34, 43, 52, 61, 70, 79],
            9: [8, 17, 26, 35, 44, 53, 62, 71, 80]
        }

        for (let k in Tdraws){
            if (Tdraws[k].includes(index)) {
                return k
            }
        }

    }


    function activePlayer(index){
        var cells = document.querySelectorAll('.cell')
        cells.forEach((invalid)=>{
            invalid.removeAttribute('activate')
            invalid.setAttribute('activate','false')
        })
        if (document.querySelector(`#q${cellToTable(index)}`).getAttribute('winner') === 'true'){
            cells.forEach((valid)=>{
                valid.removeAttribute('activate')
                valid.setAttribute('activate','true')
            })

        }else{
        var ValidCells = document.querySelectorAll(`#q${cellToTable(index)}`)
        ValidCells.forEach((validate)=>{
            validate.removeAttribute('activate')
            validate.setAttribute('activate','true')
        })}

        
    }
    function blockPlayer(){
        var cells = document.querySelectorAll('.cell')
        cells.forEach((invalid)=>{
            invalid.removeAttribute('activate')
            invalid.setAttribute('activate','false')
        })
    }

    function quadWin(index){
        document.querySelectorAll(`#${index}`).forEach((winCell)=>{
            winCell.setAttribute('winner','true')
        })
    }




    function setlistern(player){
        var cells = document.querySelectorAll('.cell')
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                socket.emit('CellClick',{
                    'index': index,
                    'player': player[1]
                })
            });
        })
    }

    socket.on('ActivePlayer',data=>{
        console.log(data)
        activePlayer(data['index'])
        socket.emit('BlockPlayer',data)
    })

    socket.on('BlockPlayer',data=>{
        blockPlayer()

    })

    socket.on('QuadWin',data=>{
        quadWin(data['quad'])
    })




    return{
        createboard,
        setlistern
    }
}