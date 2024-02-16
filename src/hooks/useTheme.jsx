import { useState, useEffect } from 'react';

const useTheme = () => {
    const [themeValue, setThemeValue] = useState('light');

    useEffect(() => {
        function storageEventHandler(event) {
            const { themeValue } = event.detail;
            setThemeValue(themeValue);
        }

        //* Hook up the event handler
        //* This event fired when value in local storage changed
        //! Note that this event only work for local storage
        window.addEventListener('themeChange', storageEventHandler);

        //* Cleanup function
        return () => {
            //* Remove the handler when the component unmounts
            window.removeEventListener('themeChange', storageEventHandler);
        };
    }, []);

    useEffect(() => {
        const themeData = JSON.parse(localStorage.getItem('themeInfo'));
        if(!themeData) return ;
        setThemeValue(themeData.themeValue)
    }, [themeValue])

    return themeValue;
};

export default useTheme;
