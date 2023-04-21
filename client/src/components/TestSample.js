import React, { useEffect, useState } from "react";

const TestSample = () => {
    const [count, setCount] = useState(0)

    const handleCount = () => setCount(count + 1)

    let timer;

    //make a timer
    useEffect(() => {
        timer = setTimeout(() => { setCount(count + 1) }, 1000)
        // return clearTimeout(timer)
    }, [count])

    return (
        <div>
            <p>{count}</p>
            <button onClick={handleCount}>Raise count</button>
        </div>
    )
}

export default TestSample
