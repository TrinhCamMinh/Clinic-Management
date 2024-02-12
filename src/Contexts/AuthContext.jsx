import { createContext, useReducer, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../Configs/firebase';

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
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            //* Login Case
            if (user) {
                console.info(user);
                dispatch({ type: 'LOGIN', payload: user });
                return;
            }

            //* Logout Case
            //* Prevent user from accessing protected page except login page
            if (currentPath !== '/login') {
                return navigate('/login');
            }
        });
    }, []);

    return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
