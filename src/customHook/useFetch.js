import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
   const [data, setData] = useState(null)
  
    useEffect(() => {
        fetch(url).then((res) => res.json).then()
    })
    return (
    <div>useFetch</div>
  )
}

export default useFetch