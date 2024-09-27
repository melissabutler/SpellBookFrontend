import { useState } from "react";

//Helper function for establishing a useState variable that only toggles between two different values.

function useToggle(initialVal = false) {
    const [value, setValue] = useState(initialVal);

    const toggle = () => {
        setValue(oldValue => !oldValue);
    }

    return [value, toggle];
}

export default useToggle;