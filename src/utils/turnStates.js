import { generateOverlayArray } from './turnFunctions';
/*phase GUIDE
	START: NOTHING
	MOVING: CALCULATING POSSIBLE MOVES
	MOVED: CHOSEN NEW POSITION, NOT COMMITED
	ATTACKING: CALCULATING POSSIBLE ATTACKS
	*END: COMMIT CHANGES TO FIREBASE AND RESTART
	*REphase: NOTHING IS COMMITED, RESTART
*/

//INITIAL STATE
state = {
  emptyOverlayArray: emptyOverlayArray,
  overlayArray: emptyOverlayArray,
  selectedSquare: [-1, -1],
  selectedUnit: null,
  movedSquare: [-1, -1],
  phase: 'start'
};
function setTurn(state, board) {
	const boardSize = board.length;
	const emptyOverlayArray = generateOverlayArray(boardSize);
	return {
		emptyOverlayArray: emptyOverlayArray,
	  overlayArray: emptyOverlayArray,
	  selectedSquare: [-1, -1],
	  selectedUnit: null,
	  movedSquare: [-1, -1],
	  phase: 'start'
	};
}

//SELECT SQUARE/UNIT
setState({
	emptyOverlayArray: emptyOverlayArray, //SAME
  overlayArray: emptyOverlayArray, //SAME
  selectedSquare: position, //CHANGED
  selectedUnit: unit, //CHANGED (IF...)
  movedSquare: [-1, -1], //SAME
  phase: 'start' //SAME
});
function selectSquare(state, position, unit = null) {
	return {
		emptyOverlayArray: state.emptyOverlayArray,
	  overlayArray: state.overlayArray,
	  selectedSquare: position,
	  selectedUnit: unit,
	  movedSquare: state.movedSquare,
	  phase: state.phase
	};
}

//SELECT MOVE
this.setState({
	emptyOverlayArray: emptyOverlayArray, //SAME
  overlayArray: calculateMoves(), //CHANGED
  selectedSquare: position, //SAME
  selectedUnit: unit, //SAME
  movedSquare: [-1, -1],
  phase: 'moving' //CHANGED
});
function selectMove(state) {
	return {
		emptyOverlayArray: state.emptyOverlayArray,
	  overlayArray: state.overlayArray,
	  selectedSquare: position,
	  selectedUnit: unit,
	  movedSquare: state.movedSquare,
	  phase: state.phase
	};
}

//MOVE UNIT
this.setState({
	emptyOverlayArray: emptyOverlayArray, //SAME
  overlayArray: emptyOverlayArray, //CHANGED
  selectedSquare: position, //SAME
  selectedUnit: unit, //SAME
  movedSquare: movedPosition, //CHANGED
  phase: 'moved' //CHANGED
});

//SELECT ATTACK
this.setState({
	emptyOverlayArray: emptyOverlayArray, //SAME
  overlayArray: calculateAttackArea(), //CHANGED
  selectedSquare: position, //SAME
  selectedUnit: unit, //SAME
  movedSquare: ..., //SAME AS BEFORE (DEPENDS)
  phase: 'attacking' //CHANGED
});

//ATTACK UNIT - FIREBASE
this.setState({
	emptyOverlayArray: emptyOverlayArray, //SAME
  overlayArray: emptyOverlayArray, //CHANGED
  selectedSquare: movedPosition, //CHANGED
  selectedUnit: unit, //SAME
  movedSquare: [-1, -1], //CHANGED
  phase: 'start' //CHANGED
});

//END MOVE - FIREBASE
this.setState({
	emptyOverlayArray: emptyOverlayArray, //SAME
  overlayArray: emptyOverlayArray, //CHANGED
  selectedSquare: movedPosition, //CHANGED
  selectedUnit: unit, //SAME
  movedSquare: [-1, -1], //CHANGED
  phase: 'start' //CHANGED
});

//CREATE A FUNCTION createNewState = (position, unit, oldState) => newState ???
