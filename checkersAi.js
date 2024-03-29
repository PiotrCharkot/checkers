let userPlayer = "white";
let aiPlayer = "black";
let userPlayerTurn = true;
let userResult = 0;
let aiResult = 0;
let coinflip;
let drawingQueue = []; // for displaying multiple captures made by AI
let ind = 0;
let tempValStepOne; // values used in optimalization process
let tempValStepTwo;
let tempValStepThree;
let tempValStepFour;
let tempValStepFive;
let tempValStepSix;
let tempValStepSeven;
let tempValStepEight;
let tempValStepNine;
let tempValStepTen;
let darkSquareArray = [];
let isForcedResponse = false;
let continueCaptureFrom = "none";
let pawnBonus = 3;
let stepNumber;
let stepLimit = 6; // number of moves ahead for analysis, takes only even numbers, (6 for resonable time)
let saveStepLimit = stepLimit;
let opponentKingX = null;
let opponentKingY = null;
let opponentKingsCount = 0;
let aiKingNum = 0;
let userKingNum = 0;
let totalPawnNumber = 0;
let isFieldChoosen;
let validMove;
let validMoveForced;
let myPreviousTarget;
let gameOn = false;
let playerChoseSide = false;
let noMorePawns = false;
let drawLimit = 14;
let drawCountDown = drawLimit;
let showOfferDraw = false;

let chooseEasyLink = document.getElementById("chooseEasy");
let chooseHardLink = document.getElementById("chooseHard");
let chooseColorWhiteLink = document.getElementById("colorWhite");
let chooseColorBlackLink = document.getElementById("colorBlack");
let chooseColorRandomLink = document.getElementById("colorRandom");
let chessBoardDiv = document.querySelector(".chessBoard");
let chessBoardDivSmall = document.querySelector(".chessBoardSmall");
let resultTextDiv = document.getElementById("resultText");
let resultTestContent = document.getElementById("resultTextContent");
let drawTextContent = document.getElementById("acceptDrawText");
let buttonYes = document.getElementById("buttonYes");
let buttonNo = document.getElementById("buttonNo");


//points for certain position:
//pawns on line 1-7 => 8,4,6,8,10,12,16
//king => 24
//if opponetnt kings count > 0 => king gets points for aproaching kings opponents
//if opponennt kings count = 0 => king gets points for aproching center of a board 



class GameState {
    constructor (path, A1, C1, E1, G1, B2, D2, F2, H2, A3, C3, E3, G3, B4, D4, F4, H4, A5, C5, E5, G5, B6, D6, F6, H6, A7, C7, E7, G7, B8, D8, F8, H8, border, playerWhiteMoveOptions, playerBlackMoveOptions) {
        this.path = path;
        this.A1 = A1; 
        this.C1 = C1; 
        this.E1 = E1; 
        this.G1 = G1; 
        this.B2 = B2; 
        this.D2 = D2; 
        this.F2 = F2; 
        this.H2 = H2; 
        this.A3 = A3; 
        this.C3 = C3; 
        this.E3 = E3; 
        this.G3 = G3; 
        this.B4 = B4; 
        this.D4 = D4; 
        this.F4 = F4; 
        this.H4 = H4; 
        this.A5 = A5; 
        this.C5 = C5; 
        this.E5 = E5; 
        this.G5 = G5; 
        this.B6 = B6; 
        this.D6 = D6; 
        this.F6 = F6; 
        this.H6 = H6; 
        this.A7 = A7; 
        this.C7 = C7; 
        this.E7 = E7; 
        this.G7 = G7; 
        this.B8 = B8; 
        this.D8 = D8; 
        this.F8 = F8; 
        this.H8 = H8; 
        this.border = border; 
        this.playerWhiteMoveOptions = playerWhiteMoveOptions;
        this.playerBlackMoveOptions = playerBlackMoveOptions;

        this.playerWhiteMoveOptions.A1 = {
            moveOptions: [this.B2],
            jumpOptions: [this.C3],
            moveOptionsKing: [this.B2],
            jumpOptionsKing: [this.C3],
        }; 
        this.playerWhiteMoveOptions.C1 = {
            moveOptions: [this.B2, this.D2],
            jumpOptions: [this.A3, this.E3],
            moveOptionsKing: [this.B2, this.D2],
            jumpOptionsKing: [this.A3, this.E3],
        }; 
        this.playerWhiteMoveOptions.E1 = {
            moveOptions: [this.D2, this.F2],
            jumpOptions: [this.C3, this.G3],
            moveOptionsKing: [this.D2, this.F2],
            jumpOptionsKing: [this.C3, this.G3],
        }; 
        this.playerWhiteMoveOptions.G1 = {
            moveOptions: [this.F2, this.H2],
            jumpOptions: [this.E3, this.border],
            moveOptionsKing: [this.F2, this.H2],
            jumpOptionsKing: [this.E3, this.border],
        }; 
        this.playerWhiteMoveOptions.B2 = {
            moveOptions: [this.A3, this.C3],
            jumpOptions: [this.border, this.D4],
            moveOptionsKing: [this.A3, this.C3, this.C1, this.A1],
            jumpOptionsKing: [this.border, this.D4, this.border, this.border],
        }; 
        this.playerWhiteMoveOptions.D2 =  {
            moveOptions: [this.C3, this.E3],
            jumpOptions: [this.B4, this.F4],
            moveOptionsKing: [this.C3, this.E3, this.E1, this.C1],
            jumpOptionsKing: [this.B4, this.F4, this.border, this.border],
        }; 
        this.playerWhiteMoveOptions.F2 = {
            moveOptions: [this.E3, this.G3],
            jumpOptions: [this.D4, this.H4],
            moveOptionsKing: [this.E3, this.G3, this.G1, this.E1],
            jumpOptionsKing: [this.D4, this.H4, this.border, this.border],
        }; 
        this.playerWhiteMoveOptions.H2 = {
            moveOptions: [this.G3],
            jumpOptions: [this.F4],
            moveOptionsKing: [this.G3, this.G1],
            jumpOptionsKing: [this.F4, this.border],
        }; 
        this.playerWhiteMoveOptions.A3 = {
            moveOptions: [this.B4],
            jumpOptions: [this.C5],
            moveOptionsKing: [this.B4, this.B2],
            jumpOptionsKing: [this.C5, this.C1],
        }; 
        this.playerWhiteMoveOptions.C3 = {
            moveOptions: [this.B4, this.D4],
            jumpOptions: [this.A5, this.E5],
            moveOptionsKing: [this.B4, this.D4,this.D2, this.B2],
            jumpOptionsKing: [this.A5, this.E5, this.E1, this.A1],
        }; 
        this.playerWhiteMoveOptions.E3 = {
            moveOptions: [this.D4, this.F4],
            jumpOptions: [this.C5, this.G5],
            moveOptionsKing: [this.D4, this.F4, this.F2, this.D2],
            jumpOptionsKing: [this.C5, this.G5, this.G1, this.C1],
        }; 
        this.playerWhiteMoveOptions.G3 = {
            moveOptions: [this.F4, this.H4],
            jumpOptions: [this.E5, this.border],
            moveOptionsKing: [this.F4, this.H4, this.H2, this.F2],
            jumpOptionsKing: [this.E5, this.border, this.border, this.E1],
        }; 
        this.playerWhiteMoveOptions.B4 =  {
            moveOptions: [this.A5, this.C5],
            jumpOptions: [this.border, this.D6],
            moveOptionsKing: [this.A5, this.C5, this.C3, this.A3],
            jumpOptionsKing: [this.border, this.D6, this.D2, this.border],
        }; 
        this.playerWhiteMoveOptions.D4 = {
            moveOptions: [this.C5, this.E5],
            jumpOptions: [this.B6, this.F6],
            moveOptionsKing: [this.C5, this.E5, this.E3, this.C3],
            jumpOptionsKing: [this.B6, this.F6, this.F2, this.B2],
        }; 
        this.playerWhiteMoveOptions.F4 = {
            moveOptions: [this.E5, this.G5],
            jumpOptions: [this.D6, this.H6],
            moveOptionsKing: [this.E5, this.G5, this.G3, this.E3],
            jumpOptionsKing: [this.D6, this.H6, this.H2, this.D2],
        }; 
        this.playerWhiteMoveOptions.H4 = {
            moveOptions: [this.G5],
            jumpOptions: [this.F6],
            moveOptionsKing: [this.G5, this.G3],
            jumpOptionsKing: [this.F6, this.F2],
        }; 
        this.playerWhiteMoveOptions.A5 = {
            moveOptions: [this.B6],
            jumpOptions: [this.C7],
            moveOptionsKing: [this.B6, this.B4],
            jumpOptionsKing: [this.C7, this.C3],
        }; 
        this.playerWhiteMoveOptions.C5 = {
            moveOptions: [this.B6, this.D6],
            jumpOptions: [this.A7, this.E7],
            moveOptionsKing: [this.B6, this.D6, this.D4, this.B4],
            jumpOptionsKing: [this.A7, this.E7, this.E3, this.A3],
        }; 
        this.playerWhiteMoveOptions.E5 = {
            moveOptions: [this.D6, this.F6],
            jumpOptions: [this.C7, this.G7],
            moveOptionsKing: [this.D6, this.F6, this.F4, this.D4],
            jumpOptionsKing: [this.C7, this.G7, this.G3, this.C3],
        }; 
        this.playerWhiteMoveOptions.G5 = {
            moveOptions: [this.F6, this.H6],
            jumpOptions: [this.E7, this.border],
            moveOptionsKing: [this.F6, this.H6, this.H4, this.F4],
            jumpOptionsKing: [this.E7, this.border, this.border, this.E3],
        }; 
        this.playerWhiteMoveOptions.B6 = {
            moveOptions: [this.A7, this.C7],
            jumpOptions: [this.border, this.D8],
            moveOptionsKing: [this.A7, this.C7, this.C5, this.A5],
            jumpOptionsKing: [this.border, this.D8, this.D4, this.border],
        }; 
        this.playerWhiteMoveOptions.D6 = {
            moveOptions: [this.C7, this.E7],
            jumpOptions: [this.B8, this.F8],
            moveOptionsKing: [this.C7, this.E7, this.E5, this.C5],
            jumpOptionsKing: [this.B8, this.F8, this.F4, this.B4],
        }; 
        this.playerWhiteMoveOptions.F6 = {
            moveOptions: [this.E7, this.G7],
            jumpOptions: [this.D8, this.H8],
            moveOptionsKing: [this.E7, this.G7, this.G5, this.E5],
            jumpOptionsKing: [this.D8, this.H8, this.H4, this.D4],
        }; 
        this.playerWhiteMoveOptions.H6 = {
            moveOptions: [this.G7],
            jumpOptions: [this.F8],
            moveOptionsKing: [this.G7, this.G5],
            jumpOptionsKing: [this.F8, this.F4],
        }; 
        this.playerWhiteMoveOptions.A7 = {
            moveOptions: [this.B8],
            jumpOptions: [this.border],
            moveOptionsKing: [this.B8, this.B6],
            jumpOptionsKing: [this.border, this.C5],
        }; 
        this.playerWhiteMoveOptions.C7 = {
            moveOptions: [this.B8, this.D8],
            jumpOptions: [this.border, this.border],
            moveOptionsKing: [this.B8, this.D8, this.D6, this.B6],
            jumpOptionsKing: [this.border, this.border, this.E5, this.A5],
        }; 
        this.playerWhiteMoveOptions.E7 = {
            moveOptions: [this.D8, this.F8],
            jumpOptions: [this.border, this.border],
            moveOptionsKing: [this.D8, this.F8, this.F6, this.D6],
            jumpOptionsKing: [this.border, this.border, this.G5, this.C5],
        }; 
        this.playerWhiteMoveOptions.G7 = {
            moveOptions: [this.F8, this.H8],
            jumpOptions: [this.border, this.border],
            moveOptionsKing: [this.F8, this.H8, this.H6, this.F6],
            jumpOptionsKing: [this.border, this.border, this.border, this.E5],
        }; 
        this.playerWhiteMoveOptions.B8 = {
            moveOptions: [this.border],
            jumpOptions: [this.border],
            moveOptionsKing: [this.C7, this.A7],
            jumpOptionsKing: [this.D6, this.border],
        }; 
        this.playerWhiteMoveOptions.D8 = {
            moveOptions: [this.border],
            jumpOptions: [this.border],
            moveOptionsKing: [this.E7, this.C7],
            jumpOptionsKing: [this.F6, this.B6],
        }; 
        this.playerWhiteMoveOptions.F8 = {
            moveOptions: [this.border],
            jumpOptions: [this.border],
            moveOptionsKing: [this.G7, this.E7],
            jumpOptionsKing: [this.H6, this.D6],
        }; 
        this.playerWhiteMoveOptions.H8 = {
            moveOptions: [this.border],
            jumpOptions: [this.border],
            moveOptionsKing: [this.G7],
            jumpOptionsKing: [this.F6],
        }; 

        this.playerBlackMoveOptions.A1 = {
            moveOptions: [this.border],
            jumpOptions: [this.border],
            moveOptionsKing: [this.B2],
            jumpOptionsKing: [this.C3],
        }; 
        this.playerBlackMoveOptions.C1 = {
            moveOptions: [this.border],
            jumpOptions: [this.border],
            moveOptionsKing: [this.B2, this.D2],
            jumpOptionsKing: [this.A3, this.E3],
        }; 
        this.playerBlackMoveOptions.E1 = {
            moveOptions: [this.border],
            jumpOptions: [this.border],
            moveOptionsKing: [this.D2, this.F2],
            jumpOptionsKing: [this.C3, this.G3],
        }; 
        this.playerBlackMoveOptions.G1 = {
            moveOptions: [this.border],
            jumpOptions: [this.border],
            moveOptionsKing: [this.F2, this.H2],
            jumpOptionsKing: [this.E3, this.border],
        }; 
        this.playerBlackMoveOptions.B2 = {
            moveOptions: [this.C1, this.A1],
            jumpOptions: [this.border, this.border],
            moveOptionsKing: [this.C1, this.A1, this.A3, this.C3],
            jumpOptionsKing: [this.border, this.border, this.border, this.D4],
        }; 
        this.playerBlackMoveOptions.D2 = {
            moveOptions: [this.E1, this.C1],
            jumpOptions: [this.border, this.border],
            moveOptionsKing: [this.E1, this.C1, this.C3, this.E3],
            jumpOptionsKing: [this.border, this.border, this.B4, this.F4],
        }; 
        this.playerBlackMoveOptions.F2 = {
            moveOptions: [this.G1, this.E1],
            jumpOptions: [this.border, this.border],
            moveOptionsKing: [this.G1, this.E1, this.E3, this.G3],
            jumpOptionsKing: [this.border, this.border, this.D4, this.H4],
        }; 
        this.playerBlackMoveOptions.H2 = {
            moveOptions: [this.G1],
            jumpOptions: [this.border],
            moveOptionsKing: [this.G1, this.G3],
            jumpOptionsKing: [this.border, this.F4],
        }; 
        this.playerBlackMoveOptions.A3 = {
            moveOptions: [this.B2],
            jumpOptions: [this.C1],
            moveOptionsKing: [this.B2, this.B4],
            jumpOptionsKing: [this.C1, this.C5],
        }; 
        this.playerBlackMoveOptions.C3 = {
            moveOptions: [this.D2, this.B2],
            jumpOptions: [this.E1, this.A1],
            moveOptionsKing: [this.D2, this.B2, this.B4, this.D4],
            jumpOptionsKing: [this.E1, this.A1, this.A5, this.E5],
        }; 
        this.playerBlackMoveOptions.E3 = {
            moveOptions: [this.F2, this.D2],
            jumpOptions: [this.G1, this.C1],
            moveOptionsKing: [this.F2, this.D2, this.D4, this.F4],
            jumpOptionsKing: [this.G1, this.C1, this.C5, this.G5],
        }; 
        this.playerBlackMoveOptions.G3 = {
            moveOptions: [this.H2, this.F2],
            jumpOptions: [this.border, this.E1],
            moveOptionsKing: [this.H2, this.F2, this.F4, this.H4],
            jumpOptionsKing: [this.border, this.E1, this.E5, this.border],
        }; 
        this.playerBlackMoveOptions.B4 = {
            moveOptions: [this.C3, this.A3],
            jumpOptions: [this.D2, this.border],
            moveOptionsKing: [this.C3, this.A3, this.A5, this.C5],
            jumpOptionsKing: [this.D2, this.border, this.border, this.D6],
        }; 
        this.playerBlackMoveOptions.D4 = {
            moveOptions: [this.E3, this.C3],
            jumpOptions: [this.F2, this.B2],
            moveOptionsKing: [this.E3, this.C3, this.C5, this.E5],
            jumpOptionsKing: [this.F2, this.B2, this.B6, this.F6],
        }; 
        this.playerBlackMoveOptions.F4 = {
            moveOptions: [this.G3, this.E3],
            jumpOptions: [this.H2, this.D2],
            moveOptionsKing: [this.G3, this.E3, this.E5, this.G5],
            jumpOptionsKing: [this.H2, this.D2, this.D6, this.H6],
        }; 
        this.playerBlackMoveOptions.H4 = {
            moveOptions: [this.G3],
            jumpOptions: [this.F2],
            moveOptionsKing: [this.G3, this.G5],
            jumpOptionsKing: [this.F2, this.F6],
        }; 
        this.playerBlackMoveOptions.A5 = {
            moveOptions: [this.B4],
            jumpOptions: [this.C3],
            moveOptionsKing: [this.B4, this.B6],
            jumpOptionsKing: [this.C3, this.C7],
        }; 
        this.playerBlackMoveOptions.C5 = {
            moveOptions: [this.D4, this.B4],
            jumpOptions: [this.E3, this.A3],
            moveOptionsKing: [this.D4, this.B4, this.B6, this.D6],
            jumpOptionsKing: [this.E3, this.A3, this.A7, this.E7],
        }; 
        this.playerBlackMoveOptions.E5 = {
            moveOptions: [this.F4, this.D4],
            jumpOptions: [this.G3, this.C3],
            moveOptionsKing: [this.F4, this.D4, this.D6, this.F6],
            jumpOptionsKing: [this.G3, this.C3, this.C7, this.G7],
        }; 
        this.playerBlackMoveOptions.G5 = {
            moveOptions: [this.H4, this.F4],
            jumpOptions: [this.border, this.E3],
            moveOptionsKing: [this.H4, this.F4, this.F6, this.H6],
            jumpOptionsKing: [this.border, this.E3, this.E7, this.border],
        }; 
        this.playerBlackMoveOptions.B6 = {
            moveOptions: [this.C5, this.A5],
            jumpOptions: [this.D4, this.border],
            moveOptionsKing: [this.C5, this.A5, this.A7, this.C7],
            jumpOptionsKing: [this.D4, this.border, this.border, this.D8],
        }; 
        this.playerBlackMoveOptions.D6 = {
            moveOptions: [this.E5, this.C5],
            jumpOptions: [this.F4, this.B4],
            moveOptionsKing: [this.E5, this.C5, this.C7, this.E7],
            jumpOptionsKing: [this.F4, this.B4, this.B8, this.F8],
        }; 
        this.playerBlackMoveOptions.F6 = {
            moveOptions: [this.G5, this.E5],
            jumpOptions: [this.H4, this.D4],
            moveOptionsKing: [this.G5, this.E5, this.E7, this.G7],
            jumpOptionsKing: [this.H4, this.D4, this.D8, this.H8],
        }; 
        this.playerBlackMoveOptions.H6 = {
            moveOptions: [this.G5],
            jumpOptions: [this.F4],
            moveOptionsKing: [this.G5, this.G7],
            jumpOptionsKing: [this.F4, this.F8],
        }; 
        this.playerBlackMoveOptions.A7 = {
            moveOptions: [this.B6],
            jumpOptions: [this.C5],
            moveOptionsKing: [this.B6, this.B8],
            jumpOptionsKing: [this.C5, this.border],
        }; 
        this.playerBlackMoveOptions.C7 = {
            moveOptions: [this.D6, this.B6],
            jumpOptions: [this.E5, this.A5],
            moveOptionsKing: [this.D6, this.B6, this.B8, this.D8],
            jumpOptionsKing: [this.E5, this.A5, this.border, this.border],
        }; 
        this.playerBlackMoveOptions.E7 = {
            moveOptions: [this.F6, this.D6],
            jumpOptions: [this.G5, this.C5],
            moveOptionsKing: [this.F6, this.D6, this.D8, this.F8],
            jumpOptionsKing: [this.G5, this.C5, this.border, this.border],
        }; 
        this.playerBlackMoveOptions.G7 = {
            moveOptions: [this.H6, this.F6],
            jumpOptions: [this.border, this.E5],
            moveOptionsKing: [this.H6, this.F6, this.F8, this.H8],
            jumpOptionsKing: [this.border, this.E5, this.border, this.border],
        }; 
        this.playerBlackMoveOptions.B8 = {
            moveOptions: [this.C7, this.A7],
            jumpOptions: [this.D6, this.border],
            moveOptionsKing: [this.C7, this.A7],
            jumpOptionsKing: [this.D6, this.border],
        }; 
        this.playerBlackMoveOptions.D8 = {
            moveOptions: [this.E7, this.C7],
            jumpOptions: [this.F6, this.B6],
            moveOptionsKing: [this.E7, this.C7],
            jumpOptionsKing: [this.F6, this.B6],
        }; 
        this.playerBlackMoveOptions.F8 = {
            moveOptions: [this.G7, this.E7],
            jumpOptions: [this.H6, this.D6],
            moveOptionsKing: [this.G7, this.E7],
            jumpOptionsKing: [this.H6, this.D6],
        }; 
        this.playerBlackMoveOptions.H8 = {
            moveOptions: [this.G7],
            jumpOptions: [this.F6],
            moveOptionsKing: [this.G7],
            jumpOptionsKing: [this.F6],
        }; 
    }
}

