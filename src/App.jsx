import React, { useState, useEffect } from 'react';
// import './App.jsx';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState('');

  useEffect(() => {
    // Load tasks from local storage on component mount
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever tasks state changes
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if(editId === id) {
      setEditId(null);
      setEditTask("");
    }
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEdit = (task) => {
    setEditId(task.id);
    setEditTask(task.text);
  };

  const handleUpdate = (id) => {
    if (editTask.trim() !== '') {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: editTask } : task
        )
      );
      setEditId(null);
      setEditTask('');
    }
  };

  return (
    <div className='container' style={{ maxWidth: '620px', margin: '120px auto', padding: '20px', border: 'px solid black', borderRadius: '10px',  boxShadow: 'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px' }}>
           <h1 className="text-center fw-bold mb-5" style={{ color: '#343a40' }}>📝 Todo List</h1>

      <div className='d-flex' >
        <input className='p-2 me-3'
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task..."
          style={{ width: '450px' }}
        />
        <button onClick={handleAddTask} className='btn btn-success text-white'  style={{width: '130px', padding: '8px 15px', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Add Task</button>
      </div>
      <div>
        <h2 style={{ color: 'red', margin: '20px auto', padding: '20px 0px' }}>Your Tasks:</h2>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}>
            {editId === task.id ? (
              <>
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  style={{ padding: '8px', marginRight: '10px', flexGrow: 1 }}
                />
                <button onClick={() => handleUpdate(task.id)} style={{ padding: '5px 10px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Update</button>
                <button onClick={() => {setEditId(null); setEditTask("")}} style={{padding: '5px 10px', backgroundColor: '#ccc', border:'none', borderRadius: '3px', cursor: 'pointer'}}>Cancel</button>

              </>
            ) : (
              <>
                <span
                  style={{ textDecoration: task.completed ? 'line-through' : 'none', flexGrow: 1, cursor:"pointer" }}
                  onClick={() => handleToggleComplete(task.id)}
                >
                  {task.text}
                </span>
                <div>
                  <button onClick={() => handleEdit(task)} style={{ padding: '5px 10px', backgroundColor: '#f0ad4e', color: 'white', border: 'none', borderRadius: '3px', marginRight: '5px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDeleteTask(task.id)} style={{ padding: '5px 10px', backgroundColor: '#d9534f', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;


// import React, { useState, useEffect } from 'react';

// function TodoList() {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');
//   const [editId, setEditId] = useState(null);
//   const [editTask, setEditTask] = useState('');

//   useEffect(() => {
//     const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
//     setTasks(storedTasks);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   const handleAddTask = () => {
//     if (newTask.trim() !== '') {
//       setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
//       setNewTask('');
//     }
//   };

//   const handleDeleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//     if (editId === id) {
//       setEditId(null);
//       setEditTask("");
//     }
//   };

//   const handleToggleComplete = (id) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === id ? { ...task, completed: !task.completed } : task
//       )
//     );
//   };

//   const handleEdit = (task) => {
//     setEditId(task.id);
//     setEditTask(task.text);
//   };

//   const handleUpdate = (id) => {
//     if (editTask.trim() !== '') {
//       setTasks(
//         tasks.map((task) =>
//           task.id === id ? { ...task, text: editTask } : task
//         )
//       );
//       setEditId(null);
//       setEditTask('');
//     }
//   };

//   return (
//     <div className="container mt-5 d-flex justify-content-center">
//       <div className="card shadow-lg w-100" style={{ maxWidth: '600px', borderRadius: '16px' }}>
//         <div className="card-body p-4">
//           <h2 className="text-center fw-bold mb-4" style={{ color: '#343a40' }}>📝 Todo List</h2>

//           {/* Add New Task */}
//           <div className="d-flex mb-4">
//             <input
//               type="text"
//               value={newTask}
//               onChange={(e) => setNewTask(e.target.value)}
//               placeholder="Enter a new task..."
//               className="form-control me-2 shadow-sm"
//             />
//             <button
//               onClick={handleAddTask}
//               className="btn btn-success"
//             >
//               Add Task
//             </button>
//           </div>

//           {/* Task List */}
//           <h5 className="text-muted mb-3">Your Tasks</h5>
//           <ul className="list-group">
//             {tasks.length === 0 && (
//               <li className="list-group-item text-center text-muted">No tasks added yet.</li>
//             )}
//             {tasks.map((task) => (
//               <li
//                 key={task.id}
//                 className="list-group-item d-flex align-items-center justify-content-between"
//               >
//                 {editId === task.id ? (
//                   <>
//                     <input
//                       type="text"
//                       value={editTask}
//                       onChange={(e) => setEditTask(e.target.value)}
//                       className="form-control me-2"
//                     />
//                     <div className="d-flex">
//                       <button
//                         onClick={() => handleUpdate(task.id)}
//                         className="btn btn-sm btn-primary me-2"
//                       >
//                         Update
//                       </button>
//                       <button
//                         onClick={() => { setEditId(null); setEditTask('') }}
//                         className="btn btn-sm btn-secondary"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <span
//                       onClick={() => handleToggleComplete(task.id)}
//                       className={`flex-grow-1 ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}
//                       style={{ cursor: 'pointer' }}
//                     >
//                       {task.text}
//                     </span>
//                     <div className="d-flex">
//                       <button
//                         onClick={() => handleEdit(task)}
//                         className="btn btn-sm btn-warning me-2 text-white"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteTask(task.id)}
//                         className="btn btn-sm btn-danger"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TodoList;
