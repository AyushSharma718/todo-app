import React, { useState, useEffect } from "react";
import "./TodoStyle.css";

function App() {
  const [task, setTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter,setFilter]=useState("all");

  const [todoList, setTodoList] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [editIndex, setEditIndex] = useState(null); // index of task being edited
  const [editText, setEditText] = useState(""); // text being edited

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const addTask = () => {
    if (task.trim() === "") 
      return alert("enter a task");
    const newTask = { text: task, done: false };
    setTodoList([...todoList, newTask]);
    setTask("");
  };

  const toggleTask = (index) => {
    const updated = [...todoList];
    updated[index].done = !updated[index].done;
    setTodoList(updated);
  };

  const deleteTask = (index) => {
    const newList = todoList.filter((_, i) => i !== index);
    setTodoList(newList);
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditText(todoList[index].text);
  };

  const saveEdit = (index) => {
    const updated = [...todoList];
    updated[index].text = editText;
    setTodoList(updated);
    setEditIndex(null);
    setEditText("");
  };

  const filteredList = todoList
  .filter((item) =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .filter(
    (item)=>{
      if(filter==="done") return item.done;
      if(filter==="notDone") return !item.done;
      return true;
    }
  );

  return (
    <div className= "app">
      <h1 style={{fontsize:"2.5rem",marginBottom:"20px",color: "#003f5c"}}>✏️Todo List App</h1>
      <div className="input-group">
      <input
        type="text"
        placeholder="Add a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        
      />
      <button onClick={addTask}>
        Add
      </button>
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Search tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          
        />
      </div>
      <div className="filter-group">
        <button onClick={()=>setFilter("all")}>🟡 All</button>
        <button onClick={()=>setFilter("done")} style={{marginLeft:"10px"}}>✅ Done</button>
        <button onClick={()=>setFilter("notDone")} style={{marginLeft:"10px"}}>🔲 Not Done</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "30px" }}>
        {filteredList.map((item, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => toggleTask(index)}
            />

            {editIndex === index ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ marginLeft: "10px", padding: "4px" }}
                />
                <button onClick={() => saveEdit(index)} style={{ marginLeft: "8px" }}>
                  ✅ Save
                </button>
              </>
            ) : (
              <>
                <span
                  style={{
                    marginLeft: "10px",
                    textDecoration: item.done ? "line-through" : "none",
                    color: item.done ? "#888" : "#000"
                  }}
                >
                  {item.text}
                </span>
                <button onClick={() => startEditing(index)} style={{ marginLeft: "10px" }}>
                  ✏️ Edit
                </button>
              </>
            )}

            <button onClick={() => deleteTask(index)} style={{ marginLeft: "10px" }}>
              ❌ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
