import React from 'react'
import io from 'socket.io-client'

export const CTX = React.createContext();


const initialState = {
    general: [
        {
            from: 'chanpion',
            msg: 'ashley is supa bomb',
        },
        {
            from: 'chanpion',
            msg: 'like wow',
            
        },
        {
            from: 'chanpion',
            msg: "i can't even",
        },
        {
            from: 'ash',
            msg: "i know rite",
        },
    ],
    teaParty: [
        {
            from: 'ash',
            msg: "omg he's so cute",
            group: 'chashmoney'
        }
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

export default function Store(props) {
    
    if (!socket) {
        socket = io(':3001')
    }
    
    const reducerHook = React.useReducer(reducer, initialState)
    
    return (
        <CTX.Provider value={reducerHook}>
            {props.children}
        </CTX.Provider>
    )
}