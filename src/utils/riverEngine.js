import { randomNumber, boardSize } from './exports';

/*
const riverLikeTerrains = [
{
id: 2,
name: 'path',
defense: 0,
avoid: 0,
movementSlow: 1,
passable: true
},
{
id: 6,
name: 'river',
defense: 0,
avoid: 0,
movementSlow: 1,
passable: false
},
{
id: 8,
name: 'lava',
defense: 0,
avoid: 0,
movementSlow: 1,
passable: false
},
{
id: 10,
name: 'bridge',
defense: 0,
avoid: 0,
movementSlow: 1,
passable: true
},
{
id: 11,
name: 'wall',
defense: 10,
avoid: 10,
movementSlow: 10,
passable: false
}
];
*/

export function randomBool() { return randomNumber(1, 10) > 5 ? true : false; }

export function riverCreator(rivers) {

}
export function firstRiverCreator() {
  let position = initPos();
  let id = generateId(position);
  const firstRiverObject = {
    name : 'river',
    unit : false,
    interactive : false,
    position : position,
    id : id,   
    sense : randomBool() ? 1 : -1,
    direction : randomBool() ? 'x' : 'y',
    isDead : randomBool(),
    hasBridge : false
  };
  return firstRiverObject;
}

export function initPos(){
  let  pos={};
  pos['x']=randomNumber(0, boardSize);
  pos['y']=randomNumber(0, boardSize);
  return pos;
}

export function generateId(position){
  return boardSize * position['y'] + position['x'];
}

export function previousPosition(i, u){
  let p=i;
  let q=u;
  const boardSize = boardSize;
//  let arrayOfPositions=[];
  if (p === 0 && q === 0) return false;
  else {
    if ( q === 0 ) {
      p--;
      q=boardSize;
    }else q--;
    return [p, q];
  }
}

export function goWithTheFlow(action){
  if(!outOfTheMap(advance())){
    if(action === 1) foward();
    else if(action === 2) rotate();
    else die();
  }else die();
}

export function outOfTheMap (position){
  if (position['x'] >= boardSize && position['y'] >= boardSize) return true;
  else return false;
}

export function advance(riverLike) { return riverLike.position[riverLike.direction] + riverLike.sense;}

export function turn(riverLike) { return riverLike.direction === 'x' ? 'y' : 'x';}

export function die(riverLike){ riverLike.isDead = true;}

//path: function (){ return 'path to the file'(direction === 'x' ? 'nombre del horizontal' : 'nombre del vertical')'.formato' }
//};
export function pathTileUnder(){ return board[this.position['x']][this.position['y']] === 'plain' ? true : false;}
