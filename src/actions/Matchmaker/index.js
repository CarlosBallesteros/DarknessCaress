import { createBoardWithRiver } from '../../utils/boardGenerator.js';
import { randomNumber } from '../../utils/generalFunctions';
import { allUnits } from '../../utils/Units';
import { admins } from '../../config/admins';

export function matchmakingOn() {
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const matchmakingReference = firebase.child('matchmaking');
    matchmakingReference.on('value', snapshot => {
      if(admins.indexOf(auth.id) != -1) {
      	matchmakingReference.transaction( matchmaking => {
      		let matchmakingArray = matchmaking || [];
      		while(matchmakingArray.length > 1) {
      			const idOne = matchmakingArray.shift();
      			const idTwo = matchmakingArray.shift();
      			createNewBoard(idOne, idTwo, firebase);
      		}
          return matchmakingArray;
      	});
      }
    });
  };
}

export function matchmakingOff() {
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child('matchmaking').off();
  };
}

function createNewBoard(idOne, idTwo, firebase) {
  let newBoard = createBoardWithRiver(8, 2, 'river');
  newBoard = fillBoardWithUnits(newBoard);
  const newBoardReference = firebase.child('boards').push({board: newBoard, turn: idOne, 0: idOne, 1: idTwo});
  const newBoardId = newBoardReference.key();
  addBoardToUser(idOne, newBoardId, firebase);
  addBoardToUser(idTwo, newBoardId, firebase);
}

function fillBoardWithUnits(board) {
  for (let i = 0; i < 6; i++) {
    const unit = allUnits[randomNumber(0, 22)];
    board = placeOneUnit(unit, board, 0);
    board = placeOneUnit(unit, board, 1);
  };
  return board;
}

function placeOneUnit(unit, board, side) {
  const boardSize = board.length;
  const positionX = randomNumber(0, boardSize);
  const positionY = side === 0 ? randomNumber(0, Math.floor(boardSize / 2)) : randomNumber(Math.ceil(boardSize / 2), boardSize);
  if(board[positionX][positionY].passable === false || board[positionX][positionY].unit != null) {
    board = placeOneUnit(unit, board, side);
  }else{
    unit = Object.assign({}, unit, {army: side});
    board[positionX][positionY] = Object.assign({}, board[positionX][positionY], {unit: unit});
  }
  return board;
}

function addBoardToUser(userId, boardId, firebase) {
  firebase.child(`users/${userId}/myBoards`).transaction( boards => (boards || []).concat([boardId]) );
}
