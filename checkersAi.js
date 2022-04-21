let userPlayer = "white";
let aiPlayer = "black";
let userPlayerTurn = true;
let userResult = 0;
let aiResult = 0;


let aiPawn1, aiPawn2, aiPawn3, aiPawn4, aiPawn5, aiPawn6, aiPawn7, aiPawn8, aiPawn9, aiPawn10, aiPawn11, aiPawn12 = true;
let aiPawns = [aiPawn1, aiPawn2, aiPawn3, aiPawn4, aiPawn5, aiPawn6, aiPawn7, aiPawn8, aiPawn9, aiPawn10, aiPawn11, aiPawn12,];

let userPawn1, userPawn2, userPawn3, userPawn4, userPawn5, userPawn6, userPawn7, userPawn8, userPawn9, userPawn10, userPawn11, userPawn12 = true;
let userPawns = [userPawn1, userPawn2, userPawn3, userPawn4, userPawn5, userPawn6, userPawn7, userPawn8, userPawn9, userPawn10, userPawn11, userPawn12,];


//points for certain achivments:
//pawns on line 1-7 => 2,4,6,8,10,12,16
//king => 24
//if opponetnt pawns count > 4 king +1 point for moving back to line 1
//if opponennt pawns count < 4 king gets points for aproching opponetnts pawns 

let gameState = {
    A1: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 1,
        column: 1
    },
    C1: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 1,
        column: 3
    },
    E1: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 1,
        column: 5
    },
    G1: { 
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 1,
        column: 7
    },
    B2: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 2,
        column: 2
    },
    D2: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 2,
        column: 4
    },
    F2: {  
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 2,
        column: 6
    },
    H2: {       
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 2,
        column: 8
    },
    A3: {       
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 3,
        column: 1
    },
    C3: {       
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 3,
        column: 3
    },
    E3: {       
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 3,
        column: 5
    },
    G3: {       
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 3,
        column: 7
    },
    B4: {       
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 4,
        column: 2
    },
    D4: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 4,
        column: 4
    },
    F4: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 4,
        column: 6
    },
    H4: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 4,
        column: 8
    },
    A5: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 5,
        column: 1
    },
    C5: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 5,
        column: 3
    },
    E5: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 5,
        column: 5
    },
    G5: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 5,
        column: 7
    },
    B6: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 6,
        column: 2
    },
    D6: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 6,
        column: 4
    },
    F6: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 6,
        column: 6
    },
    H6: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 6,
        column: 8
    },
    A7: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 7,
        column: 1
    },
    C7: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 7,
        column: 3
    },
    E7: { 
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 7,
        column: 5
    },
    G7: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 7,
        column: 7
    },
    B8: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 8,
        column: 2
    },
    D8: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 8,
        column: 4
    },
    F8: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 8,
        column: 6
    },
    H8: {
        isFree: true,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 8,
        column: 8
    },
    border:{
        isFree: false,
        hasAiPawn: false,
        hasUserPawn: false,
        hasAiKing: false,
        hasUserKing: false,
        rowNumber: 0,
        column: 0
    }
}

