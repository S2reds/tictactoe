function player(name) {
    let wins = 0
    return {name, wins}
}

const gameBoard = (function() {
    let board = [null,null,null,null,null,null,null,null,null]
    let count = 0;
    let xplayer = true;
    const htmlBoard = document.querySelector('.board')
    const player1win = document.querySelector('#wins1')
    const player2win = document.querySelector('#wins2')
    const player1 = document.querySelector('#x')
    const player2 = document.querySelector('#o')    
    let xguy = player('X')
    let oguy = player('O')

    const colorIndicator = (function() {
        if (xplayer === true) {
            player1.style.color = 'green';
            player2.style.color = 'black'
        } else {
            player2.style.color = 'green';
            player1.style.color = 'black'
        }
    })
    // display board to screen
    const newBoard = (function() {
        count = 0;
        htmlBoard.innerHTML = '';
        xplayer = true;
        player1win.textContent = `${xguy.wins} Wins`
        player2win.textContent = `${oguy.wins} Wins`
        colorIndicator();
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
        let [winner, ] = x.split(' ')
        if (winner === xguy['name']) xguy.wins++    
        else if (winner === oguy['name']) oguy.wins++
    })
    // check for win
    const checkwin = (function() {
        if ((board[0] !== null && board[0] === board[1]) && (board[1] === board[2] && board[0] === 'X')) endscreen(`${xguy.name} Wins`)
        else if ((board[3] !== null && board[3] === board[4]) && (board[4] === board[5] && board[5] === 'X')) endscreen(`${xguy.name} Wins`)
        else if ((board[6] !== null && board[6] === board[7]) && (board[7] === board[8] && board[8] === 'X')) endscreen(`${xguy.name} Wins`)
        else if ((board[0] !== null && board[0] === board[3]) && (board[3] === board[6] && board[6] === 'X')) endscreen(`${xguy.name} Wins`)
        else if ((board[1] !== null && board[1] === board[4]) && (board[4] === board[7] && board[7] === 'X')) endscreen(`${xguy.name} Wins`)
        else if ((board[2] !== null && board[2] === board[5]) && (board[5] === board[8] && board[8] === 'X')) endscreen(`${xguy.name} Wins`)
        else if ((board[0] !== null && board[0] === board[4]) && (board[4] === board[8] && board[8] === 'X')) endscreen(`${xguy.name} Wins`)
        else if ((board[2] !== null && board[2] === board[4]) && (board[4] === board[6] && board[6] === 'X')) endscreen(`${xguy.name} Wins`)

        else if ((board[0] !== null && board[0] === board[1]) && (board[1] === board[2] && board[0] === 'O')) endscreen(`${oguy.name} Wins`)
        else if ((board[3] !== null && board[3] === board[4]) && (board[4] === board[5] && board[5] === 'O')) endscreen(`${oguy.name} Wins`)
        else if ((board[6] !== null && board[6] === board[7]) && (board[7] === board[8] && board[8] === 'O')) endscreen(`${oguy.name} Wins`)
        else if ((board[0] !== null && board[0] === board[3]) && (board[3] === board[6] && board[6] === 'O')) endscreen(`${oguy.name} Wins`)
        else if ((board[1] !== null && board[1] === board[4]) && (board[4] === board[7] && board[7] === 'O')) endscreen(`${oguy.name} Wins`)
        else if ((board[2] !== null && board[2] === board[5]) && (board[5] === board[8] && board[8] === 'O')) endscreen(`${oguy.name} Wins`)
        else if ((board[0] !== null && board[0] === board[4]) && (board[4] === board[8] && board[8] === 'O')) endscreen(`${oguy.name} Wins`)
        else if ((board[2] !== null && board[2] === board[4]) && (board[4] === board[6] && board[6] === 'O')) endscreen(`${oguy.name} Wins`)
        else {
            const checkboard = board.includes(null)   
            if (checkboard === false) endscreen('Draw')
        }
        return false;
    })

    
    const reset = (function() {
        board = [null,null,null,null,null,null,null,null,null]
        newBoard();
    })


    // place mark
    const place = function(e) {
        if (xplayer === true) {
            board[e.target.value] = 'X'
            e.target.textContent = 'X'
            xplayer = !xplayer
            colorIndicator()
            checkwin()
        }
        else if (xplayer === false) {
            board[e.target.value] = 'O'
            e.target.textContent = 'O'
            xplayer = !xplayer
            colorIndicator()
            checkwin()
        }
    }

    return {board, place, checkwin, reset, xguy, oguy}
})();



// eventHandlers for each position
const resetHandlers = (function() {
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
})
resetHandlers();

// retry button at endscreen
const retry = document.querySelector('#retry')
retry.addEventListener('click', (() => {
    const end = document.querySelector('.endscreen')
    end.style.visibility = 'hidden'
    gameBoard.reset();
    resetHandlers();
}))

// change name buttons
const player1 = document.querySelector('#x')
const player2 = document.querySelector('#o')
const change = document.querySelectorAll('.change')
change.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let value = prompt('New Name?')
        if (e.target.value === gameBoard.xguy.name) {
            player1.textContent =  value
            gameBoard.xguy.name = value
        }
        else if (e.target.value === gameBoard.oguy.name) {
            player2.textContent = value
            gameBoard.oguy.name = value
        }
    })
})

