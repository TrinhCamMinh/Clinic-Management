import { AuthContext } from '../Contexts/AuthContext';
import { useContext } from 'react';

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider');
    }
    return context;
};

export default useAuth;