let playerWhiteMoveOptions = {
    A1: {
        moveOptions: [gameState.B2],
        jumpOptions: [gameState.C3],
        moveOptionsKing: [gameState.B2],
        jumpOptionsKing: [gameState.C3],
    },
    C1: {
        moveOptions: [gameState.B2, gameState.D2],
        jumpOptions: [gameState.A3, gameState.E3],
        moveOptionsKing: [gameState.B2, gameState.D2],
        jumpOptionsKing: [gameState.A3, gameState.E3],
    },
    E1: {
        moveOptions: [gameState.D2, gameState.F2],
        jumpOptions: [gameState.C3, gameState.G3],
        moveOptionsKing: [gameState.D2, gameState.F2],
        jumpOptionsKing: [gameState.C3, gameState.G3],
    },
    G1: {
        moveOptions: [gameState.F2, gameState.H2],
        jumpOptions: [gameState.E3, gameState.border],
        moveOptionsKing: [gameState.F2, gameState.H2],
        jumpOptionsKing: [gameState.E3, gameState.border],
    },
    B2: {
        moveOptions: [gameState.A3, gameState.C3],
        jumpOptions: [gameState.border, gameState.D4],
        moveOptionsKing: [gameState.A3, gameState.C3, gameState.C1, gameState.A1],
        jumpOptionsKing: [gameState.border, gameState.D4, gameState.border, gameState.border],
    },
    D2: {
        moveOptions: [gameState.C3, gameState.E3],
        jumpOptions: [gameState.B4, gameState.F4],
        moveOptionsKing: [gameState.C3, gameState.E3, gameState.E1, gameState.C1],
        jumpOptionsKing: [gameState.B4, gameState.F4, gameState.border, gameState.border],
    },
    F2: {
        moveOptions: [gameState.E3, gameState.G3],
        jumpOptions: [gameState.D4, gameState.H4],
        moveOptionsKing: [gameState.E3, gameState.G3, gameState.G1, gameState.E1],
        jumpOptionsKing: [gameState.D4, gameState.H4, gameState.border, gameState.border],
    },
    H2: {
        moveOptions: [gameState.G3],
        jumpOptions: [gameState.F4],
        moveOptionsKing: [gameState.G3, gameState.G1],
        jumpOptionsKing: [gameState.F4, gameState.border],
    },
    A3: {
        moveOptions: [gameState.B4],
        jumpOptions: [gameState.C5],
        moveOptionsKing: [gameState.B4, gameState.B2],
        jumpOptionsKing: [gameState.C5, gameState.C1],
    },
    C3: {
        moveOptions: [gameState.B4, gameState.D4],
        jumpOptions: [gameState.A5, gameState.E5],
        moveOptionsKing: [gameState.B4, gameState.D4,gameState.D2, gameState.B2],
        jumpOptionsKing: [gameState.A5, gameState.E5, gameState.E1, gameState.A1],
    },
    E3: {
        moveOptions: [gameState.D4, gameState.F4],
        jumpOptions: [gameState.C5, gameState.G5],
        moveOptionsKing: [gameState.D4, gameState.F4, gameState.F2, gameState.D2],
        jumpOptionsKing: [gameState.C5, gameState.G5, gameState.G1, gameState.C1],
    },
    G3: {
        moveOptions: [gameState.F4, gameState.H4],
        jumpOptions: [gameState.E5, gameState.border],
        moveOptionsKing: [gameState.F4, gameState.H4, gameState.H2, gameState.F2],
        jumpOptionsKing: [gameState.E5, gameState.border, gameState.border, gameState.E1],
    },
    B4: {
        moveOptions: [gameState.A5, gameState.C5],
        jumpOptions: [gameState.border, gameState.D6],
        moveOptionsKing: [gameState.A5, gameState.C5, gameState.C3, gameState.A3],
        jumpOptionsKing: [gameState.border, gameState.D6, gameState.D2, gameState.border],
    },
    D4: {
        moveOptions: [gameState.C5, gameState.E5],
        jumpOptions: [gameState.B6, gameState.F6],
        moveOptionsKing: [gameState.C5, gameState.E5, gameState.E3, gameState.C3],
        jumpOptionsKing: [gameState.B6, gameState.F6, gameState.F2, gameState.B2],
    },
    F4: {
        moveOptions: [gameState.E5, gameState.G5],
        jumpOptions: [gameState.D6, gameState.H6],
        moveOptionsKing: [gameState.E5, gameState.G5, gameState.G3, gameState.E3],
        jumpOptionsKing: [gameState.D6, gameState.H6, gameState.H2, gameState.D2],
    },
    H4: {
        moveOptions: [gameState.G5],
        jumpOptions: [gameState.F6],
        moveOptionsKing: [gameState.G5, gameState.G3],
        jumpOptionsKing: [gameState.F6, gameState.F2],
    },
    A5: {
        moveOptions: [gameState.B6],
        jumpOptions: [gameState.C7],
        moveOptionsKing: [gameState.B6, gameState.B4],
        jumpOptionsKing: [gameState.C7, gameState.C3],
    },
    C5: {
        moveOptions: [gameState.B6, gameState.D6],
        jumpOptions: [gameState.A7, gameState.E7],
        moveOptionsKing: [gameState.B6, gameState.D6, gameState.D4, gameState.B4],
        jumpOptionsKing: [gameState.A7, gameState.E7, gameState.E3, gameState.A3],
    },
    E5: {
        moveOptions: [gameState.D6, gameState.F6],
        jumpOptions: [gameState.C7, gameState.G7],
        moveOptionsKing: [gameState.D6, gameState.F6, gameState.F4, gameState.D4],
        jumpOptionsKing: [gameState.C7, gameState.G7, gameState.G3, gameState.C3],
    },
    G5: {
        moveOptions: [gameState.F6, gameState.H6],
        jumpOptions: [gameState.E7, gameState.border],
        moveOptionsKing: [gameState.F6, gameState.H6, gameState.H4, gameState.F4],
        jumpOptionsKing: [gameState.E7, gameState.border, gameState.border, gameState.E3],
    },
    B6: {
        moveOptions: [gameState.A7, gameState.C7],
        jumpOptions: [gameState.border, gameState.D8],
        moveOptionsKing: [gameState.A7, gameState.C7, gameState.C5, gameState.A5],
        jumpOptionsKing: [gameState.border, gameState.D8, gameState.D4, gameState.border],
    },
    D6: {
        moveOptions: [gameState.C7, gameState.E7],
        jumpOptions: [gameState.B8, gameState.F8],
        moveOptionsKing: [gameState.C7, gameState.E7, gameState.E5, gameState.C5],
        jumpOptionsKing: [gameState.B8, gameState.F8, gameState.F4, gameState.B4],
    },
    F6: {
        moveOptions: [gameState.E7, gameState.G7],
        jumpOptions: [gameState.D8, gameState.H8],
        moveOptionsKing: [gameState.E7, gameState.G7, gameState.G5, gameState.E5],
        jumpOptionsKing: [gameState.D8, gameState.H8, gameState.H4, gameState.D4],
    },
    H6: {
        moveOptions: [gameState.G7],
        jumpOptions: [gameState.F8],
        moveOptionsKing: [gameState.G7, gameState.G5],
        jumpOptionsKing: [gameState.F8, gameState.F4],
    },
    A7: {
        moveOptions: [gameState.B8],
        jumpOptions: [gameState.border],
        moveOptionsKing: [gameState.B8, gameState.B6],
        jumpOptionsKing: [gameState.border, gameState.C5],
    },
    C7: {
        moveOptions: [gameState.B8, gameState.D8],
        jumpOptions: [gameState.border, gameState.border],
        moveOptionsKing: [gameState.B8, gameState.D8, gameState.D6, gameState.B6],
        jumpOptionsKing: [gameState.border, gameState.border, gameState.E5, gameState.A5],
    },
    E7: {
        moveOptions: [gameState.D8, gameState.F8],
        jumpOptions: [gameState.border, gameState.border],
        moveOptionsKing: [gameState.D8, gameState.F8, gameState.F6, gameState.D6],
        jumpOptionsKing: [gameState.border, gameState.border, gameState.G5, gameState.C5],
    },
    G7: {
        moveOptions: [gameState.F8, gameState.H8],
        jumpOptions: [gameState.border, gameState.border],
        moveOptionsKing: [gameState.F8, gameState.H8, gameState.H6, gameState.F6],
        jumpOptionsKing: [gameState.border, gameState.border, gameState.border, gameState.E5],
    },
    B8: {
        moveOptions: [gameState.border],
        jumpOptions: [gameState.border],
        moveOptionsKing: [gameState.C7, gameState.A7],
        jumpOptionsKing: [gameState.D6, gameState.border],
    },
    D8: {
        moveOptions: [gameState.border],
        jumpOptions: [gameState.border],
        moveOptionsKing: [gameState.E7, gameState.C7],
        jumpOptionsKing: [gameState.F6, gameState.B6],
    },
    F8: {
        moveOptions: [gameState.border],
        jumpOptions: [gameState.border],
        moveOptionsKing: [gameState.G7, gameState.E7],
        jumpOptionsKing: [gameState.H6, gameState.D6],
    },
    H8: {
        moveOptions: [gameState.border],
        jumpOptions: [gameState.border],
        moveOptionsKing: [gameState.G7],
        jumpOptionsKing: [gameState.F6],
    }
}