let gameState = new GameState(
    [],
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 1,
        column: 1,
        fieldName: "A1"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 1,
        column: 3,
        fieldName: "C1"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 1,
        column: 5,
        fieldName: "E1"
    },
    { 
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 1,
        column: 7,
        fieldName: "G1"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 2,
        column: 2,
        fieldName: "B2"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 2,
        column: 4,
        fieldName: "D2"
    },
    {  
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 2,
        column: 6,
        fieldName: "F2"
    },
    {       
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 2,
        column: 8,
        fieldName: "H2"
    },
    {       
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 3,
        column: 1,
        fieldName: "A3"
    },
    {       
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 3,
        column: 3,
        fieldName: "C3"
    },
    {       
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 3,
        column: 5,
        fieldName: "E3"
    },
    {       
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 3,
        column: 7,
        fieldName: "G3"
    },
    {       
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 4,
        column: 2,
        fieldName: "B4"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false  ,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 4,
        column: 4,
        fieldName: "D4"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 4,
        column: 6,
        fieldName: "F4"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 4,
        column: 8,
        fieldName: "H4"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 5,
        column: 1,
        fieldName: "A5"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 5,
        column: 3,
        fieldName: "C5"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 5,
        column: 5,
        fieldName: "E5"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 5,
        column: 7,
        fieldName: "G5"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 6,
        column: 2,
        fieldName: "B6"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 6,
        column: 4,
        fieldName: "D6"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 6,
        column: 6,
        fieldName: "F6"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 6,
        column: 8,
        fieldName: "H6"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 7,
        column: 1,
        fieldName: "A7"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 7,
        column: 3,
        fieldName: "C7"
    },
    { 
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 7,
        column: 5,
        fieldName: "E7"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 7,
        column: 7,
        fieldName: "G7"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 8,
        column: 2,
        fieldName: "B8"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 8,
        column: 4,
        fieldName: "D8"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 8,
        column: 6,
        fieldName: "F8"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 8,
        column: 8,
        fieldName: "H8"
    },
    {
        isFree: false,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 0,
        column: 0
    },
    {
        isFree: false,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 0,
        column: 0
    },
    {
        isFree: false,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 0,
        column: 0
    }
)

let gameStateSmall = new GameState(
    [],
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 1,
        column: 1,
        fieldName: "A1Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 1,
        column: 3,
        fieldName: "C1Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 1,
        column: 5,
        fieldName: "E1Small"
    },
    { 
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 1,
        column: 7,
        fieldName: "G1Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 2,
        column: 2,
        fieldName: "B2Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 2,
        column: 4,
        fieldName: "D2Small"
    },
    {  
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 2,
        column: 6,
        fieldName: "F2Small"
    },
    {       
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 2,
        column: 8,
        fieldName: "H2Small"
    },
    {       
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 3,
        column: 1,
        fieldName: "A3Small"
    },
    {       
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 3,
        column: 3,
        fieldName: "C3Small"
    },
    {       
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 3,
        column: 5,
        fieldName: "E3Small"
    },
    {       
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 3,
        column: 7,
        fieldName: "G3Small"
    },
    {       
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 4,
        column: 2,
        fieldName: "B4Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false  ,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 4,
        column: 4,
        fieldName: "D4Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 4,
        column: 6,
        fieldName: "F4Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 4,
        column: 8,
        fieldName: "H4Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 5,
        column: 1,
        fieldName: "A5Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 5,
        column: 3,
        fieldName: "C5Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 5,
        column: 5,
        fieldName: "E5Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 5,
        column: 7,
        fieldName: "G5Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 6,
        column: 2,
        fieldName: "B6Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 6,
        column: 4,
        fieldName: "D6Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 6,
        column: 6,
        fieldName: "F6Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 6,
        column: 8,
        fieldName: "H6Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 7,
        column: 1,
        fieldName: "A7Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 7,
        column: 3,
        fieldName: "C7Small"
    },
    { 
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 7,
        column: 5,
        fieldName: "E7Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 7,
        column: 7,
        fieldName: "G7Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 8,
        column: 2,
        fieldName: "B8Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 8,
        column: 4,
        fieldName: "D8Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 8,
        column: 6,
        fieldName: "F8Small"
    },
    {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 8,
        column: 8,
        fieldName: "H8Small"
    },
    {
        isFree: false,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 0,
        column: 0
    },
    {
        isFree: false,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 0,
        column: 0
    },
    {
        isFree: false,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 0,
        column: 0
    }
)


