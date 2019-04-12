import test from 'ava';
import { applyMiddleware, createStore } from 'redux';
import client from 'socket.io-client';
import createSocketMiddleware from '../src';
import { testReducer, TestTypes } from './helpers';

const socket = client.connect(`http://localhost:8080`);
const nextHandler = createSocketMiddleware(socket);

test('must return a function to handle next', t => {
    t.is(typeof nextHandler, 'function');
    t.is(nextHandler.length, 1);
});

test('must successfully apply middleware', t => {
    const socketMiddleware = createSocketMiddleware(socket, 'server/');
    const createStoreWithMiddleware = applyMiddleware(socketMiddleware)(
        createStore
    );
    const store = createStoreWithMiddleware(testReducer);

    store.dispatch({
        payload: 'action',
        type: TestTypes.ACTION
    });

    t.is(store.getState().action, 'action');
});
