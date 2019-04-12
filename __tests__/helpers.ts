import { AnyAction, Reducer } from 'redux';

export enum TestTypes {
    ACTION = 'action'
}

export interface ITestState {
    readonly action: string;
}

export const initialState: ITestState = {
    action: ''
};

export const testReducer: Reducer<ITestState> = (
    state = initialState,
    action: AnyAction
) => {
    switch (action.type) {
        case TestTypes.ACTION:
            return {
                ...state,
                action: action.payload
            };

        default:
            return state;
    }
};