// function called when square with user pawn that has to capture AI pawn (when usersTurn === true && forcedMove === true)
let chooseFieldForcedMove = (e) => {
    console.log("forced");
    let myTarget;
    let arrayWithMovingOptions;
    let arrayWithJumpingOptions;
    let promotionFields;
    let isAnotherForcedRsponse = false;
    let isPromoted = false;
    validMoveForced = false;


    if (offerDrawFunction()) {
        buttonNoAction();
    }

    if (continueCaptureFrom != "none") {
        myTarget = continueCaptureFrom;
    } else {
        myTarget = e.target.id;
        if (e.target.id === "pawn180" || e.target.id === "pawn" || e.target.id === "pawn180Small" || e.target.id === "pawnSmall") {
            myTarget = e.target.parentNode.id
        }
    
        if (e.target.id === "king180" || e.target.id === "king" ||e.target.id === "king180Small" || e.target.id === "kingSmall") {
            myTarget = e.target.parentNode.id
        }
    }

    
    if (isFieldChoosen) {
        
        for (const key in gameState) {
            if (myPreviousTarget === gameState[key].fieldName) {

                let hasUserPawn = gameState[key].hasUserPawn;
                let hasUserKing = gameState[key].hasUserKing;
                

                if (hasUserKing) {
                    if (userPlayer === "white") {
                        arrayWithMovingOptions = gameState.playerWhiteMoveOptions[key].moveOptionsKing;
                        arrayWithJumpingOptions = gameState.playerWhiteMoveOptions[key].jumpOptionsKing;
                    } else if (userPlayer === "black") {
                        arrayWithMovingOptions = gameState.playerBlackMoveOptions[key].moveOptionsKing;
                        arrayWithJumpingOptions = gameState.playerBlackMoveOptions[key].jumpOptionsKing;
                    }
                } else {
                    if (userPlayer === "white") {
                        arrayWithMovingOptions = gameState.playerWhiteMoveOptions[key].moveOptions;
                        arrayWithJumpingOptions = gameState.playerWhiteMoveOptions[key].jumpOptions;
                        promotionFields = ["B8", "D8", "F8", "H8"];
                    } else if (userPlayer === "black") {
                        arrayWithMovingOptions = gameState.playerBlackMoveOptions[key].moveOptions;
                        arrayWithJumpingOptions = gameState.playerBlackMoveOptions[key].jumpOptions;
                        promotionFields = ["A1", "C1", "E1", "G1"];
                    }
                }
                
                
                for (let i = 0; i < arrayWithJumpingOptions.length; i++) {
                    
                    if (arrayWithJumpingOptions[i].fieldName) {
                        document.getElementById(arrayWithJumpingOptions[i].fieldName).style.opacity = "100%"

                    }
                }

                
                if (hasUserPawn || hasUserKing) {
                    for (let i = 0; i < arrayWithJumpingOptions.length; i++) {
                        
                        if (myTarget === arrayWithJumpingOptions[i].fieldName) {
                           
                            let isFreeJumpAhead = arrayWithJumpingOptions[i].isFree;
                            let isAiFigureAhead;
                            if (arrayWithMovingOptions[i].hasAiPawn || arrayWithMovingOptions[i].hasAiKing) {
                                isAiFigureAhead = true;
                            }
                            if (isAiFigureAhead && isFreeJumpAhead) {
                                
                                console.log("move user pawn from ", myPreviousTarget, " to field ", myTarget);

                                if (!hasUserKing) {
                                    isPromoted = promotionFields.includes(arrayWithJumpingOptions[i].fieldName);
                                }

                                for (const key in gameState) {
                                    if (gameState[key].fieldName) {
                                        document.getElementById(gameState[key].fieldName).removeEventListener("click", chooseFieldForcedMove);
                                    }
                                }

                                if (hasUserPawn) {
                                    gameState[key].hasUserPawn = false;
                                    gameState[key].isFree = true;
                                    arrayWithJumpingOptions[i].isFree = false;
                                    if (isPromoted) {
                                        arrayWithJumpingOptions[i].hasUserKing = true;
                                    } else {
                                        arrayWithJumpingOptions[i].hasUserPawn = true;
                                    }
                                    arrayWithMovingOptions[i].isFree = true;
                                    arrayWithMovingOptions[i].hasAiPawn = false;
                                    arrayWithMovingOptions[i].hasAiKing = false;
                                }
                                
                                if (hasUserKing) {
                                    gameState[key].hasUserKing = false;
                                    gameState[key].isFree = true;
                                    arrayWithJumpingOptions[i].isFree = false;
                                    arrayWithJumpingOptions[i].hasUserKing = true;
                                    arrayWithMovingOptions[i].isFree = true;
                                    arrayWithMovingOptions[i].hasAiPawn = false;
                                    arrayWithMovingOptions[i].hasAiKing = false;
                                }

                                validMoveForced = true;

                                

                                console.log(gameState);
                                drawBoard(gameState);

                                userPlayerTurn = false;
                                continueCaptureFrom = "none";

                                isAnotherForcedRsponse = checkForForcedResponse(gameState, arrayWithJumpingOptions[i].fieldName)

                                if (isAnotherForcedRsponse && !isPromoted) {
                                    userPlayerTurn = true;
                                    continueCaptureFrom = arrayWithJumpingOptions[i].fieldName;
                                }
                                setTimeout(() => {
                                    chooseBestMove();
                                }, 10)
                                
                            }
                            
                        }
                        
                    }
                }
                
            }
        }

        for (const key in gameStateSmall) {
            if (myPreviousTarget === gameStateSmall[key].fieldName) {

                let hasUserPawn = gameState[key].hasUserPawn;
                let hasUserKing = gameState[key].hasUserKing;
                

                if (hasUserKing) {
                    if (userPlayer === "white") {
                        arrayWithMovingOptions = gameState.playerWhiteMoveOptions[key].moveOptionsKing;
                        arrayWithJumpingOptions = gameState.playerWhiteMoveOptions[key].jumpOptionsKing;
                    } else if (userPlayer === "black") {
                        arrayWithMovingOptions = gameState.playerBlackMoveOptions[key].moveOptionsKing;
                        arrayWithJumpingOptions = gameState.playerBlackMoveOptions[key].jumpOptionsKing;
                    }
                } else {
                    if (userPlayer === "white") {
                        arrayWithMovingOptions = gameState.playerWhiteMoveOptions[key].moveOptions;
                        arrayWithJumpingOptions = gameState.playerWhiteMoveOptions[key].jumpOptions;
                        promotionFields = ["B8", "D8", "F8", "H8"];
                    } else if (userPlayer === "black") {
                        arrayWithMovingOptions = gameState.playerBlackMoveOptions[key].moveOptions;
                        arrayWithJumpingOptions = gameState.playerBlackMoveOptions[key].jumpOptions;
                        promotionFields = ["A1", "C1", "E1", "G1"];
                    }
                }
                
                
                for (let i = 0; i < arrayWithJumpingOptions.length; i++) {
                    
                    if (arrayWithJumpingOptions[i].fieldName) {
                        document.getElementById(arrayWithJumpingOptions[i].fieldName + "Small").style.opacity = "100%"

                    }
                }

                
                if (hasUserPawn || hasUserKing) {
                    for (let i = 0; i < arrayWithJumpingOptions.length; i++) {
                        
                        if (myTarget === arrayWithJumpingOptions[i].fieldName + "Small") {
                           
                            let isFreeJumpAhead = arrayWithJumpingOptions[i].isFree;
                            let isAiFigureAhead;
                            if (arrayWithMovingOptions[i].hasAiPawn || arrayWithMovingOptions[i].hasAiKing) {
                                isAiFigureAhead = true;
                            }
                            if (isAiFigureAhead && isFreeJumpAhead) {
                                
                                console.log("move user pawn from ", myPreviousTarget, " to field ", myTarget);

                                if (!hasUserKing) {
                                    isPromoted = promotionFields.includes(arrayWithJumpingOptions[i].fieldName);
                                }

                                for (const key in gameState) {
                                    if (gameState[key].fieldName) {
                                        document.getElementById(gameState[key].fieldName).removeEventListener("click", chooseFieldForcedMove);
                                    }
                                }

                                if (hasUserPawn) {
                                    gameState[key].hasUserPawn = false;
                                    gameState[key].isFree = true;
                                    arrayWithJumpingOptions[i].isFree = false;
                                    if (isPromoted) {
                                        arrayWithJumpingOptions[i].hasUserKing = true;
                                    } else {
                                        arrayWithJumpingOptions[i].hasUserPawn = true;
                                    }
                                    arrayWithMovingOptions[i].isFree = true;
                                    arrayWithMovingOptions[i].hasAiPawn = false;
                                    arrayWithMovingOptions[i].hasAiKing = false;
                                }
                                
                                if (hasUserKing) {
                                    gameState[key].hasUserKing = false;
                                    gameState[key].isFree = true;
                                    arrayWithJumpingOptions[i].isFree = false;
                                    arrayWithJumpingOptions[i].hasUserKing = true;
                                    arrayWithMovingOptions[i].isFree = true;
                                    arrayWithMovingOptions[i].hasAiPawn = false;
                                    arrayWithMovingOptions[i].hasAiKing = false;
                                }

                                validMoveForced = true;

                                

                                console.log(gameState);
                                drawBoard(gameState);

                                userPlayerTurn = false;
                                continueCaptureFrom = "none";

                                isAnotherForcedRsponse = checkForForcedResponse(gameState, arrayWithJumpingOptions[i].fieldName)

                                if (isAnotherForcedRsponse && !isPromoted) {
                                    userPlayerTurn = true;
                                    continueCaptureFrom = arrayWithJumpingOptions[i].fieldName + "Small";
                                }
                                setTimeout(() => {
                                    chooseBestMove();
                                }, 10)
                                
                            }
                            
                        }
                        
                    }
                }
                
            }
        }
        
    }

    myPreviousTarget = myTarget;
    console.log("field clicked now: ", myTarget);

    if (!validMoveForced) {

        for (const key in gameState) {
            if (myTarget === gameState[key].fieldName) {
    
                let hasUserPawn = gameState[key].hasUserPawn;
                let hasUserKing = gameState[key].hasUserKing;
                
                if (hasUserPawn) {
                    isFieldChoosen = true;
                    if (userPlayer === "white") {
                        arrayWithMovingOptions = gameState.playerWhiteMoveOptions[key].moveOptions;
                        arrayWithJumpingOptions = gameState.playerWhiteMoveOptions[key].jumpOptions;
                    } else if (userPlayer === "black") {
                        arrayWithMovingOptions = gameState.playerBlackMoveOptions[key].moveOptions;
                        arrayWithJumpingOptions = gameState.playerBlackMoveOptions[key].jumpOptions;
                    }
        
        
                    for (let i = 0; i < arrayWithJumpingOptions.length; i++) {
                        if (arrayWithJumpingOptions[i].isFree) {
                            if (arrayWithMovingOptions[i].hasAiPawn || arrayWithMovingOptions[i].hasAiKing) {
                                document.getElementById(arrayWithJumpingOptions[i].fieldName).style.opacity = "80%"
                                document.getElementById(arrayWithJumpingOptions[i].fieldName).addEventListener("click", chooseFieldForcedMove);
                            }
                        }
                    }
                }
    
                if (hasUserKing) {
                    isFieldChoosen = true;
                    if (userPlayer === "white") {
                        arrayWithMovingOptions = gameState.playerWhiteMoveOptions[key].moveOptionsKing;
                        arrayWithJumpingOptions = gameState.playerWhiteMoveOptions[key].jumpOptionsKing;
                    } else if (userPlayer === "black") {
                        arrayWithMovingOptions = gameState.playerBlackMoveOptions[key].moveOptionsKing;
                        arrayWithJumpingOptions = gameState.playerBlackMoveOptions[key].jumpOptionsKing;
                    }
        
        
                    for (let i = 0; i < arrayWithJumpingOptions.length; i++) {
                        if (arrayWithJumpingOptions[i].isFree) {
                            if (arrayWithMovingOptions[i].hasAiPawn || arrayWithMovingOptions[i].hasAiKing) {
                                document.getElementById(arrayWithJumpingOptions[i].fieldName).style.opacity = "80%"
                                document.getElementById(arrayWithJumpingOptions[i].fieldName).addEventListener("click", chooseFieldForcedMove);
                            }
                        }
                    }
                }
    
    
            }
        }

        for (const key in gameStateSmall) {
            if (myTarget === gameStateSmall[key].fieldName) {
    
                let hasUserPawn = gameState[key].hasUserPawn;
                let hasUserKing = gameState[key].hasUserKing;
                
                if (hasUserPawn) {
                    isFieldChoosen = true;
                    if (userPlayer === "white") {
                        arrayWithMovingOptions = gameState.playerWhiteMoveOptions[key].moveOptions;
                        arrayWithJumpingOptions = gameState.playerWhiteMoveOptions[key].jumpOptions;
                    } else if (userPlayer === "black") {
                        arrayWithMovingOptions = gameState.playerBlackMoveOptions[key].moveOptions;
                        arrayWithJumpingOptions = gameState.playerBlackMoveOptions[key].jumpOptions;
                    }
        
        
                    for (let i = 0; i < arrayWithJumpingOptions.length; i++) {
                        if (arrayWithJumpingOptions[i].isFree) {
                            if (arrayWithMovingOptions[i].hasAiPawn || arrayWithMovingOptions[i].hasAiKing) {
                                document.getElementById(arrayWithJumpingOptions[i].fieldName + "Small").style.opacity = "80%"
                                document.getElementById(arrayWithJumpingOptions[i].fieldName + "Small").addEventListener("click", chooseFieldForcedMove);
                            }
                        }
                    }
                }
    
                if (hasUserKing) {
                    isFieldChoosen = true;
                    if (userPlayer === "white") {
                        arrayWithMovingOptions = gameState.playerWhiteMoveOptions[key].moveOptionsKing;
                        arrayWithJumpingOptions = gameState.playerWhiteMoveOptions[key].jumpOptionsKing;
                    } else if (userPlayer === "black") {
                        arrayWithMovingOptions = gameState.playerBlackMoveOptions[key].moveOptionsKing;
                        arrayWithJumpingOptions = gameState.playerBlackMoveOptions[key].jumpOptionsKing;
                    }
        
        
                    for (let i = 0; i < arrayWithJumpingOptions.length; i++) {
                        if (arrayWithJumpingOptions[i].isFree) {
                            if (arrayWithMovingOptions[i].hasAiPawn || arrayWithMovingOptions[i].hasAiKing) {
                                document.getElementById(arrayWithJumpingOptions[i].fieldName + "Small").style.opacity = "80%"
                                document.getElementById(arrayWithJumpingOptions[i].fieldName + "Small").addEventListener("click", chooseFieldForcedMove);
                            }
                        }
                    }
                }
    
    
            }
        }

        continueCaptureFrom = "none";
    }
}