let playerBlackMoveOptions = {
    A1: {
        moveOptions: [gameState.border],
        jumpOptions: [gameState.border],
        moveOptionsKing: [gameState.B2],
        jumpOptionsKing: [gameState.C3],
    },
    C1: {
        moveOptions: [gameState.border],
        jumpOptions: [gameState.border],
        moveOptionsKing: [gameState.B2, gameState.D2],
        jumpOptionsKing: [gameState.A3, gameState.E3],
    },
    E1: {
        moveOptions: [gameState.border],
        jumpOptions: [gameState.border],
        moveOptionsKing: [gameState.D2, gameState.F2],
        jumpOptionsKing: [gameState.C3, gameState.G3],
    },
    G1: {
        moveOptions: [gameState.border],
        jumpOptions: [gameState.border],
        moveOptionsKing: [gameState.F2, gameState.H2],
        jumpOptionsKing: [gameState.E3, gameState.border],
    },
    B2: {
        moveOptions: [gameState.C1, gameState.A1],
        jumpOptions: [gameState.border, gameState.border],
        moveOptionsKing: [gameState.C1, gameState.A1, gameState.A3, gameState.C3],
        jumpOptionsKing: [gameState.border, gameState.border, gameState.border, gameState.D4],
    },
    D2: {
        moveOptions: [gameState.E1, gameState.C1],
        jumpOptions: [gameState.border, gameState.border],
        moveOptionsKing: [gameState.E1, gameState.C1, gameState.C3, gameState.E3],
        jumpOptionsKing: [gameState.border, gameState.border, gameState.B4, gameState.F4],
    },
    F2: {
        moveOptions: [gameState.G1, gameState.E1],
        jumpOptions: [gameState.border, gameState.border],
        moveOptionsKing: [gameState.G1, gameState.E1, gameState.E3, gameState.G3],
        jumpOptionsKing: [gameState.border, gameState.border, gameState.D4, gameState.H4],
    },
    H2: {
        moveOptions: [gameState.G1],
        jumpOptions: [gameState.border],
        moveOptionsKing: [gameState.G1, gameState.G3],
        jumpOptionsKing: [gameState.border, gameState.F4],
    },
    A3: {
        moveOptions: [gameState.B2],
        jumpOptions: [gameState.C1],
        moveOptionsKing: [gameState.B2, gameState.B4],
        jumpOptionsKing: [gameState.C1, gameState.C5],
    },
    C3: {
        moveOptions: [gameState.D2, gameState.B2],
        jumpOptions: [gameState.E1, gameState.A1],
        moveOptionsKing: [gameState.D2, gameState.B2, gameState.B4, gameState.D4],
        jumpOptionsKing: [gameState.E1, gameState.A1, gameState.A5, gameState.E5],
    },
    E3: {
        moveOptions: [gameState.F2, gameState.D2],
        jumpOptions: [gameState.G1, gameState.C1],
        moveOptionsKing: [gameState.F2, gameState.D2, gameState.D4, gameState.F4],
        jumpOptionsKing: [gameState.G1, gameState.C1, gameState.C5, gameState.G5],
    },
    G3: {
        moveOptions: [gameState.H2, gameState.F2],
        jumpOptions: [gameState.border, gameState.E1],
        moveOptionsKing: [gameState.H2, gameState.F2, gameState.F4, gameState.H4],
        jumpOptionsKing: [gameState.border, gameState.E1, gameState.E5, gameState.border],
    },
    B4: {
        moveOptions: [gameState.C3, gameState.A3],
        jumpOptions: [gameState.D2, gameState.border],
        moveOptionsKing: [gameState.C3, gameState.A3, gameState.A5, gameState.C5],
        jumpOptionsKing: [gameState.D2, gameState.border, gameState.border, gameState.D6],
    },
    D4: {
        moveOptions: [gameState.E3, gameState.C3],
        jumpOptions: [gameState.F2, gameState.B2],
        moveOptionsKing: [gameState.E3, gameState.C3, gameState.C5, gameState.E5],
        jumpOptionsKing: [gameState.F2, gameState.B2, gameState.B6, gameState.F6],
    },
    F4: {
        moveOptions: [gameState.G3, gameState.E3],
        jumpOptions: [gameState.H2, gameState.D2],
        moveOptionsKing: [gameState.G3, gameState.E3, gameState.E5, gameState.G5],
        jumpOptionsKing: [gameState.H2, gameState.D2, gameState.D6, gameState.H6],
    },
    H4: {
        moveOptions: [gameState.G3],
        jumpOptions: [gameState.F2],
        moveOptionsKing: [gameState.G3, gameState.G5],
        jumpOptionsKing: [gameState.F2, gameState.F6],
    },
    A5: {
        moveOptions: [gameState.B4],
        jumpOptions: [gameState.C3],
        moveOptionsKing: [gameState.B4, gameState.B6],
        jumpOptionsKing: [gameState.C3, gameState.C7],
    },
    C5: {
        moveOptions: [gameState.D4, gameState.B4],
        jumpOptions: [gameState.E3, gameState.A3],
        moveOptionsKing: [gameState.D4, gameState.B4, gameState.B6, gameState.D6],
        jumpOptionsKing: [gameState.E3, gameState.A3, gameState.A7, gameState.E7],
    },
    E5: {
        moveOptions: [gameState.F4, gameState.D4],
        jumpOptions: [gameState.G3, gameState.C3],
        moveOptionsKing: [gameState.F4, gameState.D4, gameState.D6, gameState.F6],
        jumpOptionsKing: [gameState.G3, gameState.C3, gameState.C7, gameState.G7],
    },
    G5: {
        moveOptions: [gameState.H4, gameState.F4],
        jumpOptions: [gameState.border, gameState.E3],
        moveOptionsKing: [gameState.H4, gameState.F4, gameState.F6, gameState.H6],
        jumpOptionsKing: [gameState.border, gameState.E3, gameState.E7, gameState.border],
    },
    B6: {
        moveOptions: [gameState.C5, gameState.A5],
        jumpOptions: [gameState.D4, gameState.border],
        moveOptionsKing: [gameState.C5, gameState.A5, gameState.A7, gameState.C7],
        jumpOptionsKing: [gameState.D4, gameState.border, gameState.border, gameState.D8],
    },
    D6: {
        moveOptions: [gameState.E5, gameState.C5],
        jumpOptions: [gameState.F4, gameState.B4],
        moveOptionsKing: [gameState.E5, gameState.C5, gameState.C7, gameState.E7],
        jumpOptionsKing: [gameState.F4, gameState.B4, gameState.B8, gameState.F8],
    },
    F6: {
        moveOptions: [gameState.G5, gameState.E5],
        jumpOptions: [gameState.H4, gameState.D4],
        moveOptionsKing: [gameState.G5, gameState.E5, gameState.E7, gameState.G7],
        jumpOptionsKing: [gameState.H4, gameState.D4, gameState.D8, gameState.H8],
    },
    H6: {
        moveOptions: [gameState.G5],
        jumpOptions: [gameState.F4],
        moveOptionsKing: [gameState.G5, gameState.G7],
        jumpOptionsKing: [gameState.F4, gameState.F8],
    },
    A7: {
        moveOptions: [gameState.B6],
        jumpOptions: [gameState.C5],
        moveOptionsKing: [gameState.B6, gameState.B8],
        jumpOptionsKing: [gameState.C5, gameState.border],
    },
    C7: {
        moveOptions: [gameState.D6, gameState.B6],
        jumpOptions: [gameState.E5, gameState.A5],
        moveOptionsKing: [gameState.D6, gameState.B6, gameState.B8, gameState.D8],
        jumpOptionsKing: [gameState.E5, gameState.A5, gameState.border, gameState.border],
    },
    E7: {
        moveOptions: [gameState.F6, gameState.D6],
        jumpOptions: [gameState.G5, gameState.C5],
        moveOptionsKing: [gameState.F6, gameState.D6, gameState.D8, gameState.F8],
        jumpOptionsKing: [gameState.G5, gameState.C5, gameState.border, gameState.border],
    },
    G7: {
        moveOptions: [gameState.H6, gameState.F6],
        jumpOptions: [gameState.border, gameState.E5],
        moveOptionsKing: [gameState.H6, gameState.F6, gameState.F8, gameState.H8],
        jumpOptionsKing: [gameState.border, gameState.E5, gameState.border, gameState.border],
    },
    B8: {
        moveOptions: [gameState.C7, gameState.A7],
        jumpOptions: [gameState.D6, gameState.border],
        moveOptionsKing: [gameState.C7, gameState.A7],
        jumpOptionsKing: [gameState.D6, gameState.border],
    },
    D8: {
        moveOptions: [gameState.E7, gameState.C7],
        jumpOptions: [gameState.F6, gameState.B6],
        moveOptionsKing: [gameState.E7, gameState.C7],
        jumpOptionsKing: [gameState.F6, gameState.B6],
    },
    F8: {
        moveOptions: [gameState.G7, gameState.E7],
        jumpOptions: [gameState.H6, gameState.D6],
        moveOptionsKing: [gameState.G7, gameState.E7],
        jumpOptionsKing: [gameState.H6, gameState.D6],
    },
    H8: {
        moveOptions: [gameState.G7],
        jumpOptions: [gameState.F6],
        moveOptionsKing: [gameState.G7],
        jumpOptionsKing: [gameState.F6],
    }
}

