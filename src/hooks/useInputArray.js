
import { useState } from "react";
export function useInputArray(initialValues) {
    // console.log('defaultValues', initialValues)
    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e, index, field) => {
        // console.log('handleInputChange', values);
        console.log('e', e.target.value);
        // console.log('index', index);
        // console.log('field', field);
        const newValues = [...values];

        newValues[index] = {
            ...newValues[index],
            [field]: e.target.value
        };
        setValues(newValues);
        
    }

    const handleAddRow = () => {
        const nextSno = values.length + 1;
        
        // Clone the last row's structure and reset the values
        const newRow = { ...values[values.length - 1] };

        // Set new sno and reset all other fields to empty
        newRow.sno = nextSno;
        Object.keys(newRow).forEach(key => {
            if (key !== 'sno') {
                newRow[key] = ""; // Reset all other fields to empty
            }
        });

        // Add the new row to values
        setValues([...values, newRow]);
    };

    const handleRemoveLastRow = () => {
        if (values.length > 1) {
            setValues(values.slice(0, -1));
        }
    };

    return {
        values,
        setValues,
        handleInputChange,
        handleAddRow,
        handleRemoveLastRow
    }

}