// function called when square with user pawn is clicked (when usersTurn === true)
let chooseField = (e) => {
    

    let myTarget = e.target.id
    let arrayWithMovingOptions;
    let promotionFields;
    validMove = false;
    


    if (offerDrawFunction()) {
        buttonNoAction();
    }

    if (e.target.id === "pawn180" || e.target.id === "pawn" || e.target.id === "pawn180Small" || e.target.id === "pawnSmall") {
        myTarget = e.target.parentNode.id
    }

    if (e.target.id === "king180" || e.target.id === "king" || e.target.id === "king180Small" || e.target.id === "kingSmall") {
        myTarget = e.target.parentNode.id
    }
    
    if (isFieldChoosen) {
        
        for (const key in gameState) {
            if (myPreviousTarget === gameState[key].fieldName) {

                let hasUserPawn = gameState[key].hasUserPawn;
                let hasUserKing = gameState[key].hasUserKing;
                

                if (hasUserKing) {
                    if (userPlayer === "white") {
                        arrayWithMovingOptions = gameState.playerWhiteMoveOptions[key].moveOptionsKing;
                    } else if (userPlayer === "black") {
                        arrayWithMovingOptions = gameState.playerBlackMoveOptions[key].moveOptionsKing;
                    }
                } else {
                    if (userPlayer === "white") {
                        arrayWithMovingOptions = gameState.playerWhiteMoveOptions[key].moveOptions;
                        promotionFields = ["B8", "D8", "F8", "H8"];
                    } else if (userPlayer === "black") {
                        arrayWithMovingOptions = gameState.playerBlackMoveOptions[key].moveOptions;
                        promotionFields = ["A1", "C1", "E1", "G1"];
                    }
                }
                
                
                for (let i = 0; i < arrayWithMovingOptions.length; i++) {
                    
                    if (arrayWithMovingOptions[i].fieldName) {
                        document.getElementById(arrayWithMovingOptions[i].fieldName).style.opacity = "100%"

                    }
                }

                
                if (hasUserPawn || hasUserKing) {
                    for (let i = 0; i < arrayWithMovingOptions.length; i++) {
                        if (myTarget === arrayWithMovingOptions[i].fieldName) {
                           
                            let isFreeAhead = arrayWithMovingOptions[i].isFree;
                            if (isFreeAhead) {
                                //change gamestate, change to AI turn
                                //redraw borad with new state
                                //return from function
                                console.log("this is valid move!!!!");
                                console.log("move user pawn from ", myPreviousTarget, " to field ", myTarget);

                                if (!hasUserKing) {
                                    isPromoted = promotionFields.includes(arrayWithMovingOptions[i].fieldName);
                                }

                                for (const key in gameState) {
                                    if (gameState[key].fieldName) {
                                        document.getElementById(gameState[key].fieldName).removeEventListener("click", chooseField);
                                    }
                                }

                                if (hasUserPawn) {
                                    gameState[key].hasUserPawn = false;
                                    gameState[key].isFree = true;
                                    arrayWithMovingOptions[i].isFree = false;
                                    if (isPromoted) {
                                        arrayWithMovingOptions[i].hasUserKing = true;
                                    } else {
                                        arrayWithMovingOptions[i].hasUserPawn = true;
                                    }
                                }
                                
                                if (hasUserKing) {
                                    gameState[key].hasUserKing = false;
                                    gameState[key].isFree = true;
                                    arrayWithMovingOptions[i].hasUserKing = true;
                                    arrayWithMovingOptions[i].isFree = false;
                                }

                                validMove = true;

                                

                                console.log(gameState);
                                drawBoard(gameState);
                                userPlayerTurn = false;
                                setTimeout(() => {
                                    chooseBestMove();
                                }, 10)
                                
                            }
                            
                        }
                        
                    }
                }
                
            }
        }

        for (const key in gameStateSmall) {
            if (myPreviousTarget === gameStateSmall[key].fieldName) {
    
                let hasUserPawn = gameState[key].hasUserPawn;
                let hasUserKing = gameState[key].hasUserKing;
                console.log(gameStateSmall);
    
                if (hasUserKing) {
                    if (userPlayer === "white") {
                        arrayWithMovingOptions = gameState.playerWhiteMoveOptions[key].moveOptionsKing;
                    } else if (userPlayer === "black") {
                        arrayWithMovingOptions = gameState.playerBlackMoveOptions[key].moveOptionsKing;
                    }
                } else {
                    if (userPlayer === "white") {
                        arrayWithMovingOptions = gameState.playerWhiteMoveOptions[key].moveOptions;
                        promotionFields = ["B8", "D8", "F8", "H8"];
                    } else if (userPlayer === "black") {
                        arrayWithMovingOptions = gameState.playerBlackMoveOptions[key].moveOptions;
                        promotionFields = ["A1", "C1", "E1", "G1"];
                    }
                }
                
                
                for (let i = 0; i < arrayWithMovingOptions.length; i++) {
                    
                    if (arrayWithMovingOptions[i].fieldName) {
                        document.getElementById(arrayWithMovingOptions[i].fieldName + "Small").style.opacity = "100%"
    
                    }
                }
    
                
                if (hasUserPawn || hasUserKing) {
                    
                    for (let i = 0; i < arrayWithMovingOptions.length; i++) {
                        if (myTarget === arrayWithMovingOptions[i].fieldName + "Small") {
                           
                            let isFreeAhead = arrayWithMovingOptions[i].isFree;
                            if (isFreeAhead) {
                                //change gamestate, change to AI turn
                                //redraw borad with new state
                                //return from function
                                console.log("this is valid move!!!!");
                                console.log("move user pawn from ", myPreviousTarget, " to field ", myTarget);
    
                                if (!hasUserKing) {
                                    isPromoted = promotionFields.includes(arrayWithMovingOptions[i].fieldName);
                                }
    
                                for (const key in gameState) {
                                    if (gameState[key].fieldName) {
                                        document.getElementById(gameStateSmall[key].fieldName).removeEventListener("click", chooseField);
                                    }
                                }
    
                                if (hasUserPawn) {
                                    gameState[key].hasUserPawn = false;
                                    gameState[key].isFree = true;
                                    arrayWithMovingOptions[i].isFree = false;
                                    if (isPromoted) {
                                        arrayWithMovingOptions[i].hasUserKing = true;
                                    } else {
                                        arrayWithMovingOptions[i].hasUserPawn = true;
                                    }
                                }
                                
                                if (hasUserKing) {
                                    gameState[key].hasUserKing = false;
                                    gameState[key].isFree = true;
                                    arrayWithMovingOptions[i].hasUserKing = true;
                                    arrayWithMovingOptions[i].isFree = false;
                                }
    
                                validMove = true;
    
                                
    
                                console.log(gameState);
                                drawBoard(gameState);
                                userPlayerTurn = false;
                                setTimeout(() => {
                                    chooseBestMove();
                                }, 10)
                                
                            }
                            
                        }
                        
                    }
                }
                
            }
        }
        
    }

    

    myPreviousTarget = myTarget;
    console.log("field clicked now: ", myTarget);

    if (!validMove) {

        for (const key in gameState) {
            if (myTarget === gameState[key].fieldName) {
    
                let hasUserPawn = gameState[key].hasUserPawn;
                let hasUserKing = gameState[key].hasUserKing;
                
                if (hasUserPawn) {
                    isFieldChoosen = true;
                    if (userPlayer === "white") {
                        arrayWithMovingOptions = gameState.playerWhiteMoveOptions[key].moveOptions;
                    } else if (userPlayer === "black") {
                        arrayWithMovingOptions = gameState.playerBlackMoveOptions[key].moveOptions;
                    }
        
        
                    for (let i = 0; i < arrayWithMovingOptions.length; i++) {
                        if (arrayWithMovingOptions[i].isFree) {
                            document.getElementById(arrayWithMovingOptions[i].fieldName).style.opacity = "80%"
                        }
                    }
                }
    
                if (hasUserKing) {
                    isFieldChoosen = true;
                    if (userPlayer === "white") {
                        arrayWithMovingOptions = gameState.playerWhiteMoveOptions[key].moveOptionsKing;
                    } else if (userPlayer === "black") {
                        arrayWithMovingOptions = gameState.playerBlackMoveOptions[key].moveOptionsKing;
                    }
        
        
                    for (let i = 0; i < arrayWithMovingOptions.length; i++) {
                        if (arrayWithMovingOptions[i].isFree) {
                            document.getElementById(arrayWithMovingOptions[i].fieldName).style.opacity = "80%"
                        }
                    }
                }
    
    
            }
        }

        for (const key in gameStateSmall) {
            if (myTarget === gameStateSmall[key].fieldName) {
    
                let hasUserPawn = gameState[key].hasUserPawn;
                let hasUserKing = gameState[key].hasUserKing;
                
                if (hasUserPawn) {
                    isFieldChoosen = true;
                    if (userPlayer === "white") {
                        arrayWithMovingOptions = gameState.playerWhiteMoveOptions[key].moveOptions;
                    } else if (userPlayer === "black") {
                        arrayWithMovingOptions = gameState.playerBlackMoveOptions[key].moveOptions;
                    }
        
        
                    for (let i = 0; i < arrayWithMovingOptions.length; i++) {
                        if (arrayWithMovingOptions[i].isFree) {
                            document.getElementById(arrayWithMovingOptions[i].fieldName + "Small").style.opacity = "80%"
                        }
                    }
                }
    
                if (hasUserKing) {
                    isFieldChoosen = true;
                    if (userPlayer === "white") {
                        arrayWithMovingOptions = gameState.playerWhiteMoveOptions[key].moveOptionsKing;
                    } else if (userPlayer === "black") {
                        arrayWithMovingOptions = gameState.playerBlackMoveOptions[key].moveOptionsKing;
                    }
        
        
                    for (let i = 0; i < arrayWithMovingOptions.length; i++) {
                        if (arrayWithMovingOptions[i].isFree) {
                            document.getElementById(arrayWithMovingOptions[i].fieldName + "Small").style.opacity = "80%"
                        }
                    }
                }
    
    
            }
        }
    }
    
}


let chooseSide = () => {
    if (!playerChoseSide) {
        coinflip = Math.floor(Math.random() * 2);
    }
    if (coinflip === 0) {
        aiPlayer = "white";
        userPlayer = "black";
        gameState.A1.isFree = false;
        gameState.C1.isFree = false;
        gameState.E1.isFree = false;
        gameState.G1.isFree = false;
        gameState.B2.isFree = false;
        gameState.D2.isFree = false;
        gameState.F2.isFree = false;
        gameState.H2.isFree = false;
        gameState.A3.isFree = false;
        gameState.C3.isFree = false;
        gameState.E3.isFree = false;
        gameState.G3.isFree = false;
        gameState.A1.hasAiPawn = true;
        gameState.C1.hasAiPawn = true;
        gameState.E1.hasAiPawn = true;
        gameState.G1.hasAiPawn = true;
        gameState.B2.hasAiPawn = true;
        gameState.D2.hasAiPawn = true;
        gameState.F2.hasAiPawn = true;
        gameState.H2.hasAiPawn = true;
        gameState.A3.hasAiPawn = true;
        gameState.C3.hasAiPawn = true;
        gameState.E3.hasAiPawn = true;
        gameState.G3.hasAiPawn = true;
        gameState.B6.isFree = false;
        gameState.D6.isFree = false;
        gameState.F6.isFree = false;
        gameState.H6.isFree = false;
        gameState.A7.isFree = false;
        gameState.C7.isFree = false;
        gameState.E7.isFree = false;
        gameState.G7.isFree = false;
        gameState.B8.isFree = false;
        gameState.D8.isFree = false;
        gameState.F8.isFree = false;
        gameState.H8.isFree = false;
        gameState.B6.hasUserPawn = true;
        gameState.D6.hasUserPawn = true;
        gameState.F6.hasUserPawn = true;
        gameState.H6.hasUserPawn = true;
        gameState.A7.hasUserPawn = true;
        gameState.C7.hasUserPawn = true;
        gameState.E7.hasUserPawn = true;
        gameState.G7.hasUserPawn = true;
        gameState.B8.hasUserPawn = true;
        gameState.D8.hasUserPawn = true;
        gameState.F8.hasUserPawn = true;
        gameState.H8.hasUserPawn = true;
        userPlayerTurn = false;
    } else {
        aiPlayer = "black";
        userPlayer = "white";
        gameState.A1.isFree = false;
        gameState.C1.isFree = false;
        gameState.E1.isFree = false;
        gameState.G1.isFree = false;
        gameState.B2.isFree = false;
        gameState.D2.isFree = false;
        gameState.F2.isFree = false;
        gameState.H2.isFree = false;
        gameState.A3.isFree = false;
        gameState.C3.isFree = false;
        gameState.E3.isFree = false;
        gameState.G3.isFree = false;
        gameState.A1.hasUserPawn = true;
        gameState.C1.hasUserPawn = true;
        gameState.E1.hasUserPawn = true;
        gameState.G1.hasUserPawn = true;
        gameState.B2.hasUserPawn = true;
        gameState.D2.hasUserPawn = true;
        gameState.F2.hasUserPawn = true;
        gameState.H2.hasUserPawn = true;
        gameState.A3.hasUserPawn = true;
        gameState.C3.hasUserPawn = true;
        gameState.E3.hasUserPawn = true;
        gameState.G3.hasUserPawn = true;
        gameState.B6.isFree = false;
        gameState.D6.isFree = false;
        gameState.F6.isFree = false;
        gameState.H6.isFree = false;
        gameState.A7.isFree = false;
        gameState.C7.isFree = false;
        gameState.E7.isFree = false;
        gameState.G7.isFree = false;
        gameState.B8.isFree = false;
        gameState.D8.isFree = false;
        gameState.F8.isFree = false;
        gameState.H8.isFree = false;
        gameState.B6.hasAiPawn = true;
        gameState.D6.hasAiPawn = true;
        gameState.F6.hasAiPawn = true;
        gameState.H6.hasAiPawn = true;
        gameState.A7.hasAiPawn = true;
        gameState.C7.hasAiPawn = true;
        gameState.E7.hasAiPawn = true;
        gameState.G7.hasAiPawn = true;
        gameState.B8.hasAiPawn = true;
        gameState.D8.hasAiPawn = true;
        gameState.F8.hasAiPawn = true;
        gameState.H8.hasAiPawn = true;
        userPlayerTurn = true;
    }
}


let startGame = () => {
   
    gameOn = true;
    noMorePawns = false;
    stepLimit = saveStepLimit;
    drawCountDown = drawLimit;
    resultTextDiv.style.display = "none";
    disableChoice();
    chooseSide();
    console.log("AI players has color:", aiPlayer);
    console.log("user players has color:", userPlayer);

    if (aiPlayer === "black") {
        chessBoardDiv.style.transform = "rotate(360deg)";
        chessBoardDivSmall.style.transform = "rotate(360deg)";
    }
    
    drawBoard(gameState)
    
    setTimeout(() => {
        chooseBestMove(gameState, aiPlayer, userPlayer);
    }, 400)
    
}

//points for certain position:
//pawns on line 1-7 => 8,4,6,8,10,12,16
//king => 24
//if opponetnt kings count > 0 => king gets points for aproaching kings opponents
//if opponennt kings count = 0 => king gets points for aproching center of a board 
let calculateAiResult = (player, gameStateCalc) => {
    
    let pawnCount = 0;
    aiResult = 0;
    
    for (const key in gameStateCalc) {
        if (gameStateCalc[key].hasAiPawn && player === "white") {
            if (gameStateCalc[key].rowNumber === 1) {
                aiResult += 6 
            } else if (gameStateCalc[key].rowNumber === 2) {
                aiResult += 4 
            } else if (gameStateCalc[key].rowNumber === 3) {
                aiResult += 6 
            } else if (gameStateCalc[key].rowNumber === 4) {
                aiResult += 8 
            } else if (gameStateCalc[key].rowNumber === 5) {
                aiResult += 10 
            } else if (gameStateCalc[key].rowNumber === 6) {
                aiResult += 12 
            } else if (gameStateCalc[key].rowNumber === 7) {
                aiResult += 16 
            }
            pawnCount += pawnBonus;
        } else if (gameStateCalc[key].hasAiPawn && player === "black") {
            if (gameStateCalc[key].rowNumber === 8) {
                aiResult += 6
            } else if (gameStateCalc[key].rowNumber === 7) {
                aiResult += 4 
            } else if (gameStateCalc[key].rowNumber === 6) {
                aiResult += 6 
            } else if (gameStateCalc[key].rowNumber === 5) {
                aiResult += 8 
            } else if (gameStateCalc[key].rowNumber === 4) {
                aiResult += 10 
            } else if (gameStateCalc[key].rowNumber === 3) {
                aiResult += 12 
            } else if (gameStateCalc[key].rowNumber === 2) {
                aiResult += 16 
            }
            pawnCount += pawnBonus;
        }

        if (gameStateCalc[key].hasAiKing) {
            let distanceToOpponentsKing = 0;
            let distanceX;
            let distanceY;
            aiResult += 24;
            
            if (opponentKingsCount > 0) {
                distanceX = opponentKingX - gameStateCalc[key].column;
                distanceY = opponentKingY - gameStateCalc[key].rowNumber;
                distanceX = Math.pow(distanceX, 2);
                distanceY = Math.pow(distanceY, 2);
                distanceToOpponentsKing = Math.sqrt(distanceX + distanceY)/3;

                aiResult -= distanceToOpponentsKing;

                if (aiKingNum === 2 && userKingNum === 1 && gameStateCalc[key].hasAiKing) {
                    if (
                        gameStateCalc[key].fieldName === "E3" ||
                        gameStateCalc[key].fieldName === "F4" 
                    ) {
                        if (gameStateCalc.G1.hasUserKing || gameStateCalc.H2.hasUserKing) {
                            aiResult += 2;
                        }
                    }

                    if (
                        gameStateCalc[key].fieldName === "C5" ||
                        gameStateCalc[key].fieldName === "D6" 
                    ) {
                        if (gameStateCalc.A7.hasUserKing || gameStateCalc.B8.hasUserKing) {
                            aiResult += 2;
                        }
                    }
                }
            } else {
                if (gameStateCalc[key].rowNumber === 1) {
                    aiResult += 0 
                } else if (gameStateCalc[key].rowNumber === 2) {
                    aiResult += 1 
                } else if (gameStateCalc[key].rowNumber === 3) {
                    aiResult += 2 
                } else if (gameStateCalc[key].rowNumber === 4) {
                    aiResult += 3 
                } else if (gameStateCalc[key].rowNumber === 5) {
                    aiResult += 3 
                } else if (gameStateCalc[key].rowNumber === 6) {
                    aiResult += 2 
                } else if (gameStateCalc[key].rowNumber === 7) {
                    aiResult += 1 
                } else if (gameStateCalc[key].rowNumber === 8) {
                    aiResult += 0 
                }
            }

            pawnCount += pawnBonus;
        }


    }

    opponentKingsCount = 0;

    aiResult = aiResult + pawnCount;
    
}


