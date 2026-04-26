import { useLoaderData } from "react-router-dom"

export default function TodoDetail() {
    const todo = useLoaderData();
    return (
        <section className="todo-detail-container">
            {todo.done && 
                <p className='has-text-success'>Выполнено</p>
            }
            <h1 className='title'>{todo.title}</h1>
            <p className='createdAt'>Создано: {todo.createdAt}</p>
            {todo.desc && <p className='desc'>Описание: {todo.desc}</p>}
            {todo.image && <img className='img' src={todo.image} alt='Иллюстрация'/>}
        </section>
    )
}