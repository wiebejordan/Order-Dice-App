import {combineReducers} from 'redux';
import undoable from 'redux-undo';

const initialState = {
  game: {
    totalDice: 0,
    diceBag: [],
    diceRemaining: 0,
    pulledDice: '',
    turnNum: 1,
    playerOneTotalDice: 0,
    playerOneRemainingDice: 0,
    playerOneAmbushDice: 0,
    playerTwoTotalDice: 0,
    playerTwoRemainingDice: 0,
    playerTwoAmbushDice: 0,
    playerThreeTotalDice: 0,
    playerThreeRemainingDice: 0,
    playerThreeAmbushDice: 0,
    playerFourTotalDice: 0,
    playerFourRemainingDice: 0,
    playerFourAmbushDice: 0,
    gameOver: false,
    transition: true
  }
}

const GET_GAME = 'GET_GAME';
const CLEAR_GAME = 'CLEAR_GAME';

export function getGame(gameObj){
  return {
      type: GET_GAME,
      payload: gameObj
  }
}

export function clearGame(){
  return{
      type: CLEAR_GAME,
      payload: {}
  }
}


const game = (state = initialState, action) => {
  const {type, payload} = action;
  switch(type){
    case GET_GAME:
            return {...state, game: payload};
        case CLEAR_GAME:
            return {...state, game: payload};
        default:
            return state;
  }
}

export default combineReducers({
  game: undoable(game)
});


