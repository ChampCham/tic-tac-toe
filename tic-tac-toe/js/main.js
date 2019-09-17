$(document).ready(function () {
    const computer = "O";
    const player = "X";
    const dimension  = 4;
    const boxWidth = 350;
    const innerPadding = 10;
    const boards = [];
    let gameOver = false;

    init();
    reset();

    $(".tic").click(function () {
        let slot = $(this).attr('id');
        playerTurn(slot);
        computersTurn();
    });

    $("#reset").click(function () {
        reset();
    });

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    };

    const computersTurn = () => {
        if (!gameOver) {
            let spotTaken = "x";
            let id;
            do {
                id = getRandomInt(boards.length - 1);
                spotTaken = $("#" + id).text();
                console.log(gameOver);
            } while (spotTaken !== "");


            $('#' + id).text(computer);
            boards[id] = computer;

            if (winCondition(id) || !boards.includes("")) {
                $("#message").html("Player " + player + " loss !!");
                gameOver = true;
                // reset();
            }
        }

    };

    function playerTurn(id) {
        if (!gameOver) {
            let spotTaken = $("#" + id).text();
            if (spotTaken === "") {
                $('#' + id).text(player);
                boards[id] = player;
            }
            if (winCondition(+id) || !boards.includes("")) {
                $("#message").html("Player " + player + " win !!");
                gameOver = true;
                //reset();
            }
        }
    }

    function winCondition(currentMove) {
        let  v = 0;
        let  h = 0;
        let  dl = 0;
        let  dr = 0;
        // Fill
        const col = currentMove%dimension;
        const row = Math.floor(currentMove/dimension);
        for (let i = 0; i < dimension; i++){
            //Check horizontal condition
            if (boards[currentMove] === boards[dimension*row+i]){
                h++;
            }
            //Check vertical condition
            if (boards[currentMove] === boards[col+dimension*i]) {
                v++;
            }
            //Check diagonal condition
            if (boards[currentMove] === boards[(dimension+1)*i]){
                dl++;
            }

            if (boards[currentMove] === boards[(dimension-1)*(i+1)]){
                dr++;
            }
        }
        if (v === dimension ||
            h === dimension ||
            dl === dimension ||
            dr === dimension) {
            return true;
        }
    }

    function reset() {
        boards.fill('');
        count = 0;
        $(".tic").text('');
        $("#message").html("Player " + player + " gets to start!");
        gameOver = false;
    }

    function init() {
        const value = boxWidth/dimension - (innerPadding/2) *dimension;
        for (let i = 0; i < dimension**2; i++) {
            $("#gameBoard")
                .append(`<li class="tic" id=${i}></li>`);
            boards.push("");
        }
        $(".tic")
            .css({"height": value+"px",
                "width": value+"px",
                "margin":innerPadding+"px"});
    }

});