import { useState } from 'react';
import './App.css'

function App() {
const [tasks, setTasks] = useState(["Task 1", "Task2", "Task3"]);
  const allowDrop = (e) => {
    e.preventDefault();
  };
  
  const dragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data);
    const target = e.target;
    if(target.tagName === 'UL') {
      target.appendChild(draggedElement);
    }
  };

  const activateContentEditing = (e) => {
    e.currentTarget.contentEditable = 'true';
    e.currentTarget.focus();
  }

  const stopContentEditing = (e, index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = e.currentTarget.innerText;
    setTasks(updatedTasks);
    e.currentTarget.contentEditable = 'false';
  }

  let index = 0;

  const generateListItem = (boxClass) => {
    const newListItem = document.createElement('li');
    newListItem.classList.add('newListItem');
    newListItem.id = 'new' + index++;
    newListItem.setAttribute('contentEditable', 'false');
    newListItem.setAttribute('draggable', 'true');
    newListItem.addEventListener('dragstart', dragStart);
    newListItem.addEventListener('dblclick', activateContentEditing);
    newListItem.addEventListener('blur', stopContentEditing);
    const box = document.querySelector(`.${boxClass}`);
    box.appendChild(newListItem);
  }

  return (
    <div className="App">
      <div className='container'>
   <div className= 'labels'>
         <label className='lbl1'>TO DO</label>
         <label className='lbl2'>IN PROGRESS</label>
         <label className='lbl3'>DONE</label>
   </div>
        <ul className='box1' onDragOver={allowDrop} onDrop={handleDrop}>
          <li id='one' className='first' contentEditable='false'  key ={index} draggable="true" onDragStart={dragStart} onDoubleClick={activateContentEditing} onBlur={(e) => stopContentEditing(e, index)}></li>
        </ul>
        <ul className='box2' onDragOver={allowDrop} onDrop={handleDrop}>
          <li id='two' className='second' contentEditable='false' key ={index} draggable="true" onDragStart={dragStart} onDoubleClick={activateContentEditing} onBlur={(e) => stopContentEditing(e, index)}></li>
        </ul>
        <ul className='box3' onDragOver={allowDrop} onDrop={handleDrop}>
          <li id='three' className='third' contentEditable='false' key ={index} draggable="true" onDragStart={dragStart} onDoubleClick={activateContentEditing} onBlur={(e) => stopContentEditing(e, index)}></li>
        </ul>
      </div>
      <div className='buttons'>
        <button className='btn1' onClick={() => generateListItem('box1')}><p className='text'>+</p></button>
        <button className='btn2' onClick={() => generateListItem('box2')}><p className='text'>+</p></button>
        <button className='btn3' onClick={() => generateListItem('box3')}><p className='text'>+</p></button>
      </div>
    </div>
  );
}

export default App;