let calculateUserResult = (player, gameStateCalc) => {

    let pawnCount = 0;
    userResult = 0;

    for (const key in gameStateCalc) {
        if (gameStateCalc[key].hasUserPawn && player === "white") {
            if (gameStateCalc[key].rowNumber === 1) {
                userResult += 6 
            } else if (gameStateCalc[key].rowNumber === 2) {
                userResult += 4 
            } else if (gameStateCalc[key].rowNumber === 3) {
                userResult += 6 
            } else if (gameStateCalc[key].rowNumber === 4) {
                userResult += 8 
            } else if (gameStateCalc[key].rowNumber === 5) {
                userResult += 10 
            } else if (gameStateCalc[key].rowNumber === 6) {
                userResult += 12 
            } else if (gameStateCalc[key].rowNumber === 7) {
                userResult += 16 
            }
            pawnCount += pawnBonus;
        } else if (gameStateCalc[key].hasUserPawn && player === "black") {
            if (gameStateCalc[key].rowNumber === 8) {
                userResult += 6 
            } else if (gameStateCalc[key].rowNumber === 7) {
                userResult += 4 
            } else if (gameStateCalc[key].rowNumber === 6) {
                userResult += 6 
            } else if (gameStateCalc[key].rowNumber === 5) {
                userResult += 8 
            } else if (gameStateCalc[key].rowNumber === 4) {
                userResult += 10 
            } else if (gameStateCalc[key].rowNumber === 3) {
                userResult += 12 
            } else if (gameStateCalc[key].rowNumber === 2) {
                userResult += 16 
            }
            pawnCount += pawnBonus;
        }
        
        

        if (gameStateCalc[key].hasUserKing) {
            userResult += 28;
            opponentKingX = gameStateCalc[key].column;
            opponentKingY = gameStateCalc[key].rowNumber;
            pawnCount += pawnBonus;
            opponentKingsCount++;
        } 

        //if opponentKingCount = 1 and is in the corner and aiKingCount = 2 ===> userResult + 10...

        if (aiKingNum === 2 && userKingNum === 1 && gameStateCalc[key].hasUserKing) {
            if (
                gameStateCalc[key].fieldName === "G1" ||
                gameStateCalc[key].fieldName === "H2" ||
                gameStateCalc[key].fieldName === "A7" ||
                gameStateCalc[key].fieldName === "B8"
            ) {
                userResult += 10;
            }
        }

    }

    userResult = userResult + pawnCount;
}

// for displaying multiple captures made by AI
let drawSequence = (arrayWithParams) => {

    if (ind < arrayWithParams.length) {
        setTimeout(() => {
            drawBoard(arrayWithParams[ind]);
            ind++;
            drawSequence(arrayWithParams);
        }, 700)
    } else {
        ind = 0;
        isForcedResponse = checkForForcedResponse(gameState, "none");
        chooseBestMove();
    }
}

let checkForForcedResponse = (gameStateProp, field) => {

    let forcedMove = false;


    for (const key in gameStateProp) {

        if (field === "none" || key === field) {

            if (gameStateProp[key].hasUserPawn) {
            
                let arrayWithMovingOptions;
                let arrayWithJumpingOptions;
    
                if (userPlayer === "white") {
                    arrayWithMovingOptions = gameStateProp.playerWhiteMoveOptions[key].moveOptions;
                    arrayWithJumpingOptions = gameStateProp.playerWhiteMoveOptions[key].jumpOptions;
                    
                } else if (userPlayer === "black") {
                    arrayWithMovingOptions = gameStateProp.playerBlackMoveOptions[key].moveOptions;
                    arrayWithJumpingOptions = gameStateProp.playerBlackMoveOptions[key].jumpOptions;
                    
                }
    
                for (let i = 0; i < arrayWithMovingOptions.length; i++) {
                    if (arrayWithMovingOptions[i].hasAiPawn || arrayWithMovingOptions[i].hasAiKing) {
                        
                        if (arrayWithJumpingOptions[i].isFree) {
                            forcedMove = true;
                        }
    
                        
                    }
    
                }
    
            }
    
            if (gameStateProp[key].hasUserKing) {
    
                let arrayWithMovingOptionsKing;
                let arrayWithJumpingOptionsKing;
    
                if (userPlayer === "white") {
                    arrayWithMovingOptionsKing = gameStateProp.playerWhiteMoveOptions[key].moveOptionsKing;
                    arrayWithJumpingOptionsKing = gameStateProp.playerWhiteMoveOptions[key].jumpOptionsKing;
                } else if (userPlayer === "black") {
                    arrayWithMovingOptionsKing = gameStateProp.playerBlackMoveOptions[key].moveOptionsKing;
                    arrayWithJumpingOptionsKing = gameStateProp.playerBlackMoveOptions[key].jumpOptionsKing;
                }
    
                for (let i = 0; i < arrayWithMovingOptionsKing.length; i++) {
                    if (arrayWithMovingOptionsKing[i].hasAiPawn || arrayWithMovingOptionsKing[i].hasAiKing) {
                        
                        if (arrayWithJumpingOptionsKing[i].isFree) {
                            forcedMove = true;
                        }
                    }
    
                }
            }
        }
        
    }

    return forcedMove;
}

let updateOptimalization = (step, hiLoVal) => {

    let earlyReturn = false;

    if (step === 1) {
        tempValStepOne = hiLoVal;
    } else if (step === 2) {
        if (tempValStepOne != null && hiLoVal != null && hiLoVal <= tempValStepOne) {
            earlyReturn = true;
        } else {
            tempValStepTwo = hiLoVal;
        }
    } else if (step === 3) {
        if (tempValStepTwo != null && hiLoVal != null && hiLoVal >= tempValStepTwo) {
            earlyReturn = true;
        } else {
            tempValStepThree = hiLoVal;
        }
    } else if (step === 4) {
        if (tempValStepThree != null && hiLoVal != null && hiLoVal <= tempValStepThree) {
            earlyReturn = true;
        } else {
            tempValStepFour = hiLoVal;            
        }
    } else if (step === 5) {
        if (tempValStepFour != null && hiLoVal != null && hiLoVal >= tempValStepFour) {
            earlyReturn = true;
        } else {
            tempValStepFive = hiLoVal;    
        }
    } else if (step === 6) {
        if (tempValStepFive != null && hiLoVal != null && hiLoVal <= tempValStepFive) {
            earlyReturn = true;
        } else {
            tempValStepSix = hiLoVal;    
        }
    } else if (step === 7) {
        if (tempValStepSix != null && hiLoVal != null && hiLoVal <= tempValStepSix) {
            earlyReturn = true;
        } else {
            tempValStepSeven = hiLoVal;    
        } 
    }else if (step === 8) {
        if (tempValStepSeven != null && hiLoVal != null && hiLoVal <= tempValStepSeven) {
            earlyReturn = true;
        } else {
            tempValStepEight = hiLoVal;    
        }
    } else if (step === 9) {
        if (tempValStepEight != null && hiLoVal != null && hiLoVal <= tempValStepEight) {
            earlyReturn = true;
        } else {
            tempValStepNine = hiLoVal;    
        }
    } else if (step === 10) {
        if (tempValStepNine != null && hiLoVal != null && hiLoVal <= tempValStepNine) {
            earlyReturn = true;
        } else {
            tempValStepTen = hiLoVal;    
        }
    }

    return earlyReturn;
}

// function that checks if there is forced capture in the next move
let findForcedMovesAi = (gameStateProp, field, step) => {

    let returnObject = {
        forcedMove: false,
        newGameState: [],
        highestValue: null,
    }

    let promotionFields;
    let seventhRow;
    let isPromoted;
    let isSeventhRow;
    let stepNumberToPass;
    let returnEarly;
    let callLastStep = false;


    stepNumberToPass = step + 1;

    if (step === stepLimit) {
        callLastStep = true;
    }

    
    for (const key in gameStateProp) {
        
        if (field === "none" || key === field) {
            
            if (gameStateProp[key].hasAiPawn) {
                let arrayWithMovingOptions;
                let arrayWithJumpingOptions;
                
    
                if (aiPlayer === "white") {
                    arrayWithMovingOptions = gameStateProp.playerWhiteMoveOptions[key].moveOptions;
                    arrayWithJumpingOptions = gameStateProp.playerWhiteMoveOptions[key].jumpOptions;
                    promotionFields = ["B8", "D8", "F8", "H8"];
                    seventhRow  = ["A7", "C7", "E7", "G7"];

                } else if (aiPlayer === "black") {
                    arrayWithMovingOptions = gameStateProp.playerBlackMoveOptions[key].moveOptions;
                    arrayWithJumpingOptions = gameStateProp.playerBlackMoveOptions[key].jumpOptions;
                    promotionFields = ["A1", "C1", "E1", "G1"];
                    seventhRow = ["B2", "D2", "F2", "H2"];
                }
    
                 
                for (let i = 0; i < arrayWithMovingOptions.length; i++) {
                    if (arrayWithMovingOptions[i].hasUserPawn || arrayWithMovingOptions[i].hasUserKing) {
    
                        let opponentType;
                        if (arrayWithMovingOptions[i].hasUserPawn) {
                            opponentType = "pawn"
                        } else if (arrayWithMovingOptions[i].hasUserKing) {
                            opponentType = "king"
                        }
                        if (arrayWithJumpingOptions[i].isFree) {
                            //console.log("you have to jump your pawn from: ", key, "to square: ", arrayWithJumpingOptions[i].fieldName );
    
                            isPromoted = promotionFields.includes(arrayWithJumpingOptions[i].fieldName);
                            isSeventhRow = seventhRow.includes(arrayWithJumpingOptions[i].fieldName);
                            
                            gameStateProp[key].hasAiPawn = false;
                            gameStateProp[key].isFree = true;
                            arrayWithMovingOptions[i].hasUserPawn = false;
                            arrayWithMovingOptions[i].hasUserKing = false;
                            arrayWithMovingOptions[i].isFree = true;
                            arrayWithJumpingOptions[i].isFree = false;

                            
                            //just for pawn part of function
                            if (isPromoted) {
                                arrayWithJumpingOptions[i].hasAiKing = true;
                            } else {
                                arrayWithJumpingOptions[i].hasAiPawn = true;
                            }
                            
                            //drawingQueue.push(JSON.parse(JSON.stringify(gameStateProp)));


                            if (returnObject.forcedMove) {

                                let doCalculation = true;
                                let alternativePath = []
                                

                                alternativePath.push(JSON.parse(JSON.stringify(gameStateProp)));

                                if (!isPromoted && !isSeventhRow) {
                                    let isAnotherForcedMove = findForcedMovesAi(gameStateProp, arrayWithJumpingOptions[i].fieldName, step);
                                    if (isAnotherForcedMove.forcedMove) {
                                        doCalculation = false;
                                        if (isAnotherForcedMove.highestValue > returnObject.highestValue) {
                                            returnObject.newGameState = alternativePath;
                                            for (let j = 0; j < isAnotherForcedMove.newGameState.length; j++) {
                                                returnObject.newGameState.push(isAnotherForcedMove.newGameState[j]);
                                            }
                                            returnObject.highestValue = isAnotherForcedMove.highestValue;
                                            // set temp val one to isAnotherForcedMove.highestValue
                                        }
                                       
                                    }
                                }

                                if (doCalculation) {
                                    
                                    let nextStep = findForcedMovesUser(gameStateProp, "none", stepNumberToPass);
                                    
                                    if (nextStep.forcedMove) {
                                        if (nextStep.lowestValue > returnObject.highestValue) {
                                            returnObject.highestValue = nextStep.lowestValue;
                                            returnObject.newGameState = alternativePath;
                                        }
                                    } else {
                                        let nextStepNoForced = findMoveUser(gameStateProp, stepNumberToPass);
                                        if (nextStepNoForced.lowestValue > returnObject.highestValue) {
                                            returnObject.highestValue = nextStepNoForced.lowestValue;
                                            returnObject.newGameState = alternativePath;
                                        }
                                    }
                                }
                                
                                
                            } else {
                                
                                returnObject.newGameState.push(JSON.parse(JSON.stringify(gameStateProp)))
                                returnObject.forcedMove = true;

                                if (!isPromoted && !isSeventhRow) {
                                    let isForcedMove = findForcedMovesAi(gameStateProp, arrayWithJumpingOptions[i].fieldName, step);
                                    if (isForcedMove.forcedMove) {
                                        returnObject.highestValue = isForcedMove.highestValue;
                                        for (let j = 0; j < isForcedMove.newGameState.length; j++) {
                                            returnObject.newGameState.push(isForcedMove.newGameState[j])
                                            
                                        }
                                    }
                                    
                                }
                                
                                if (returnObject.highestValue === null) {

                                    let nextStep = findForcedMovesUser(gameStateProp, "none", stepNumberToPass);

                                    if (nextStep.forcedMove) {
                                        returnObject.highestValue = nextStep.lowestValue;
                                    } else {
                                        let nextStepNoForced = findMoveUser(gameStateProp, stepNumberToPass);

                                        returnObject.highestValue = nextStepNoForced.lowestValue;
                                    }
                                }
                                
                                
                            }


                            if (opponentType === "pawn") {
                                arrayWithMovingOptions[i].hasUserPawn = true;
                            } else if (opponentType === "king") {
                                arrayWithMovingOptions[i].hasUserKing = true;
                            }
    
                            gameStateProp[key].hasAiPawn = true;
                            gameStateProp[key].isFree = false;
                            arrayWithJumpingOptions[i].hasAiPawn = false;
                            arrayWithJumpingOptions[i].hasAiKing = false;
                            arrayWithMovingOptions[i].isFree = false;
                            arrayWithJumpingOptions[i].isFree = true;
                            
                        }
    
                        
                    }
    
                }
    
            }
    
            if (gameStateProp[key].hasAiKing) {
    
                let arrayWithMovingOptionsKing;
                let arrayWithJumpingOptionsKing;
    
                if (aiPlayer === "white") {
                    arrayWithMovingOptionsKing = gameStateProp.playerWhiteMoveOptions[key].moveOptionsKing;
                    arrayWithJumpingOptionsKing = gameStateProp.playerWhiteMoveOptions[key].jumpOptionsKing;
                } else if (aiPlayer === "black") {
                    arrayWithMovingOptionsKing = gameStateProp.playerBlackMoveOptions[key].moveOptionsKing;
                    arrayWithJumpingOptionsKing = gameStateProp.playerBlackMoveOptions[key].jumpOptionsKing;
                }
    
                for (let i = 0; i < arrayWithMovingOptionsKing.length; i++) {
                    if (arrayWithMovingOptionsKing[i].hasUserPawn || arrayWithMovingOptionsKing[i].hasUserKing) {
                        let opponentTypeWhenKing;
                        if (arrayWithMovingOptionsKing[i].hasUserPawn) {
                            opponentTypeWhenKing = "pawn"
                        } else if (arrayWithMovingOptionsKing[i].hasUserKing) {
                            opponentTypeWhenKing = "king"
                        }
                        if (arrayWithJumpingOptionsKing[i].isFree) {
                            //console.log("you have to jump your king from: ", key, "to square: ", arrayWithJumpingOptionsKing[i].fieldName );
                            
                            gameStateProp[key].hasAiKing = false;
                            gameStateProp[key].isFree = true;
                            arrayWithMovingOptionsKing[i].hasUserPawn = false;
                            arrayWithMovingOptionsKing[i].hasUserKing = false;
                            arrayWithMovingOptionsKing[i].isFree = true;
                            arrayWithJumpingOptionsKing[i].hasAiKing = true;
                            arrayWithJumpingOptionsKing[i].isFree = false;
                            

                            if (returnObject.forcedMove) {
                                
                                let doCalculation = true;
                                let alternativePath = []


                                alternativePath.push(JSON.parse(JSON.stringify(gameStateProp)));

                                let isAnotherForcedMoveWhenKing = findForcedMovesAi(gameStateProp, arrayWithJumpingOptionsKing[i].fieldName, step);
                                if (isAnotherForcedMoveWhenKing.forcedMove) {
                                    doCalculation = false;
                                    if (isAnotherForcedMoveWhenKing.highestValue > returnObject.highestValue) {
                                        returnObject.newGameState = alternativePath;
                                        for (let j = 0; j < isAnotherForcedMoveWhenKing.newGameState.length; j++) {
                                            returnObject.newGameState.push(isAnotherForcedMoveWhenKing.newGameState[j]);
                                        }
                                        returnObject.highestValue = isAnotherForcedMoveWhenKing.highestValue;
                                    }
                                    
                                }


                                if (doCalculation) {
                                    let nextStep = findForcedMovesUser(gameStateProp, "none", stepNumberToPass);

                                    if (nextStep.forcedMove) {
                                        if (nextStep.lowestValue > returnObject.highestValue) {
                                            returnObject.highestValue = nextStep.lowestValue;
                                            returnObject.newGameState = alternativePath;
                                        }
                                    } else {
                                        let nextStepNoForced = findMoveUser(gameStateProp, stepNumberToPass);
                                        if (nextStepNoForced.lowestValue > returnObject.highestValue) {
                                            returnObject.highestValue = nextStepNoForced.lowestValue;
                                            returnObject.newGameState = alternativePath;
                                        }
                                    }
                                }

                               
                            } else {
                                returnObject.newGameState.push(JSON.parse(JSON.stringify(gameStateProp)));
                                returnObject.forcedMove = true;

                                let isForcedMoveWhenKing = findForcedMovesAi(gameStateProp, arrayWithJumpingOptionsKing[i].fieldName, step);
                                if (isForcedMoveWhenKing.forcedMove) {
                                    returnObject.highestValue = isForcedMoveWhenKing.highestValue;
                                    for (let j = 0; j < isForcedMoveWhenKing.newGameState.length; j++) {
                                        returnObject.newGameState.push(isForcedMoveWhenKing.newGameState[j]);
                                    }

                                }


                                if (returnObject.highestValue === null) {
                                    let nextStep = findForcedMovesUser(gameStateProp, "none", stepNumberToPass);

                                    if (nextStep.forcedMove) {
                                        returnObject.highestValue = nextStep.lowestValue;
                                    } else {
                                        let nextStepNoForced = findMoveUser(gameStateProp, stepNumberToPass);

                                        returnObject.highestValue = nextStepNoForced.lowestValue
                                    }
                                }
                                

                            }

                            

                            if (opponentTypeWhenKing === "pawn") {
                                arrayWithMovingOptionsKing[i].hasUserPawn = true;
                            } else if (opponentTypeWhenKing === "king") {
                                arrayWithMovingOptionsKing[i].hasUserKing = true;
                            }
    
                            gameStateProp[key].hasAiKing = true;
                            gameStateProp[key].isFree = false;
                            arrayWithJumpingOptionsKing[i].hasAiKing = false;
                            arrayWithMovingOptionsKing[i].isFree = false;
                            arrayWithJumpingOptionsKing[i].isFree = true;
                        }
                    }
    
                }
            }

            
            returnEarly = updateOptimalization(step, returnObject.highestValue);
            
            if (returnEarly) {
                return returnObject;
            }
            
            

        }
        
        
        
            
    }

   return returnObject;
}


