import React, { useState, useEffect, useMemo } from "react";
import "regenerator-runtime"


async function fetchData(userid) {

  let res = await  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userid}`)

  if (!res.ok) {
    throw new Error("failed to fetch data")
  }

  return res.json()

}

const App = () => {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [rawData, setRawData] = useState(null);


  useEffect(() => {

    const fetchData2 = async () => {

      if (userId == "") {
        return
      }

      setLoading(true)
      try {
        let dt = await fetchData(userId)
        setRawData(dt)

      } catch (error) {
        console.log(error.message);

      }
      finally {
        setLoading(false)
      }


    }

    fetchData2()

  }, [userId])


  let memo = useMemo(() => {

    if (rawData !== null) {
      return [...rawData]
    }

  }, [rawData])


  return (
    <>
      <div>
        <h2>fetch data from api</h2>
        <input type="number" onChange={(e) => {
          setUserId(e.target.value)
        }} />

        {loading && <p>loading----</p>}
        {!loading && memo?.length > 0 && (
          <ul>
            {memo.map(v => {

              return <li key={v.id}><strong>{v.title}</strong>
              <p>{v.body}</p>

              </li>
            })}
          </ul>
        )




        }

{!loading && userId && memo?.length==0&& <p>no data found</p>}
      </div>

    </>
  )

};

export default App;
