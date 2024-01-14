const useAuth = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    //* Do not have user info mean they have not login yet so we do not alert any error
    if (!user) return { isAuthenticated: false, errorStatus: false, message: null };

    const isCorrectAccount =
        (user.userName === 'minhct' || user.userName === 'khoald') && user.userPassword === 'admin';

    //* Incase error status is false, message will never be alerted
    return {
        isAuthenticated: isCorrectAccount,
        errorStatus: !isCorrectAccount,
        message: 'Tài khoản chưa chính xác. Vui lòng đăng nhập lại!',
    };
};

export default useAuth;