let findMoveAi = (gameStateProp, step) => {
    
    let returnObject = {
        newGameState: [],
        highestValue: null,
    }
    
    let promotionFields;
    let isPromoted;
    let hasNoPawns = true;
    let hasNoMoves = true;
    let stepNumberToPass;
    let returnEarly;
    let callLastStep = false;

    stepNumberToPass = step + 1;

    if (step === stepLimit) {
        callLastStep = true;
    }

    for (const key in gameStateProp) {

        
        if (gameStateProp[key].hasAiPawn) {
            
            let arrayWithMovingOptions;
            hasNoPawns = false;

            if (aiPlayer === "white") {
                arrayWithMovingOptions = gameStateProp.playerWhiteMoveOptions[key].moveOptions;
                promotionFields = ["B8", "D8", "F8", "H8"];
            } else if (aiPlayer === "black") {
                arrayWithMovingOptions = gameStateProp.playerBlackMoveOptions[key].moveOptions;
                promotionFields = ["A1", "C1", "E1", "G1"];
            }
            
            for (let i = 0; i < arrayWithMovingOptions.length; i++) {
                if (arrayWithMovingOptions[i].isFree) {

                    hasNoMoves = false;
                    isPromoted = promotionFields.includes(arrayWithMovingOptions[i].fieldName);

                    gameStateProp[key].hasAiPawn = false;
                    gameStateProp[key].isFree = true;
                    arrayWithMovingOptions[i].isFree = false;
                    
                    if (isPromoted) {
                        arrayWithMovingOptions[i].hasAiKing = true;
                    } else {
                        arrayWithMovingOptions[i].hasAiPawn = true;
                    }

                    //drawingQueue.push(JSON.parse(JSON.stringify(gameStateProp)));
                    //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!! you moved pawn from ", key, "to square: ", arrayWithMovingOptions[i].fieldName);
                    
                    
                    let isForcedInSecond = findForcedMovesUser(gameStateProp, "none", stepNumberToPass);

                    if (isForcedInSecond.forcedMove) {
                        if (isForcedInSecond.lowestValue > returnObject.highestValue || returnObject.highestValue === null) {

                            returnObject.newGameState = [];
                            returnObject.newGameState.push(JSON.parse(JSON.stringify(gameStateProp)));
                            returnObject.highestValue = isForcedInSecond.lowestValue;
                        }
                    
                        
                    } else {
                        let nextMove = findMoveUser(gameStateProp, stepNumberToPass);

                        if (nextMove.lowestValue > returnObject.highestValue || returnObject.highestValue === null) {
                            returnObject.newGameState = [];
                            returnObject.newGameState.push(JSON.parse(JSON.stringify(gameStateProp)));
                            returnObject.highestValue = nextMove.lowestValue;
                        }

                    }

                    gameStateProp[key].hasAiPawn = true;
                    gameStateProp[key].isFree = false;
                    arrayWithMovingOptions[i].isFree = true;
                    arrayWithMovingOptions[i].hasAiPawn = false;
                    arrayWithMovingOptions[i].hasAiKing = false;
                }
            }
        }

        if (gameStateProp[key].hasAiKing) {
            
            let arrayWithMovingOptionsKing;
            hasNoPawns = false;

            if (aiPlayer === "white") {
                arrayWithMovingOptionsKing = gameStateProp.playerWhiteMoveOptions[key].moveOptionsKing;
            } else if (aiPlayer === "black") {
                arrayWithMovingOptionsKing = gameStateProp.playerBlackMoveOptions[key].moveOptionsKing;
            }
            
            for (let i = 0; i < arrayWithMovingOptionsKing.length; i++) {
                if (arrayWithMovingOptionsKing[i].isFree) {

                    hasNoMoves = false;

                    gameStateProp[key].hasAiKing = false;
                    gameStateProp[key].isFree = true;
                    arrayWithMovingOptionsKing[i].isFree = false;
                    arrayWithMovingOptionsKing[i].hasAiKing = true;
                    //console.log(" you moved king from ", key, "to square: ", arrayWithMovingOptionsKing[i].fieldName);
                    
                    let isForcedInSecondWhenKing = findForcedMovesUser(gameStateProp, "none", stepNumberToPass);

                    if (isForcedInSecondWhenKing.forcedMove) {
                        if (isForcedInSecondWhenKing.lowestValue > returnObject.highestValue || returnObject.highestValue === null) {

                            returnObject.newGameState = [];
                            returnObject.newGameState.push(JSON.parse(JSON.stringify(gameStateProp)));
                            returnObject.highestValue = isForcedInSecondWhenKing.lowestValue;
                        }
                    
                       
                    } else {
                        let nextMoveWhenKing = findMoveUser(gameStateProp, stepNumberToPass);
                        if (nextMoveWhenKing.lowestValue > returnObject.highestValue || returnObject.highestValue === null) {
                            returnObject.newGameState = [];
                            returnObject.newGameState.push(JSON.parse(JSON.stringify(gameStateProp)));
                            returnObject.highestValue = nextMoveWhenKing.lowestValue;
                        }
                    }


                    gameStateProp[key].hasAiKing = true;
                    gameStateProp[key].isFree = false;
                    arrayWithMovingOptionsKing[i].isFree = true;
                    arrayWithMovingOptionsKing[i].hasAiKing = false;
                }
            }
        }

        returnEarly = updateOptimalization(step, returnObject.highestValue);
            
        if (returnEarly) {
            return returnObject;
        }


    }

    if (hasNoPawns || hasNoMoves) {
        returnObject.highestValue = -500;
    }

    return returnObject;
}

