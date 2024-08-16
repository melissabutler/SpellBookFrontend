import React, { useEffect, useState } from "react";

const useLocalStorage = (key, defaultValue) =>  {
    const [value, setValue] = useState(() => {
        let currentValue;

        try{
            currentValue = JSON.parse(
                localStorage.getItem(key) || JSON.stringify(defaultValue)
            );
        } catch(err) {
            currentValue = defaultValue;
        }
        return currentValue;
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}

export default useLocalStorage;