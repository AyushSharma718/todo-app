import React, { useState, useEffect ,useContext } from "react";
import {motion} from "framer-motion";
import "./TodoStyle.css";
import {ThemeContext} from "./ThemeContext"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {DragDropContext,Droppable,Draggable} from "@hello-pangea/dnd";


function TodoApp() {

  const {darkMode} = useContext(ThemeContext);

  useEffect(()=>{
    document.body.style.backgroundColor=darkMode ? "#121212" : "#ffffff";
  },[darkMode]);

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
    toast.success("✅ Task Added!");
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
    toast.error("🗑️ Task Deleted");
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditText(todoList[index].text);
  };

  const saveEdit = (index) => {
    const updated = [...todoList];
    updated[index].text = editText;
    setTodoList(updated);
    toast.info("💾 Changes Saved");
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
  const totalTask = todoList.length;
  const completedTask = todoList.filter((task)=>task.done).length;
  const progress = totalTask ===0?0:(completedTask/totalTask)*100;

  const handleDragEnd=(result)=>{
    if(!result.destination) return;

    const items=Array.from(todoList);
    const [reorderedItem]=items.splice(result.source.index,1);
    items.splice(result.destination.index,0,reorderedItem);
    setTodoList(items);
  };

  return (

    <motion.div
    initial={{opacity:0,y:30}}
    animate={{opacity:1,y:0}}
    exit={{opacity:0,y:-30}}
    transition={{duration:0.5}}

    style={{color:darkMode?"#fff" : "#000", padding: "20px"}}
    >

    <div className="body">
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

       {/*progress bar */}
       <div style={{marginTop:"20px"}}>
        <p style={{frontWeight:"bold"}}>
          Progress = {completedTask}/{totalTask} Task Done
        </p>
        <div style={{
          height:"10px",
          width:"100%",
          background:"#ddd",
          overflow:"hidden",
          marginTop:"5px"
          }}>
            <div style={{
              height:"100%",
              width:`${progress}%`,
              background: "#4caf50",
              transition:"width 0.3s ease"
               }}/>
               </div>
               </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided)=>(

      

      <ul style={{ listStyle: "none", padding: 0, marginTop: "30px" }}
      {...provided.droppableProps}
      ref={provided.innerRef}
      >
        {filteredList.map((item, index) => (
          <Draggable key={index} draggableId={index.toString()} index={index}>
            {(provided)=>(
          <li key={index} style={{ marginBottom: "10px",background: darkMode ? "#1e1e1e" : "#f9f9f9", padding: "10px",borderRadius: "5px",...provided.draggableProps.style, }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          >
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
          )}
          </Draggable>
          
        ))}
        {provided.placeholder}
      </ul>
      )}
      </Droppable>
      </DragDropContext>
    </div>
    </div>

    <ToastContainer position="top-center" />

    </motion.div>

  );
}

export default TodoApp;

