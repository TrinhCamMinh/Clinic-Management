import { createContext, useReducer, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Configs/firebase';
export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log('login reducer', action.payload);
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
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('user has login', user);
                dispatch({ type: 'LOGIN', payload: user });
            } else {
                console.log('user has logout');
                dispatch({ type: 'LOGOUT' });
            }
        });
    }, []);

    return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
