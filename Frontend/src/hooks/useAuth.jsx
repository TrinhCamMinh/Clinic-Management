const useAuth = () => {
    const user = JSON.parse(localStorage.getItem('userData'));

    //* Do not have user info mean they have not login yet so we do not alert any error
    if (!user) return { isAuthenticated: false, errorStatus: true, message: 'Vui lòng đăng nhập vào hệ thống' };

    //* User is signed in, see docs for a list of available properties
    //* https://firebase.google.com/docs/reference/js/auth.user
    return {
        isAuthenticated: true,
        errorStatus: false,
        message: null,
    };
};

export default useAuth;
