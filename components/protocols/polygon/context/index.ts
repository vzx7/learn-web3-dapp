import { createContext, Dispatch } from 'react';

export type State = {
    index: number
    network?: string
    account?: string
}

type Action =
    | { type: 'SetIndex', index: number }
    | { type: 'SetNetwork', network?: string }
    | { type: 'SetAccount', account?: string }

const initialState = {
    index: 0,
}

function appStateReducer(state: State, action: Action): State  {
    switch (action.type) {
        case 'SetIndex':
            return { ...state, index: action.index }
        case 'SetNetwork':
            return { ...state, network: action.network }    
        case 'SetAccount':
            return { ...state, network: action.account }       
        default:
            return state
    }
}

const PolygonContext = createContext<{
    state: State;
    dispatch: Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null
});

export { PolygonContext, initialState, appStateReducer }
