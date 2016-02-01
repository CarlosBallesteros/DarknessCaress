import { createBoardWithRiver } from '../../utils/boardGenerator.js';
import { pushState } from 'redux-router';

import { randomNumber } from '../../utils/generalFunctions';
import { allUnits } from '../../utils/Units';

export const navigate = (path) => pushState(null, path);

export function searchNewGame(userId) {
  return (dispatch, getState) => {
    const { firebase } = getState();
    const matchmakingReference = firebase.child('matchmaking');
    matchmakingReference.transaction( matchmaking => {
      let matchmakingString = matchmaking || '';
      if(matchmakingString != '') {
        createNewBoard(matchmakingString, userId, firebase);
        matchmakingString = null;
      }else{
        matchmakingString = userId;
      }
      return matchmakingString;
    }, () => {}, false);
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
  const positionY = side === 0 ? randomNumber(0, Math.floor(boardSize / 2)) : randomNumber(Math.floor(boardSize / 2), boardSize);
  if(board[positionX][positionY].passable === false || board[positionX][positionY].unit != null) {
    board = placeOneUnit(unit, board, side);
  }else{
    unit = Object.assign({}, unit, {army: side});
    board[positionX][positionY] = Object.assign({}, board[positionX][positionY], {unit: unit});
  }
  return board;
}

function addBoardToUser(userId, boardId, firebase) {
  firebase.child(`users/${userId}/myBoards`).once('value', snapshot => {
    const oldBoards = snapshot.val() || [];
    firebase.child(`users/${userId}/myBoards`).set([boardId, ...oldBoards]);
  });
}

export function updateBoard(board, boardId) {
	return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`boards/${boardId}/board`).set(board);
  };
}
