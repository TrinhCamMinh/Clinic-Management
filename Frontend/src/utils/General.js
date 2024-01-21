const getCurrentDate = (configs, locales = 'vi-vn') => {
    return new Date().toLocaleDateString(locales, { ...configs });
};

export { getCurrentDate };
