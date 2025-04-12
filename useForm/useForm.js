import { useState } from "react";


export const useForm = ( initialForm = {} ) => {

    const [formState, setFormState] = useState( initialForm );
    
        // Nose permite escribir dentro del input
        const onInputChange = ( { target } ) => {
            const { name, value } = target;
            setFormState({
                ...formState,
                [ name ]: value,
            })
    
            // console.log( {name, value});
            // console.log(event.target.value);
        }

        const onResetForm = () => {
            setFormState( initialForm )
        }

    return {
        ...formState,
        formState, 
        onInputChange,
        onResetForm
    }
}
