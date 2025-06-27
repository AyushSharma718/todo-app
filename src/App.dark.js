import React ,{useState,useEffect} from "react";
function App(){
    const [darkMode,setDarkMode]=useState(()=>{
     return localStorage.getItem("theme")==="dark"});

    useEffect(
        ()=>{
            localStorage.setItem("theme",darkMode?"dark":"light")
        },[darkMode]);

        const appStyle={
        background : darkMode?"#000":"#fff",
        color:darkMode ? "#fff" : "#000",
        height: "100vh",
        textAlign: "center",
        paddingTop: "50px",
        transition: "all 0.3s ease"
    };
    return(
        <div style={appStyle}>
            <h1>{darkMode?"🌙 Dark Mode":"☀️ Light Mode"}</h1>
            <button onClick={()=>setDarkMode(!darkMode)}>Toggle theme</button>

        </div>
    );
}
export default App;