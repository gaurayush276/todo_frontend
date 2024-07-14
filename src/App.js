import "./App.css";
import GetTask from "./getTask";
import { useState, useEffect } from "react";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegDotCircle } from "react-icons/fa";


function App() {
  const [todo, settodo] = useState([]);

  const [task, settask] = useState("");

  const addData = () => {
     
    axios
      .post("http://localhost:8000/post", { task: task })
      .then( r => {console.log(r)
        fetchData();
        settask("");  }
      ).catch( e => console.log(e)) 
    };

  const fetchData = () => {
    axios.get("http://localhost:8000/get").then((r) => settodo(r.data[0]));
  };

  const eleminate = (id)=>{
    axios.delete('http://localhost:8000/delete/' + id ).then( r => {console.log(r)
      fetchData(); }
    ).catch( e => console.log(e)) 
  }

  const checked = (id)=>{
    axios.put('http://localhost:8000/put/' + id ).then( r => {console.log(r)
      fetchData(); }
    ).catch( e => console.log(e)) 
  }
  const unchecked = (id)=>{
         axios.put('http://localhost:8000/put1/' + id ).then( r => {console.log(r)
          fetchData(); }
        ).catch( e => console.log(e)) 
         
  }

  useEffect(() => {
    fetchData();
    
  }, []);
  return (
    <div className="w-full h-screen  bg-teal-950   m-0 relative overflow-hidden">
      <header className="text-5xl flex  justify-center font-bold top-4 relative">
        TODO LIST
      </header>
      <div className="flex justify-center m-8 gap-6">
        <input
          type="text"
          placeholder="Task"
          className="w-2/4 rounded-full p-3  bg-teal-900"
          onChange={(e) => settask(e.target.value)}
          value={task}

        />
        <button
          className="rounded-3xl  border-2 border-slate-950 p-3"
          onClick={addData}
        >
          Add
        </button>
      </div>
      <div className=' w-full px-80 mt-5 overflow-scroll h-96 no-scrollbar'> 
      {
        todo.length === 0
          ? <div className='flex justify-center mt-5'>NO RECORD</div>
          : todo.map((item, index) => (
            <div className=' flex justify-between  border-2 border-gray-700 items-center rounded-full m-2 px-3 '> 
            {
              item.done == true ?  <TiTick  onClick={()=>unchecked(item._id) }/> :  <FaRegDotCircle onClick={()=>checked(item._id)}  />
            }
            <div key={index} className= { item.done === false ? ' flex justify-center text-xl  my-3' : ' flex justify-center text-xl  my-3 line-through' }>  {item.task}  </div>
            
            
            <RiDeleteBinLine   onClick={()=>eleminate(item._id) }/>
            </div>
            
            
            ))
      }
      </div>
    </div>
  );
}

export default App;
