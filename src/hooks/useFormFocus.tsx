import {useEffect} from 'react';

const UseFormFocus = (cb: () => void) => {
    useEffect(() => {
        cb()
    }, []);
};

export default UseFormFocus;