// function that checks if there is forced capture in the next move
let findForcedMovesUser = (gameStateProp, field, step) => {
       
    let returnObject = {
        forcedMove: false,
        newGameState: [],
        lowestValue: null,
    }

    let promotionFields;
    let seventhRow;
    let isPromoted;
    let isSeventhRow;
    let secondResult;
    let stepNumberToPass;
    let returnEarly;
    let callLastStep = false;

    stepNumberToPass = step + 1;

    if (step === stepLimit) {
        callLastStep = true;
    }

    for (const key in gameStateProp) {
    
        if (field === "none" || key === field) {
    

            if (gameStateProp[key].hasUserPawn) {
                
                let arrayWithMovingOptions;
                let arrayWithJumpingOptions;

                if (userPlayer === "white") {
                    arrayWithMovingOptions = gameStateProp.playerWhiteMoveOptions[key].moveOptions;
                    arrayWithJumpingOptions = gameStateProp.playerWhiteMoveOptions[key].jumpOptions;
                    promotionFields = ["B8", "D8", "F8", "H8"];
                    seventhRow  = ["A7", "C7", "E7", "G7"];
                } else if (userPlayer === "black") {
                    arrayWithMovingOptions = gameStateProp.playerBlackMoveOptions[key].moveOptions;
                    arrayWithJumpingOptions = gameStateProp.playerBlackMoveOptions[key].jumpOptions;
                    promotionFields = ["A1", "C1", "E1", "G1"];
                    seventhRow = ["B2", "D2", "F2", "H2"];
                }

                for (let i = 0; i < arrayWithMovingOptions.length; i++) {
                    if (arrayWithMovingOptions[i].hasAiPawn || arrayWithMovingOptions[i].hasAiKing) {
                        let opponentType;
                        if (arrayWithMovingOptions[i].hasAiPawn) {
                            opponentType = "pawn"
                        } else if (arrayWithMovingOptions[i].hasAiKing) {
                            opponentType = "king"
                        }
                        if (arrayWithJumpingOptions[i].isFree) {
                            //console.log("user have to jump pawn from: ", key, "to square: ", arrayWithJumpingOptions[i].fieldName );

                            isPromoted = promotionFields.includes(arrayWithJumpingOptions[i].fieldName);
                            isSeventhRow = seventhRow.includes(arrayWithJumpingOptions[i].fieldName);
                            
                            gameStateProp[key].hasUserPawn = false;
                            gameStateProp[key].isFree = true;
                            arrayWithMovingOptions[i].hasAiPawn = false;
                            arrayWithMovingOptions[i].hasAiKing = false;
                            arrayWithMovingOptions[i].isFree = true;
                            arrayWithJumpingOptions[i].isFree = false;
                            
                            if (isPromoted) {
                                arrayWithJumpingOptions[i].hasUserKing = true;
                            } else {
                                arrayWithJumpingOptions[i].hasUserPawn = true;
                            }

                            //drawingQueue.push(JSON.parse(JSON.stringify(gameStateProp)));

                            if (returnObject.forcedMove) {
                                
                                let doCalculation = true;
                                let alternativePath = [];                                                       

                                alternativePath.push(JSON.parse(JSON.stringify(gameStateProp)));

                                if (!isPromoted && !isSeventhRow) {
                                    let isAnotherForcedMove = findForcedMovesUser(gameStateProp, arrayWithJumpingOptions[i].fieldName, step);
                                    if (isAnotherForcedMove.forcedMove) {
                                        doCalculation = false;
                                        if (isAnotherForcedMove.lowestValue < returnObject.lowestValue) {
                                            returnObject.newGameState = alternativePath;
                                            for (let j = 0; j < isAnotherForcedMove.newGameState.length; j++) {
                                                returnObject.newGameState.push(isAnotherForcedMove.newGameState[j]);
                                            }
                                            returnObject.lowestValue = isAnotherForcedMove.lowestValue;
                                        }
                                        
                                    }
                                }

                                if (doCalculation) {

                                    if (callLastStep) {
                                        calculateUserResult(userPlayer, gameStateProp);
                                        calculateAiResult(aiPlayer, gameStateProp);

                                        secondResult = aiResult - userResult;

                                        if (secondResult < returnObject.lowestValue) {
                                            returnObject.lowestValue = secondResult;
                                            returnObject.newGameState = alternativePath;
                                        }
                                    } else {
                                        let nextStep = findForcedMovesAi(gameStateProp, "none", stepNumberToPass);
                                        if (nextStep.forcedMove) {
                                            if (nextStep.highestValue < returnObject.lowestValue) {
                                                returnObject.lowestValue = nextStep.highestValue;
                                                returnObject.newGameState = alternativePath;
                                            }
                                        } else {
                                            let nextStepNoForced = findMoveAi(gameStateProp, stepNumberToPass);
                                            if (nextStepNoForced.highestValue < returnObject.lowestValue) {
                                                returnObject.lowestValue = nextStepNoForced.highestValue;
                                                returnObject.newGameState = alternativePath;
                                            }
                                        }
                                    }
                                    
                                }
 
                                
                            } else {

                                returnObject.newGameState.push(JSON.parse(JSON.stringify(gameStateProp)))
                                returnObject.forcedMove = true;

                                

                                if (!isPromoted && !isSeventhRow) {
                                    let isForcedMove = findForcedMovesUser(gameStateProp, arrayWithJumpingOptions[i].fieldName, step);
                                    if (isForcedMove.forcedMove) {
                                        returnObject.lowestValue = isForcedMove.lowestValue;
                                        for (let j = 0; j < isForcedMove.newGameState.length; j++) {
                                            returnObject.newGameState.push(isForcedMove.newGameState[j])
                                        }
                                    }
                                }


                                if (returnObject.lowestValue === null) {

                                    if (callLastStep) {
                                        calculateUserResult(userPlayer, gameStateProp);
                                        calculateAiResult(aiPlayer, gameStateProp);

                                        returnObject.lowestValue = aiResult - userResult;
                                    } else {
                                        let nextStep = findForcedMovesAi(gameStateProp, "none", stepNumberToPass);

                                        if (nextStep.forcedMove) {
                                            returnObject.lowestValue = nextStep.highestValue;
                                        } else {
                                            let nextStepNoForced = findMoveAi(gameStateProp, stepNumberToPass);

                                            returnObject.lowestValue = nextStepNoForced.highestValue
                                        }
                                    }
                                    
                                }
                                
                                

                            }



                            if (opponentType === "pawn") {
                                arrayWithMovingOptions[i].hasAiPawn = true;
                            } else if (opponentType === "king") {
                                arrayWithMovingOptions[i].hasAiKing = true;
                            }

                            gameStateProp[key].hasUserPawn = true;
                            gameStateProp[key].isFree = false;
                            arrayWithJumpingOptions[i].hasUserPawn = false;
                            arrayWithJumpingOptions[i].hasUserKing = false;
                            arrayWithMovingOptions[i].isFree = false;
                            arrayWithJumpingOptions[i].isFree = true;

                            
                            
                        }

                        
                    }

                }

            }

            if (gameStateProp[key].hasUserKing) {

                let arrayWithMovingOptionsKing;
                let arrayWithJumpingOptionsKing;

                if (userPlayer === "white") {
                    arrayWithMovingOptionsKing = gameStateProp.playerWhiteMoveOptions[key].moveOptionsKing;
                    arrayWithJumpingOptionsKing = gameStateProp.playerWhiteMoveOptions[key].jumpOptionsKing;
                } else if (userPlayer === "black") {
                    arrayWithMovingOptionsKing = gameStateProp.playerBlackMoveOptions[key].moveOptionsKing;
                    arrayWithJumpingOptionsKing = gameStateProp.playerBlackMoveOptions[key].jumpOptionsKing;
                }

                for (let i = 0; i < arrayWithMovingOptionsKing.length; i++) {
                    if (arrayWithMovingOptionsKing[i].hasAiPawn || arrayWithMovingOptionsKing[i].hasAiKing) {
                        let opponentTypeWhenKing;
                        if (arrayWithMovingOptionsKing[i].hasAiPawn) {
                            opponentTypeWhenKing = "pawn"
                        } else if (arrayWithMovingOptionsKing[i].hasAiKing) {
                            opponentTypeWhenKing = "king"
                        }
                        if (arrayWithJumpingOptionsKing[i].isFree) {
                            //console.log("user have to jump king from: ", key, "to square: ", arrayWithJumpingOptionsKing[i].fieldName );
                            
                            gameStateProp[key].hasUserKing = false;
                            gameStateProp[key].isFree = true;
                            arrayWithMovingOptionsKing[i].hasAiPawn = false;
                            arrayWithMovingOptionsKing[i].hasAiKing = false;
                            arrayWithMovingOptionsKing[i].isFree = true;
                            arrayWithJumpingOptionsKing[i].hasUserKing = true;
                            arrayWithJumpingOptionsKing[i].isFree = false;
                            

                            if (returnObject.forcedMove) {
                                let doCalculation = true;
                                let alternativePath = [];

                                alternativePath.push(JSON.parse(JSON.stringify(gameStateProp)));

                                let isAnotherForcedMoveWhenKing = findForcedMovesUser(gameStateProp, arrayWithJumpingOptionsKing[i].fieldName, step);
                                if (isAnotherForcedMoveWhenKing.forcedMove) {
                                    doCalculation = false;
                                    if (isAnotherForcedMoveWhenKing.lowestValue < returnObject.lowestValue) {
                                        returnObject.newGameState = alternativePath;
                                        for (let j = 0; j < isAnotherForcedMoveWhenKing.newGameState.length; j++) {
                                            returnObject.newGameState.push(isAnotherForcedMoveWhenKing.newGameState[j]);
                                        }
                                        returnObject.lowestValue = isAnotherForcedMoveWhenKing.lowestValue;
                                    }
                                    
                                }

                                if (doCalculation) {
                                    if (callLastStep) {
                                        calculateUserResult(userPlayer, gameStateProp);
                                        calculateAiResult(aiPlayer, gameStateProp);

                                        secondResult = aiResult - userResult;

                                        if (secondResult < returnObject.lowestValue) {
                                            returnObject.lowestValue = secondResult;
                                            returnObject.newGameState = alternativePath;
                                        }
                                    } else {
                                        let nextStep = findForcedMovesAi(gameStateProp, "none", stepNumberToPass);
                                        if (nextStep.forcedMove) {
                                            if (nextStep.highestValue < returnObject.lowestValue) {
                                                returnObject.lowestValue = nextStep.highestValue;
                                                returnObject.newGameState = alternativePath;
                                            }
                                        } else {
                                            let nextStepNoForced = findMoveAi(gameStateProp, stepNumberToPass);
                                            if (nextStepNoForced.highestValue < returnObject.lowestValue) {
                                                returnObject.lowestValue = nextStepNoForced.highestValue;
                                                returnObject.newGameState = alternativePath;
                                            }
                                        }
                                    }
                                    
                                }
                                
                            } else {
                                returnObject.newGameState.push(JSON.parse(JSON.stringify(gameStateProp)));
                                returnObject.forcedMove = true;

                                let isForcedMoveWhenKing = findForcedMovesUser(gameStateProp, arrayWithJumpingOptionsKing[i].fieldName, step);
                                if (isForcedMoveWhenKing.forcedMove) {
                                    returnObject.lowestValue = isForcedMoveWhenKing.lowestValue;
                                    for (let j = 0; j < isForcedMoveWhenKing.newGameState.length; j++) {
                                        returnObject.newGameState.push(isForcedMoveWhenKing.newGameState[j]);
                                    }
                                }

                                if (returnObject.lowestValue === null) {
                                    if (callLastStep) {
                                        calculateUserResult(userPlayer, gameStateProp);
                                        calculateAiResult(aiPlayer, gameStateProp);

                                        returnObject.lowestValue = aiResult - userResult;
                                    } else {
                                        let nextStep = findForcedMovesAi(gameStateProp, "none", stepNumberToPass);

                                        if (nextStep.forcedMove) {
                                            returnObject.lowestValue = nextStep.highestValue;
                                        } else {
                                            let nextStepNoForced = findMoveAi(gameStateProp, stepNumberToPass);

                                            returnObject.lowestValue = nextStepNoForced.highestValue
                                        }
                                    }
                                    
                                }
                                
                            }


                            

                            if (opponentTypeWhenKing === "pawn") {
                                arrayWithMovingOptionsKing[i].hasAiPawn = true;
                            } else if (opponentTypeWhenKing === "king") {
                                arrayWithMovingOptionsKing[i].hasAiKing = true;
                            }

                            gameStateProp[key].hasUserKing = true;
                            gameStateProp[key].isFree = false;
                            arrayWithJumpingOptionsKing[i].hasUserKing = false;
                            arrayWithMovingOptionsKing[i].isFree = false;
                            arrayWithJumpingOptionsKing[i].isFree = true;
                        }
                    }

                }
            }
        

            returnEarly = updateOptimalization(step, returnObject.lowestValue);
            
            if (returnEarly) {
                return returnObject;
            }


        }
           
    }

    return returnObject;
}


let findMoveUser = (gameStateProp, step) => {
    
    let returnObject = {
        newGameState: [],
        lowestValue: null,
    }
    
    let promotionFields;
    let isPromoted;
    let hasNoPawns = true;
    let hasNoMoves = true;
    let resultLastStep;
    let stepNumberToPass;
    let callLastStep = false;

    stepNumberToPass = step + 1;

    if (step === stepLimit) {
        callLastStep = true;
    }

    for (const key in gameStateProp) {

    
        if (gameStateProp[key].hasUserPawn) {
            
            let arrayWithMovingOptions;
            hasNoPawns = false;

            if (userPlayer === "white") {
                arrayWithMovingOptions = gameStateProp.playerWhiteMoveOptions[key].moveOptions;
                promotionFields = ["B8", "D8", "F8", "H8"];
            } else if (userPlayer === "black") {
                arrayWithMovingOptions = gameStateProp.playerBlackMoveOptions[key].moveOptions;
                promotionFields = ["A1", "C1", "E1", "G1"];
            }
            
            for (let i = 0; i < arrayWithMovingOptions.length; i++) {
                if (arrayWithMovingOptions[i].isFree) {

                    hasNoMoves = false;
                    isPromoted = promotionFields.includes(arrayWithMovingOptions[i].fieldName);

                    gameStateProp[key].hasUserPawn = false;
                    gameStateProp[key].isFree = true;
                    arrayWithMovingOptions[i].isFree = false;

                    if (isPromoted) {
                        arrayWithMovingOptions[i].hasUserKing = true;
                    } else {
                        arrayWithMovingOptions[i].hasUserPawn = true;
                    }

                    //console.log(" user moved pawn from ", key, "to square: ", arrayWithMovingOptions[i].fieldName);

                    //drawingQueue.push(JSON.parse(JSON.stringify(gameStateProp)));

                    if (callLastStep) {
                        calculateUserResult(userPlayer, gameStateProp);
                        calculateAiResult(aiPlayer, gameStateProp);

                        resultLastStep = aiResult - userResult;
                        
                        if (resultLastStep < returnObject.lowestValue || returnObject.lowestValue === null) {
                            
                            returnObject.lowestValue = resultLastStep;
                        }
                    } else {
                        let isForcedInThird = findForcedMovesAi(gameStateProp, "none", stepNumberToPass);

                        if (isForcedInThird.forcedMove) {
                            if (isForcedInThird.highestValue < returnObject.lowestValue || returnObject.lowestValue === null) {
                                returnObject.lowestValue = isForcedInThird.highestValue;
                            } 
                        } else {
                            let nextMove = findMoveAi(gameStateProp, stepNumberToPass);
                            if (nextMove.highestValue < returnObject.lowestValue  || returnObject.lowestValue === null) {
                                returnObject.lowestValue = nextMove.highestValue;
                            }
                        }
                    }
                    
                    
                    
                    gameStateProp[key].hasUserPawn = true;
                    gameStateProp[key].isFree = false;
                    arrayWithMovingOptions[i].isFree = true;
                    arrayWithMovingOptions[i].hasUserPawn = false;
                    arrayWithMovingOptions[i].hasUserKing = false;
                }
            }
        }
        
        if (gameStateProp[key].hasUserKing) {
            
            let arrayWithMovingOptionsKing;
            hasNoPawns = false;
            
            if (userPlayer === "white") {
                arrayWithMovingOptionsKing = gameStateProp.playerWhiteMoveOptions[key].moveOptionsKing;
            } else if (userPlayer === "black") {
                arrayWithMovingOptionsKing = gameStateProp.playerBlackMoveOptions[key].moveOptionsKing;
            }
            
            for (let i = 0; i < arrayWithMovingOptionsKing.length; i++) {
                if (arrayWithMovingOptionsKing[i].isFree) {
                    hasNoMoves = false;

                    gameStateProp[key].hasUserKing = false;
                    gameStateProp[key].isFree = true;
                    arrayWithMovingOptionsKing[i].isFree = false;
                    arrayWithMovingOptionsKing[i].hasUserKing = true;
                    //console.log(" user moved king from ", key, arrayWithMovingOptionsKing[i].fieldName);

                    if (callLastStep) {
                        calculateUserResult(userPlayer, gameStateProp);
                        calculateAiResult(aiPlayer, gameStateProp);

                        resultLastStep = aiResult - userResult;

                        if (resultLastStep < returnObject.lowestValue || returnObject.lowestValue === null) {
                            
                            returnObject.lowestValue = resultLastStep;
                        }
                    } else {
                        let isForcedInThirdWhenKing = findForcedMovesAi(gameStateProp, "none", stepNumberToPass);

                        if (isForcedInThirdWhenKing.forcedMove) {
                            if (isForcedInThirdWhenKing.highestValue < returnObject.lowestValue || returnObject.lowestValue === null) {
                                returnObject.lowestValue = isForcedInThirdWhenKing.highestValue;
                            }
                        } else {
                            let nextMoveWhenKing = findMoveAi(gameStateProp, stepNumberToPass);
                            if (nextMoveWhenKing.highestValue < returnObject.lowestValue  || returnObject.lowestValue === null) {
                                returnObject.lowestValue = nextMoveWhenKing.highestValue;
                            }
                        }
                    }
                    
                    gameStateProp[key].hasUserKing = true;
                    gameStateProp[key].isFree = false;
                    arrayWithMovingOptionsKing[i].isFree = true;
                    arrayWithMovingOptionsKing[i].hasUserKing = false;
                }
            }
        }

        returnEarly = updateOptimalization(step, returnObject.lowestValue);
        
        if (returnEarly) {
            return returnObject;
        }


    }

    if (hasNoPawns || hasNoMoves) {
        returnObject.lowestValue = 500;
    }

    return returnObject;
}

 
let chooseBestMove = () => {
    
    console.log("user Player turn: ",userPlayerTurn);
    console.log("setp limit before move:", stepLimit);

    
    if (userPlayerTurn) {
        if (isForcedResponse || continueCaptureFrom != "none") {
            if (continueCaptureFrom != "none") {
                chooseFieldForcedMove();
            } else {
                for (const key in gameState) {
                    if (gameState[key].fieldName) {
                        document.getElementById(gameState[key].fieldName).addEventListener("click", chooseFieldForcedMove);
                    }
                }
                for (const key in gameStateSmall) {
                    if (gameStateSmall[key].fieldName) {
                        document.getElementById(gameStateSmall[key].fieldName).addEventListener("click", chooseFieldForcedMove);
                    }
                }
            }
        } else {
            let userLost = findMoveUser(gameState, stepLimit);
            if (userLost.lowestValue === 500) {
                console.log("user lost");
                resultTestContent.innerHTML = "YOU LOST";
                resultTestContent.style.color = "rgb(199, 51, 1)";
                resultTextDiv.style.display = "block";
                clearBoard();
                gameOn = false;
                disableChoice();
                return;
            }



            

            if (offerDrawFunction()) {
                drawTextContent.style.display = "inline"
                buttonYes.style.display = "inline"
                buttonNo.style.display = "inline"

            }

            for (const key in gameState) {
                if (gameState[key].fieldName) {
                    document.getElementById(gameState[key].fieldName).addEventListener("click", chooseField);
                }
            }
            for (const key in gameStateSmall) {
                if (gameStateSmall[key].fieldName) {
                    document.getElementById(gameStateSmall[key].fieldName).addEventListener("click", chooseField);
                }
            }
        }
        

        isForcedResponse = false;
    } else {

        
        if (aiKingNum === 2 && userKingNum === 1) {
            if (
                gameState.G1.hasUserKing ||
                gameState.H2.hasUserKing ||
                gameState.A7.hasUserKing ||
                gameState.B8.hasUserKing 
            ) {
                stepLimit = 4;
                console.log("step limit is: ", stepLimit);
            }
        } 
        
        if ( aiKingNum === 2 && userKingNum === 1) {
            if (gameState.E1.hasUserKing || gameState.H4.hasUserKing || gameState.A5.hasUserKing || gameState.D8.hasUserKing) {
                stepLimit = 6;
            }
            
        }

        

        stepNumber = 1;
        let isForcedMove = findForcedMovesAi(gameState, "none", stepNumber);
        
        if (isForcedMove.forcedMove) {


            for (const key in gameState) {
                if (gameState[key].isFree != isForcedMove.newGameState[isForcedMove.newGameState.length - 1][key].isFree) {
                    gameState[key].isFree = !gameState[key].isFree;
                    if (gameState[key].hasAiPawn != isForcedMove.newGameState[isForcedMove.newGameState.length - 1][key].hasAiPawn) {
                        gameState[key].hasAiPawn = !gameState[key].hasAiPawn;
                    }
                    if (gameState[key].hasAiKing != isForcedMove.newGameState[isForcedMove.newGameState.length - 1][key].hasAiKing) {
                        gameState[key].hasAiKing = !gameState[key].hasAiKing;
                    }
                    if (gameState[key].hasUserPawn != isForcedMove.newGameState[isForcedMove.newGameState.length - 1][key].hasUserPawn) {
                        gameState[key].hasUserPawn = !gameState[key].hasUserPawn;
                    }
                    if (gameState[key].hasUserKing != isForcedMove.newGameState[isForcedMove.newGameState.length - 1][key].hasUserKing) {
                        gameState[key].hasUserKing = !gameState[key].hasUserKing;
                    }
                    
                }
                
            }
            
            
            if (isForcedMove.newGameState.length > 1) {
                drawSequence(isForcedMove.newGameState);
            } else {
                drawBoard(gameState);
            }

            
            userPlayerTurn = true;
            isFieldChoosen = false;

            isForcedResponse = checkForForcedResponse(gameState, "none");
            console.log("is there forced capture in replay to AI move: ", isForcedResponse);

            drawCountDown = drawLimit;
            
            chooseBestMove();


        } else {

            let bestMove = findMoveAi(gameState, stepNumber);
            let aiLost = findMoveAi(gameState, stepLimit - 1);
            if (aiLost.highestValue === -500) {
                console.log("AI lost");
                resultTestContent.innerHTML = "YOU WON";
                resultTestContent.style.color = "rgb(9, 104, 12)";
                resultTextDiv.style.display = "block"
                clearBoard();
                gameOn = false;
                disableChoice();
                return;
            }
            console.log(bestMove);


            for (const key in gameState) {
                if (gameState[key].isFree != bestMove.newGameState[bestMove.newGameState.length - 1][key].isFree) {
                    gameState[key].isFree = !gameState[key].isFree;
                    if (gameState[key].hasAiPawn != bestMove.newGameState[bestMove.newGameState.length - 1][key].hasAiPawn) {
                        gameState[key].hasAiPawn = !gameState[key].hasAiPawn;
                    }
                    if (gameState[key].hasAiKing != bestMove.newGameState[bestMove.newGameState.length - 1][key].hasAiKing) {
                        gameState[key].hasAiKing = !gameState[key].hasAiKing;
                    }
                    
                }
                
            }
            
            drawCountDown--;

            drawBoard(gameState);
            userPlayerTurn = true;
            isFieldChoosen = false;

            isForcedResponse = checkForForcedResponse(gameState, "none");
            console.log("is there forced capture in replay to AI move: ", isForcedResponse);

            if (isForcedResponse) {
                drawCountDown = drawLimit;
            }
            
            chooseBestMove();
            
        }

    }

}

