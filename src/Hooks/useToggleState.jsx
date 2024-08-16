import { useState } from "react";

function useToggle(initialVal = false) {
    //call useState, reserve a piece of state
    const [value, setValue] = useState(initialVal);

    const toggle = () => {
        setValue(oldValue => !oldValue);
    }

    //return state and the toggle function
    return [value, toggle]
}

export default useToggle;