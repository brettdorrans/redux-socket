import { Middleware } from 'redux';

function createSocketMiddleware(
    socket: SocketIOClient.Socket,
    eventName: string = 'action'
): Middleware {
    return ({ dispatch }) => {
        socket.on(eventName, dispatch);

        return next => action => {
            socket.emit(eventName, action);
            return next(action);
        };
    };
}

export default createSocketMiddleware;
