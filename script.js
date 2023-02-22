function player(name) {
    return {name}
}

const gameBoard = (function() {
    let board = [null,null,null,null,null,null,null,null,null]
    let count = 0;
    let xplayer = true;
    const htmlBoard = document.querySelector('.board')

    // display board to screen
    const newBoard = (function() {
        count = 0;
        htmlBoard.innerHTML = '';
        board.map(x => {
            const div = document.createElement("div")
            div.classList.add('free')
            div.textContent = x;
            div.value = count
            htmlBoard.appendChild(div)            
            count++
            return count;    
        })
    })
    newBoard();

    // show endscreen
    const endscreen = (function(x) {
        const end = document.querySelector('.endscreen')
        const result = document.querySelector('#result')
        end.style.visibility = 'visible';
        result.textContent = `${x}`        
    })
    // check for win
    const checkwin = (function() {
        if ((board[0] !== null && board[0] === board[1]) && (board[1] === board[2] && board[0] === 'X')) endscreen('X Wins')
        else if ((board[3] !== null && board[3] === board[4]) && (board[4] === board[5] && board[5] === 'X')) endscreen('X Wins')
        else if ((board[6] !== null && board[6] === board[7]) && (board[7] === board[8] && board[8] === 'X')) endscreen('X Wins')
        else if ((board[0] !== null && board[0] === board[3]) && (board[3] === board[6] && board[6] === 'X')) endscreen('X Wins')
        else if ((board[1] !== null && board[1] === board[4]) && (board[4] === board[7] && board[7] === 'X')) endscreen('X Wins')
        else if ((board[2] !== null && board[2] === board[5]) && (board[5] === board[8] && board[8] === 'X')) endscreen('X Wins')
        else if ((board[0] !== null && board[0] === board[4]) && (board[4] === board[8] && board[8] === 'X')) endscreen('X Wins')
        else if ((board[2] !== null && board[2] === board[4]) && (board[4] === board[6] && board[6] === 'X')) endscreen('X Wins')

        if ((board[0] !== null && board[0] === board[1]) && (board[1] === board[2] && board[0] === 'O')) endscreen('O Wins')
        else if ((board[3] !== null && board[3] === board[4]) && (board[4] === board[5] && board[5] === 'O')) endscreen('O Wins')
        else if ((board[6] !== null && board[6] === board[7]) && (board[7] === board[8] && board[8] === 'O')) endscreen('O Wins')
        else if ((board[0] !== null && board[0] === board[3]) && (board[3] === board[6] && board[6] === 'O')) endscreen('O Wins')
        else if ((board[1] !== null && board[1] === board[4]) && (board[4] === board[7] && board[7] === 'O')) endscreen('O Wins')
        else if ((board[2] !== null && board[2] === board[5]) && (board[5] === board[8] && board[8] === 'O')) endscreen('O Wins')
        else if ((board[0] !== null && board[0] === board[4]) && (board[4] === board[8] && board[8] === 'O')) endscreen('O Wins')
        else if ((board[2] !== null && board[2] === board[4]) && (board[4] === board[6] && board[6] === 'O')) endscreen('O Wins')
    })

    
    const reset = (function() {
        board = [null,null,null,null,null,null,null,null,null]
        newBoard();
    })
    
    // check for draw
    const checkdraw = (function() {
        const checkboard = board.includes(null)
        if (checkboard === false) {
           endscreen('Draw')
           
        }

    })

    // place mark
    const place = function(e) {
        if (xplayer === true) {
            board[e.target.value] = 'X'
            e.target.textContent = 'X'
            xplayer = !xplayer
            checkwin()
            checkdraw()
        }
        else if (xplayer === false) {
            board[e.target.value] = 'O'
            e.target.textContent = 'O'
            xplayer = !xplayer
            checkwin()
            checkdraw()
        }
    }

    return {board, place, checkwin, newBoard}
})();



// eventHandlers for each position
const spaces = document.querySelectorAll('.free')
spaces.forEach(space => {
    space.addEventListener('click', (e) => {
        if (space.classList.contains('free')) {
            gameBoard.place(e)
            space.classList.remove('free')
            space.classList.add('taken')
        }
        else if (space.classList.contains('taken'))
            console.log('spot is taken')
    })
})

// retry button at endscreen
const retry = document.querySelector('#retry')
retry.addEventListener('click', (() => {
    
}))


