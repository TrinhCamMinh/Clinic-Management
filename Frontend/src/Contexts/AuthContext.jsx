import { createContext, useReducer, useEffect } from 'react';
import {auth} from '../Configs/firebase'

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
                console.log(user);
                dispatch({ type: 'LOGIN', payload: user });
            }
        })
        
    }, []);

    return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
