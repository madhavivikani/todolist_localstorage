import logo from './logo.svg';
import './App.css';
import { useState , useEffect } from 'react';

function App() {

  let [name, setname] = useState("");
  let [result, setresult] = useState([]);
  let [edit, setedit] = useState();
  let [reset, setreset] = useState([]);
  let [search, setsearch] = useState("");

 
  useEffect(()=>{
    const savedData = localStorage.getItem('result');
    if(savedData){
      setreset(JSON.parse(savedData));
      setresult(JSON.parse(savedData));
    }
  },[]);

  const addbtn = () => {
    if (edit !== undefined) {
      const updatedResult = [...result];
      updatedResult[edit].name1 = name;
      setresult(updatedResult);
      setedit(undefined);
      setname("");
      setreset(updatedResult);
      localStorage.setItem('result', JSON.stringify(updatedResult)); 
    } else {
      const newTask=[...result, { name1: name, completed: false }]
      setresult(newTask);
      // setreset(newTask);
      localStorage.setItem('result', JSON.stringify(newTask));
    }
    // setresult([...result, name]);
    setname("");
  }
  const btndel = (index) => {
    const del = result.filter((item, i) => i !== index);
    setresult(del);
    localStorage.setItem('result', JSON.stringify(del)); 
  }
  const btnedit = (index) => {
    setname(result[index].name1)
    setedit(index);
  }

  const checkbtn = (index) => {
    const demo = [...result];
    demo[index].completed = !demo[index].completed;
    setresult(demo);
    localStorage.setItem('result', JSON.stringify(demo));
    // setreset(demo);

  }

  const Clickbtn = () => {
    // let info = [...reset];
    var data = reset.filter((item, index) => {
      return item.name1 === search;
    })
    setresult(data);
    // setreset(data);
    setsearch("");
  };

  const allbtn = () => {
    setresult([...reset]);
    // setreset([...reset]);
  }

  const combtn = () => {
    let completebtn = reset.filter((item,index)=>{
      return item.completed == true;
    })
    setresult(completebtn);
  }

  const uncombtn = () => {
    let completebtn = reset.filter((item,index)=>{
      return item.completed == false;
    })
    setresult(completebtn);
  }


  return (
    <div>
      <p className='title'>TO-Do-LIST...!!</p>
      <div className="App">
        <input type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder='Enter Task' className='name'></input>
        <input type="button" value="ADD" onClick={addbtn} className='btn'></input>
        <div className='all'>
          <ul className='one'>
            <input type='text' className='search name' value={search} placeholder='Search' onChange={(e) => setsearch(e.target.value)} ></input>
            <input type='button' className='btn btn1' value={"Click"} onClick={Clickbtn}></input>
            <input type='button' className='btn btn1' value={"Completed"} onClick={combtn}></input>
            <input type='button' className='btn btn1' value={"Uncompleted"} onClick={uncombtn}></input>
            <input type='button' className='btn btn1' value={"All"} onClick={() => allbtn()}></input>

            {
              result.map((item, index) => (
                <li key={index} className='one_1'>
                  <input type='checkbox' onClick={() => checkbtn(index)} checked={item.completed} className='check'></input>
                  <span className='name2' style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.name1}</span>
                  <input type='button' value={"Delete"} onClick={() => btndel(index)} className='del'>
                  </input><input type='button' value={"Edit"} onClick={() => btnedit(index)} className='edit'></input></li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
    

  );
}


export default App;


