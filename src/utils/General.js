import { customAlphabet } from 'nanoid';
import { nolookalikes } from 'nanoid-dictionary';

const getCurrentDate = (configs, locales = 'vi-vn') => {
    return new Date().toLocaleDateString(locales, { ...configs });
};

const CURRENCY_FORMATTER = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
const formatCurrency = (number) => {
    return CURRENCY_FORMATTER.format(number);
};

const generateRandomID = (size = 10) => {
    //* Numbers and english alphabet without lookalikes: 1, l, I, 0, O, o, u, v, 5, S, s, 2, Z.
    //* Complete set: 346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz
    const randomVocabSet = nolookalikes;

    //* Params: alphabet: string, defaultSize?: number
    const nanoid = customAlphabet(randomVocabSet, 10);
    return nanoid(size);
};

export { getCurrentDate, formatCurrency, generateRandomID };
