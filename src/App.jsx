import { useState } from 'react';
import './App.css'

let index = 0;

function App() {
  const [tasks, setTasks] = useState(["Task 1", "Task 2", "Task 3"]);

  // Allow drop
  const allowDrop = (e) => {
    e.preventDefault();
  };

  // Identify the <li> that you want to drag
  const dragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.currentTarget.id);
  };

  // Drop the <li> that you identified above in the <ul>
  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data);
    let dropTarget = e.target;
    while (dropTarget && dropTarget.tagName !== 'UL') {
      dropTarget = dropTarget.parentElement;
    }
    if (dropTarget && draggedElement) {
      dropTarget.appendChild(draggedElement);
    }
  }

// Alow the <li> to be contentEditable
  const activateContentEditing = (e) => {
    e.currentTarget.contentEditable = 'true';
    e.currentTarget.focus();
  }

// Update the state of the content from the <li> element and stop the content editing
  const stopContentEditing = (e) => {
    const index = e.currentTarget.getAttribute("data-task-index");
    if (index !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[parseInt(index)] = e.currentTarget.innerText;
      setTasks(updatedTasks);
    }
    e.currentTarget.contentEditable = 'false';
  }

// Generate a new <li> element
  const generateListItem = (boxClass) => {
    const newListItem = document.createElement('li');
    const uniqueId = 'new' + index++;
    newListItem.classList.add('newListItem');
    newListItem.id = uniqueId;
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
