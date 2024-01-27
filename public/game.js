export default function Gamerules(socket){
    var GameBoard = []
    var Quads = []
    function GameWinner(){
        let winnerPatern = [
            [1, 5, 9],
            [3, 5, 7],
            [1, 2, 3],
            [1, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9]
        ]

        for (const pattern of winnerPatern) {
            const [a, b, c] = pattern;
            if (Quads[a] && Quads[a] === Quads[b] && Quads[a] === Quads[c]) {
                return true
            }
        }
    }
    function TableWinner(index){
        let cells = document.querySelectorAll('.cell')
        let winPatterns = [
            // rows
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11], [12, 13, 14], [15, 16, 17], [18, 19, 20], [21, 22, 23], [24, 25, 26], [27, 28, 29],
            [30, 31, 32], [33, 34, 35], [36, 37, 38], [39, 40, 41], [42, 43, 44], [45, 46, 47], [48, 49, 50], [51, 52, 53], [54, 55, 56],
            [57, 58, 59], [60, 61, 62], [63, 64, 65], [66, 67, 68], [69, 70, 71], [72, 73, 74], [75, 76, 77], [78, 79, 80],
            // columns
            [0, 3, 6], [1, 4, 7], [2, 5, 8], [9, 12, 15], [10, 13, 16], [11, 14, 17], [18, 21, 24], [19, 22, 25], [20, 23, 26], [27, 30, 33],
            [28, 31, 34], [29, 32, 35], [36, 39, 42], [37, 40, 43], [38, 41, 44], [45, 48, 51], [46, 49, 52], [47, 50, 53], [54, 57, 60],
            [55, 58, 61], [56, 59, 62], [63, 66, 69], [64, 67, 70], [65, 68, 71], [72, 75, 78], [73, 76, 79], [74, 77, 80],1
            //diagonals
            [0, 4, 8], [9, 13, 17], [18, 22, 26], [27, 31, 35], [36, 40, 44], [45, 49, 53], [54, 58, 62],
            [63, 67, 71], [72, 76, 80], [2, 4, 6], [11, 13, 15], [20, 22, 24], [29, 31, 33], [38, 40, 42], [47, 49, 51],
            [56, 58, 60], [65, 67, 69], [74, 76, 78]
        ]

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (GameBoard[a] && GameBoard[a] === GameBoard[b] && GameBoard[a] === GameBoard[c]) {
                Quads[cells[index].getAttribute('id')[1]] = GameBoard[a]
                socket.emit('QuadWin',{
                    quad:cells[index].getAttribute('id'),
                    index:index,
                    player:GameBoard[a]
            })
                delete GameBoard[a]; delete GameBoard[b]; delete GameBoard[c]
                let gameisover = GameWinner()
                if(gameisover){
                    socket.emit('GamesEnd')
                }
                
            }
        }
    }

    socket.on('CheckTable',data=>{
        GameBoard[data['index']]=data['player']
        TableWinner(data['index'])

    })
        
    
    return{
        TableWinner
    }
}