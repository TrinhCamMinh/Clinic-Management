const useAuth = () => {
    const user = JSON.parse(sessionStorage.getItem('userInfo'));

    if (!user) return false;

    const isCorrectAccount = user.userName === 'minhct' && user.userPassword === 'admin';

    return isCorrectAccount;
};

export default useAuth;