let chooseSide = () => {
    let coinflip = Math.floor(Math.random() * 2)
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


let waitForUserMove = () => {
    //actually wait for players action
    console.log("users turn");
    userPlayerTurn = false;
    chooseBestMove(gameState, aiPlayer, userPlayer);
}

let startGame = () => {
   
    chooseSide();
    
    console.log("AI players has color:", aiPlayer);
    console.log("user players has color:", userPlayer);
    
    chooseBestMove(gameState, aiPlayer, userPlayer);
    
}


let calculateAiResult = (player, gameStateCalc) => {
    
    aiResult = 0;
    
    for (const key in gameStateCalc) {
        if (gameStateCalc[key].hasAiPawn && player === "white") {
            if (gameStateCalc[key].rowNumber === 1) {
                aiResult += 2 
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
        } else if (gameStateCalc[key].hasAiPawn && player === "black") {
            if (gameStateCalc[key].rowNumber === 8) {
                aiResult += 2 
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
        }
    }
    console.log(gameStateCalc);
}


let calculateUserResult = (player, gameStateCalc) => {

    userResult = 0;

    for (const key in gameStateCalc) {
        if (gameStateCalc[key].hasUserPawn && player === "white") {
            if (gameStateCalc[key].rowNumber === 1) {
                userResult += 2 
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
        } else if (gameStateCalc[key].hasUserPawn && player === "black") {
            if (gameStateCalc[key].rowNumber === 8) {
                userResult += 2 
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
        }
    }
}


let modifyGameState = () => {
    // modify state after move
};

let findForcedMoves = () => {
    let arrayOfGameStates = [];
        
    for (const key in gameState) {
        
        
        if (gameState[key].hasAiPawn) {
            
            let arrayWithMovingOptions;
            let arrayWithJumpingOptions;

            if (aiPlayer === "white") {
                arrayWithMovingOptions = playerWhiteMoveOptions[key].moveOptions;
                arrayWithJumpingOptions = playerWhiteMoveOptions[key].jumpOptions;
            } else if (aiPlayer === "black") {
                arrayWithMovingOptions = playerBlackMoveOptions[key].moveOptions;
                arrayWithJumpingOptions = playerBlackMoveOptions[key].jumpOptions;
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
                        console.log("you have to jump your pawn from: ", key, "to square: ", arrayWithJumpingOptions );
                        
                        gameState[key].hasAiPawn = false;
                        gameState[key].isFree = true;
                        arrayWithMovingOptions[i].hasUserPawn = false;
                        arrayWithMovingOptions[i].hasUserKing = false;
                        arrayWithMovingOptions[i].isFree = true;
                        arrayWithJumpingOptions[i].hasAiPawn = true;
                        arrayWithJumpingOptions[i].isFree = false;

                        console.log(gameState);

                        calculateAiResult(aiPlayer, gameState);
                        calculateUserResult(userPlayer, gameState);
                        console.log("AI result", aiResult);
                        console.log("user result", userResult);
                        

                        let newGameState = JSON.parse(JSON.stringify(gameState));


                        arrayOfGameStates.push(newGameState);
                        console.log( "Array", arrayOfGameStates);
                

                        if (opponentType === "pawn") {
                            arrayWithMovingOptions[i].hasUserPawn = true;
                        } else if (opponentType === "king") {
                            arrayWithMovingOptions[i].hasUserKing = true;
                        }

                        gameState[key].hasAiPawn = true;
                        gameState[key].isFree = false;
                        arrayWithJumpingOptions[i].hasAiPawn = false;
                        arrayWithMovingOptions[i].isFree = false;
                        arrayWithJumpingOptions[i].isFree = true;

                        console.log(gameState);
                        
                    }

                    
                }

            }

        }

        if (gameState[key].hasAiKing) {

            let arrayWithMovingOptionsKing;
            let arrayWithJumpingOptionsKarrayWithMovingOptionsKing;

            if (aiPlayer === "white") {
                arrayWithMovingOptionsKing = playerWhiteMoveOptions[key].moveOptions;
                arrayWithJumpingOptionsKarrayWithMovingOptionsKing = playerWhiteMoveOptions[key].jumpOptions;
            } else if (aiPlayer === "black") {
                arrayWithMovingOptionsKing = playerBlackMoveOptions[key].moveOptions;
                arrayWithJumpingOptionsKarrayWithMovingOptionsKing = playerBlackMoveOptions[key].jumpOptions;
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
                        console.log("you have to jump your king from: ", key, "to square: ", arrayWithJumpingOptionsKing );
                        
                        gameState[key].hasAiKing = false;
                        gameState[key].isFree = true;
                        arrayWithMovingOptionsKing[i].hasUserPawn = false;
                        arrayWithMovingOptionsKing[i].hasUserKing = false;
                        arrayWithMovingOptionsKing[i].isFree = true;
                        arrayWithJumpingOptionsKing[i].hasAiKing = true;
                        arrayWithJumpingOptionsKing[i].isFree = false;
                        
                        calculateAiResult(aiPlayer, gameState);
                        calculateUserResult(userPlayer, gameState);
                        console.log("AI result", aiResult);
                        console.log("user result", userResult);

                        let newGameState = JSON.parse(JSON.stringify(gameState));

                        arrayOfGameStates.push(newGameState);
                        console.log( "Array", arrayOfGameStates);
                        

                        if (opponentTypeWhenKing === "pawn") {
                            arrayWithMovingOptionsKing[i].hasUserPawn = true;
                        } else if (opponentTypeWhenKing === "king") {
                            arrayWithMovingOptionsKing[i].hasUserKing = true;
                        }

                        gameState[key].hasAiKing = true;
                        gameState[key].isFree = false;
                        arrayWithJumpingOptionsKing[i].hasAiKing = false;
                        arrayWithMovingOptionsKing[i].isFree = false;
                        arrayWithJumpingOptionsKing[i].isFree = true;
                    }
                }

            }
        }
            
    }

    return arrayOfGameStates;
}

let findFirstMove = () => {
    let arrayOfGameStates = [];

    for (const key in gameState) {

        
        if (gameState[key].hasAiPawn) {
            
            let arrayWithMovingOptions;

            if (aiPlayer === "white") {
                arrayWithMovingOptions = playerWhiteMoveOptions[key].moveOptions;
            } else if (aiPlayer === "black") {
                arrayWithMovingOptions = playerBlackMoveOptions[key].moveOptions;
            }
            
            for (let i = 0; i < arrayWithMovingOptions.length; i++) {
                if (arrayWithMovingOptions[i].isFree) {
                    gameState[key].hasAiPawn = false;
                    gameState[key].isFree = true;
                    arrayWithMovingOptions[i].isFree = false;
                    arrayWithMovingOptions[i].hasAiPawn = true;
                    console.log(" you moved pawn from ", key, " to :", arrayWithMovingOptions[i]);
                    
                    let newGameState = JSON.parse(JSON.stringify(gameState));

                    arrayOfGameStates.push(newGameState);
                    console.log( "Array", arrayOfGameStates);

                    gameState[key].hasAiPawn = true;
                    gameState[key].isFree = false;
                    arrayWithMovingOptions[i].isFree = true;
                    arrayWithMovingOptions[i].hasAiPawn = false;
                }
            }
        }

        if (gameState[key].hasAiKing) {
            
            let arrayWithMovingOptionsKing;

            if (aiPlayer === "white") {
                arrayWithMovingOptionsKing = playerWhiteMoveOptions[key].moveOptions;
            } else if (aiPlayer === "black") {
                arrayWithMovingOptionsKing = playerBlackMoveOptions[key].moveOptions;
            }
            
            for (let i = 0; i < arrayWithMovingOptionsKing.length; i++) {
                if (arrayWithMovingOptionsKing[i].isFree) {
                    gameState[key].hasAiKing = false;
                    gameState[key].isFree = true;
                    arrayWithMovingOptionsKing[i].isFree = false;
                    arrayWithMovingOptionsKing[i].hasAiKing = true;
                    console.log(" you moved pawn from ", key, " to :", arrayWithMovingOptionsKing[i]);
                    
                    let newGameState = JSON.parse(JSON.stringify(gameState));

                    arrayOfGameStates.push(newGameState);
                    console.log( "Array", arrayOfGameStates);

                    gameState[key].hasAiKing = true;
                    gameState[key].isFree = false;
                    arrayWithMovingOptionsKing[i].isFree = true;
                    arrayWithMovingOptionsKing[i].hasAiKing = false;
                }
            }
        }
    }

    return arrayOfGameStates;
}


let chooseBestMove = (gameState, aiPlayer, userPlayer) => {
    //check for possible forced moves
    //if no forced move look for best move
    //changes
    

    if (userPlayerTurn) {

        waitForUserMove();

    } else {

        let isForcedMove = findForcedMoves();
        
        let firstMove = findFirstMove();



    }

}



startGame();