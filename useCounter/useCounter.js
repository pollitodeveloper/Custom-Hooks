import { useState } from "react"

export const useCounter = ( initialValue = 10 ) => {

    const [counter, setCounter] = useState( initialValue )


    const increment = ( value = 1 ) => {
        setCounter( counter +  value)
    }


    const decrement = ( value = 1 ) => {
        //if( counter === 0 ) return;     //Si el conunter llega a 0 entonces no se decrementara mas
        setCounter( counter - value)
    }


    const reset = () => {
        setCounter( initialValue )
    }


    return {
        counter,
        increment,
        decrement,
        reset
    }

}