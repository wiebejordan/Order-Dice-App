

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


export default function reducer(state= initialState, action){
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