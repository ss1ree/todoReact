import { useState } from 'react';
import type { ListProps, TodoListType } from '../../types/todoList';
import FormInput from '../forms/FormInput';
import { Link, useOutletContext } from 'react-router-dom';

export default function TodoList() {
    const [search, setSearch] = useState('');
    const {todos, setDone, delTodos, firstIncompleteTaskId, firstIncompleteTaskRef} = useOutletContext<ListProps>();
    const filteredTodos: TodoListType[] | undefined  = search ? todos?.filter((i: TodoListType) => i.title.includes(search)) : todos;
    return (
        <section className='todolist'>
            <h1 className="todolist-header">Дела</h1>
            <div className='control control-header'> 
                <FormInput
                name='input mw400'
                val={search}
                changeFunc={setSearch}
                placeholder='Поиск...'
                />
                <button className='first-incomplete'
                onClick={() => {
                    firstIncompleteTaskRef?.current?.scrollIntoView({behavior: 'smooth'})
                }}
                >Показать первое невыполненное задание
                </button>
            </div>
            <table className="todolist">
                <tbody>
                    <tr className="todo-items">
                        {todos?.length === 0 ? (
                            <td className='addtodo-title'>Создайте новую задачу</td>
                        ) : filteredTodos?.length === 0 ? (
                            <td>Задач не найдено</td>
                        ) : (
                            filteredTodos?.map(p => (
                                <td
                                key={p.id}
                                className={`todo-item ${p.done ? 'done' : ''}`}
                                ref={p.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
                                >
                                    <Link to={`/${p.id}`}>
                                        <div className="todo-content">
                                            <h3 className="todo-title">{p.title}</h3>
                                        </div>
                                    </Link>
                                    <div className="todo-actions">
                                        <button
                                            className="btn btn-done"
                                            disabled={p.done}
                                            onClick={() => setDone?.(p.id)}
                                        >
                                            Выполнить
                                        </button>
                                        <button
                                            className="btn btn-delete"
                                            onClick={() => delTodos?.(p.id)}
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </td>
                            ))
                        )}
                    </tr>
                </tbody>
            </table>
        </section>
    )
}