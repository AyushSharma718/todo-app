import React ,{useState} from "react";

function App() {
  const [count,setCount]=useState(0);
  return (

    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Counter app</h1>
      <p>you clicked {count} times</p>
      <button onClick={()=>setCount(count+1)}>click me!</button>
    </div>
  );
}

export default App;
