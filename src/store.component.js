import React from 'react'

const CTX = React.createContext();

/*
    msg {
        from: 'user',
        msg: 'hi',
        group: 'group project name'    
    }
    
    state {
        group1: [
            {msg} {msg} {msg}
        ]
        group2: [
            
        ]
    }

*/
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

export default function Store(props) {
    
    const reducerHook = React.useReducer(reducer, initialState)
    
    return (
        <CTX.Provider value={reducerHook}>
            {props.children}
        </CTX.Provider>
    )
}