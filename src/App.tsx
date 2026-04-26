import './App.css';
import type { TodoListType } from './types/todoList';
import { useState, useRef } from 'react';
import { TodoContext } from './context/TodoContext';
import { useFetch } from './hooks/useFetch';
import { NavLink, Outlet } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';

const App = () => {
  const data: TodoListType[] = useLoaderData();
  const [todos, setTodos] = useState<TodoListType[]>(data);

  const titleRef = useRef<HTMLInputElement>(null);
  const sendRef = useRef<HTMLButtonElement>(null);
  const firstIncompleteTaskRef: React.RefObject<HTMLTableDataCellElement | null> = useRef<HTMLTableDataCellElement>(null);
  const firstIncompleteTaskId: number | undefined = todos.find(({done}: TodoListType) => !done)?.id;

  const {addTodos, delTodos, setDone} = useFetch(todos, setTodos);

  return (
    <TodoContext.Provider
    value={{
      titleRef,
    }}
    >
      <div className="container">
        <nav className="navbar">
          <div className="navbar-brand">
            <NavLink to="/" className={({isActive}) => 'navbar-item ' + (isActive ? 'active' : '')}>
              Todos 
            </NavLink>
            <NavLink to="add" className={({isActive}) => 'navbar-item ' + (isActive ? 'active' : '')}>
              Add 
            </NavLink> 
          </div> 
        </nav>
        <main className="content px-6 py-6">
          <Outlet context={{todos, sendRef, firstIncompleteTaskId, firstIncompleteTaskRef, addTodos, delTodos, setDone}}/>
        </main> 
      </div>
     </TodoContext.Provider>
  )
}

export default App