import React, { useState } from 'react';

function TodoList() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Teendők</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Új feladat"
        className="border border-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={addTask}>Hozzáadás</button>
      <table className="table-auto border-collapse border border-black-400 w-full text-center">
        <thead>
          <tr className="hover:bg-gray-100">
            <th className="border border-gray-400 px-4 py-2">Teendők</th>
            <th className="border border-gray-400 px-4 py-2">törlés</th>
          </tr>
        </thead>
        <tbody>
          {
            tasks.map((item, i) => (
              <tr key={i} className="hover:bg-gray-100">
                <td className="border border-gray-400 px-4 py-2">{item}</td>
                <td className="border border-gray-400 px-4 py-2"><button onClick={() => removeTask(i)} className="text-red-500 hover:text-red-700">❌</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;