// DOM manipulation (id: chessBoard)
let drawBoard = (gameState) => {
    
    let fieldArray = [];
    let fieldArrays = [];
    let square;
    let squareLight = `<div class="squareLight" id="squareLight"></div>`;
    let blackPawn = '<img id="pawn" src="assets/blackPawn.png">';
    let blackPawn180 = '<img id="pawn180" src="assets/blackPawn.png">';
    let whitePawn = '<img id="pawn" src="assets/whitePawn.png">';
    let whitePawn180 = '<img id="pawn180" src="assets/whitePawn.png">';
    let whiteKing = '<img id="king" src="assets/whiteKing.png">';
    let whiteKing180 = '<img id="king180" src="assets/whiteKing.png">';
    let blackKing = '<img id="king" src="assets/blackKing.png">';
    let blackKing180 = '<img id="king180" src="assets/blackKing.png">';
    let blackPawnSmall = '<img id="pawnSmall" src="assets/blackPawn.png">';
    let blackPawn180Small = '<img id="pawn180Small" src="assets/blackPawn.png">';
    let whitePawnSmall = '<img id="pawnSmall" src="assets/whitePawn.png">';
    let whitePawn180Small = '<img id="pawn180Small" src="assets/whitePawn.png">';
    let whiteKingSmall = '<img id="kingSmall" src="assets/whiteKing.png">';
    let whiteKing180Small = '<img id="king180Small" src="assets/whiteKing.png">';
    let blackKingSmall = '<img id="kingSmall" src="assets/blackKing.png">';
    let blackKing180Small = '<img id="king180Small" src="assets/blackKing.png">';
    let pawn = '<img></img>';
    let aiPawn = aiPlayer === "white" ? whitePawn180 : blackPawn;
    let userPawn = userPlayer === "white" ? whitePawn : blackPawn180;
    let aiKing =  aiPlayer === "white" ? whiteKing180 : blackKing;
    let userKing =  userPlayer === "white" ? whiteKing : blackKing180;
    let aiPawnSmall = aiPlayer === "white" ? whitePawn180Small : blackPawnSmall;
    let userPawnSmall = userPlayer === "white" ? whitePawnSmall : blackPawn180Small;
    let aiKingSmall =  aiPlayer === "white" ? whiteKing180Small : blackKingSmall;
    let userKingSmall =  userPlayer === "white" ? whiteKingSmall : blackKing180Small;

    chessBoardDiv.innerHTML = null;
    chessBoardDivSmall.innerHTML = null;

    for (const key in gameState) {
        if (gameState[key].column > 0) {
            let fieldObj = {
                id: gameState[key].fieldName,
                hasAiPawn: gameState[key].hasAiPawn,
                hasUserPawn: gameState[key].hasUserPawn,
                hasAiKing: gameState[key].hasAiKing,
                hasUserKing: gameState[key].hasUserKing
            }
            fieldArray.push(fieldObj);
        }
    }


    for (let i = 0; i < fieldArray.length; i += 4) {
        let chunk = fieldArray.slice(i, i + 4);
        fieldArrays.push(chunk);
    }



    for (let i = fieldArrays.length - 1; i >= 0; i--) {
        if (i%2 !== 0) {
            for (let j = 0; j < fieldArrays[i].length; j++) {
                
                if (fieldArrays[i][j].hasAiPawn) {
                    pawn = aiPawn;
                } else if (fieldArrays[i][j].hasUserPawn) {
                    pawn = userPawn;
                } else if (fieldArrays[i][j].hasAiKing) {
                    pawn = aiKing;
                } else if (fieldArrays[i][j].hasUserKing) {
                    pawn = userKing;
                }
                
                square = `<div class="squareDark" id=${fieldArrays[i][j].id}>${pawn}</div>`;
                chessBoardDiv.innerHTML += squareLight;
                chessBoardDiv.innerHTML += square;
                // chessBoardDivSmall.innerHTML += squareLight;
                // chessBoardDivSmall.innerHTML += square;
                pawn = '<img></img>';
            }
        } else {
            for (let j = 0; j < fieldArrays[i].length; j++) {
                
                if (fieldArrays[i][j].hasAiPawn) {
                    pawn = aiPawn;
                } else if (fieldArrays[i][j].hasUserPawn) {
                    pawn = userPawn;
                } else if (fieldArrays[i][j].hasAiKing) {
                    pawn = aiKing;
                } else if (fieldArrays[i][j].hasUserKing) {
                    pawn = userKing;
                }

                square = `<div class="squareDark" id=${fieldArrays[i][j].id}>${pawn}</div>`;
                chessBoardDiv.innerHTML += square;
                chessBoardDiv.innerHTML += squareLight;
                // chessBoardDivSmall.innerHTML += square;
                // chessBoardDivSmall.innerHTML += squareLight;
                pawn = '<img></img>';
            }
        }


    }

    for (let i = fieldArrays.length - 1; i >= 0; i--) {
        if (i%2 !== 0) {
            for (let j = 0; j < fieldArrays[i].length; j++) {
                
                if (fieldArrays[i][j].hasAiPawn) {
                    pawn = aiPawnSmall;
                } else if (fieldArrays[i][j].hasUserPawn) {
                    pawn = userPawnSmall;
                } else if (fieldArrays[i][j].hasAiKing) {
                    pawn = aiKingSmall;
                } else if (fieldArrays[i][j].hasUserKing) {
                    pawn = userKingSmall;
                }
                
                square = `<div class="squareDark" id=${fieldArrays[i][j].id}Small>${pawn}</div>`;
                chessBoardDivSmall.innerHTML += squareLight;
                chessBoardDivSmall.innerHTML += square;
                pawn = '<img></img>';
            }
        } else {
            for (let j = 0; j < fieldArrays[i].length; j++) {
                
                if (fieldArrays[i][j].hasAiPawn) {
                    pawn = aiPawnSmall;
                } else if (fieldArrays[i][j].hasUserPawn) {
                    pawn = userPawnSmall;
                } else if (fieldArrays[i][j].hasAiKing) {
                    pawn = aiKingSmall;
                } else if (fieldArrays[i][j].hasUserKing) {
                    pawn = userKingSmall;
                }

                square = `<div class="squareDark" id=${fieldArrays[i][j].id}Small>${pawn}</div>`;
                chessBoardDivSmall.innerHTML += square;
                chessBoardDivSmall.innerHTML += squareLight;
                pawn = '<img></img>';
            }
        }


    }

    if (aiPlayer === "white") {
        chessBoardDiv.style.transform = "rotate(180deg)";
        chessBoardDivSmall.style.transform = "rotate(180deg)";
    }


}

let clearBoard = (redraw) => {
    
    for (const key in gameState) {
        if (gameState[key].hasAiPawn || 
            gameState[key].hasAiKing || 
            gameState[key].hasUserPawn ||
            gameState[key].hasUserKing) {
                gameState[key].isFree = true;
                gameState[key].hasAiPawn = false;
                gameState[key].hasAiKing = false;
                gameState[key].hasUserPawn = false;
                gameState[key].hasUserKing = false;
            }
    }

    if (redraw === 1) {
        drawBoard(gameState);
        gameOn = false;
        disableChoice();
    }
}

let offerDrawFunction = () => {

    let offerDraw = false;

    aiKingNum = 0;
    userKingNum = 0;
    totalPawnNumber = 0;

    for (const key in gameState) {
        if (gameState[key].hasAiKing) {
            aiKingNum++;
        } else if (gameState[key].hasUserKing) {
            userKingNum++;
        } else if (gameState[key].hasAiPawn || gameState[key].hasUserPawn) {
            totalPawnNumber++;
        }
    }

    if ((userKingNum - aiKingNum) * -1 <= 1 && drawCountDown < 0 && totalPawnNumber === 0) {
        offerDraw = true;
    }
    
    console.log("ai kings: ", aiKingNum, "user kings: ", userKingNum, "count down: ", drawCountDown);

    return offerDraw;
}

let buttonStartGame = () => {
    if (!gameOn) {
        startGame(gameState);
    }
}

let playerChooseSide = (side) => {
    if (side === 1 && !gameOn) {
        coinflip = 1;
        playerChoseSide = true;
        chooseColorBlackLink.classList.remove("active");
        chooseColorWhiteLink.classList.add("active");
        chooseColorRandomLink.classList.remove("active");
        sessionStorage.setItem("color", "1");
    } else if (side === 0 && !gameOn) {
        coinflip = 0;
        playerChoseSide = true;
        chooseColorBlackLink.classList.add("active");
        chooseColorWhiteLink.classList.remove("active");
        chooseColorRandomLink.classList.remove("active");
        sessionStorage.setItem("color", "0");
    } else if (side === 2 && !gameOn) {
        playerChoseSide = false;
        chooseColorBlackLink.classList.remove("active");
        chooseColorWhiteLink.classList.remove("active");
        chooseColorRandomLink.classList.add("active");
        sessionStorage.setItem("color", "2");
    }
}

let chooseDifficulty = (level) => {
    if (level === 0 && !gameOn) {
        stepLimit = 4;
        saveStepLimit = stepLimit;
        chooseEasyLink.classList.add("active");
        chooseHardLink.classList.remove("active");
        sessionStorage.setItem("difficulty", "0");
    } else if (level === 1 && !gameOn) {
        stepLimit = 6;
        saveStepLimit = stepLimit;
        chooseHardLink.classList.add("active");
        chooseEasyLink.classList.remove("active");
        sessionStorage.setItem("difficulty", "1");
    } 
}

let disableChoice = () => {
    
    if (gameOn) {
        chooseColorBlackLink.classList.add("disabled");
        chooseColorWhiteLink.classList.add("disabled");
        chooseColorRandomLink.classList.add("disabled");
        chooseEasyLink.classList.add("disabled");
        chooseHardLink.classList.add("disabled");
    } else {
        chooseColorBlackLink.classList.remove("disabled");
        chooseColorWhiteLink.classList.remove("disabled");
        chooseColorRandomLink.classList.remove("disabled");
        chooseEasyLink.classList.remove("disabled");
        chooseHardLink.classList.remove("disabled");
    }
}

let getSettings = () => {
    chooseDifficulty(JSON.parse(sessionStorage.getItem("difficulty")));
    playerChooseSide(JSON.parse(sessionStorage.getItem("color")));
}

let buttonNoAction = () => {
    drawCountDown = drawLimit;
    drawTextContent.style.display = "none"
    buttonYes.style.display = "none"
    buttonNo.style.display = "none"
}

let buttonYesAction = () => {
    drawCountDown = drawLimit;
    drawTextContent.style.display = "none"
    buttonYes.style.display = "none"
    buttonNo.style.display = "none"
    resultTestContent.innerHTML = "IT'S A DRAW";
    resultTestContent.style.color = "rgb(199, 51, 1)";
    resultTextDiv.style.display = "block";
    clearBoard();
    gameOn = false;
    disableChoice();
}

getSettings();

drawBoard(gameState);