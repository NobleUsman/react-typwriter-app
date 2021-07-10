import { countCorrectCharacters } from '../utils';

export interface State {
  text: string;
  input: string;
  characters: number;
  seconds: number;
  timerId?: number;
}

export const initialState: State = {
  text:
    "Was it enough? That was the question he kept asking himself. Was being satisfied enough? He looked around him at everyone yearning to just be satisfied in their daily life and he had reached that goal. He knew that he was satisfied and he also knew it wasn't going to be enough.",
  input: '',
  characters: 0,
  seconds: 0,
  timerId: undefined,
};

export enum ActionTypes {
  CHANGE_INPUT,
  SET_TIMER,
  TICK,
}

export interface Action<T> {
  type: ActionTypes;
  payload?: T;
}

type Transducer = (state: State, action: Action<any>) => State;
type Reducer<T = any> = (state: State, payload?: T) => State;

export const changeInput: Reducer<string> = (state, input = '') => ({
  ...state,
  input,
  characters: countCorrectCharacters(state.text, input),
});

export const setTimer: Reducer<number> = (state, timerId) => ({
  ...state,
  timerId,
});

export const tick: Reducer = (state) => ({
  ...state,
  seconds: state.seconds + 1,
});

export const reducer: Transducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_INPUT:
      return changeInput(state, action.payload);
    case ActionTypes.SET_TIMER:
      return setTimer(state, action.payload);
    case ActionTypes.TICK:
      return tick(state);
    default:
      return state;
  }
};
