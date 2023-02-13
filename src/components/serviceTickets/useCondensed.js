import { useEffect, useState } from "react"

export const useCondensed = ({ limit, field }) => {
    //initializes original state variable as an empty array and setState function 
    const [original, setOriginal] = useState([])
    //initializes condensed state variable as an empty array and setCondensed function 
    const [condensed, setCondensed] = useState([])
    //runs when original state variable is changed
    useEffect(() => {
        //assigns withEllipses to a modified copy of the original array that...
        const withEllipses = original.map(t => {
            //assigns the copy variable to a copy of the elements at index t
            const copy = structuredClone(t)
            //assigns the value of false to the condensed key
            copy.condensed = false
            //assigns the value of false to the canCondense key
            copy.canCondense = false
            //assigns the value of the provided string to the originalValue key
            copy.originalValue = copy[field]
            //assigns the value of the originalValue string, but limits its length based on the integer passed into limit
            copy.condensedValue = `${copy[field].slice(0, limit)}`
            //confirming the length of the field of an element in the original array is greater than the limit integer
            if (t[field].length > limit) {
                //creates a copy of element t to a string with a length of limit
                copy[field] = `${t[field].slice(0, limit)}`
                //reassigns the value of canCondense and condensed to true.
                copy.canCondense = true
                copy.condensed = true
            }
            //returns the copy object, which is a modified version of the t element provided and stores it in the withEllipses array.
            return copy
        })
        setCondensed(withEllipses)
    }, [original])

    const toggleCondensed = (ticket) => {
        const copy = condensed.map(t => {
            if (t.id === ticket.id) {
                t[field] = t.condensed ? t.originalValue : t.condensedValue
                t.condensed = !t.condensed
            }
            else if (t.canCondense) {
                t.condensed = true
                t[field] = t.condensedValue
            }
            return t
        })
        setCondensed(copy)
    }

    return {
        toggle: toggleCondensed,
        setOriginal,
        condensed
    }
}
