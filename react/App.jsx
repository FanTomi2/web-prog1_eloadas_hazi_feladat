import React, { useState } from 'react';
import TodoList from './components/ToDoList';
import CounterGame from './components/CounterGame';
import JeszoGenerator from './components/JeszoGenerator';

function App() {
  const [view, setView] = useState('todo');

  return (
    <div>
      <nav>
        <button onClick={() => setView('todo')}>Teendők</button>
        <button onClick={() => setView('game')}>Számláló</button>
        <button onClick={() => setView('password')}>Jelszógenerátor</button>
      </nav>
      <main>
        {view === 'todo' && <TodoList />}
        {view === 'game' && <CounterGame />}
        {view === 'password' && <JeszoGenerator />}
      </main>
    </div>
  );
}

export default App;
