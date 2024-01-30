import {useEffect, useState} from 'react';

function getSavedValue(key: string, initialValue: any) {
    let rv = localStorage.getItem(key);
    if(rv) {
        let savedValue = JSON.parse(rv);
        return savedValue;
    }

    if (initialValue instanceof Function) {
        return initialValue();
    }

    return initialValue;
}

export default function useLocalStorage(key: string, initialValue: any) {
    const [value, setValue] = useState(()=>{
        return getSavedValue(key, initialValue)
    });

    useEffect(()=>{
        if(value) {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }, [value]);

    return [value, setValue];
}