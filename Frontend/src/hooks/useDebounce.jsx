import { useEffect, useCallback } from 'react';

export default function useDebounceEffect(effect, deps, delay = 250) {
    const callback = useCallback(effect, deps);

    useEffect(() => {
        const timeout = setTimeout(callback, delay);
        return () => clearTimeout(timeout);
    }, [callback, delay]);
}
