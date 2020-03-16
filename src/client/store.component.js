import React from 'react'
import io from 'socket.io-client'

export const CTX = React.createContext();


const initialState = {
    group1: [
        
    ],
    group2: [
        
    ]
}

function reducer(state, action) {
    const {from, msg, group} = action.payload;
    
    switch(action.type) {
        case "RECEIVE_MESSAGE":
            return {
                ...state,
                [group]: [
                    ...state[group],
                    {from, msg}
                ]
            }
        default:
            return state
    }
}
// initilizing socket, don't want to re-render every time Store reloads
let socket;

function sendChatAction(value) {
    socket.emit('chat message', value)
    console.log(value)
}

export default function Store(props) {
    
    const [allChats, dispatch] = React.useReducer(reducer, initialState)

    
    if (!socket) {
        socket = io(':3500')
        socket.on('chat message', msg => {
            dispatch({type: 'RECEIVE_MESSAGE', payload: msg})
        })
    }
    
    const user = 'user' + Math.random(100).toFixed(2)
    
    
    return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
}