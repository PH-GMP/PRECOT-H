import { useState } from "react";
export function useInput({defaultValue}){

    const [enteredValue, setEnterValue]= useState(defaultValue);

    function handleInputChange(event){
        setEnterValue(event.target.value);
        
    }

    return {
        value: enteredValue,
        handleInputChange
    }
}