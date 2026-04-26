import type { TodoListType } from "../types/todoList";

export const useFetch = (todos: TodoListType[], setTodos: React.Dispatch<React.SetStateAction<TodoListType[]>>) => {
    const addTodos = async (item: TodoListType): Promise<void> => {
        try {
            const response = await fetch('http://localhost:3001/todos', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(item)
            });
            const newItem = await response.json(); // Получаем элемент с присвоенным ID от сервера
            setTodos((prevState: TodoListType[]) => [...prevState, newItem]);
        } catch (err) {
            console.log(err);
        }
    };

    const delTodos = async (id: number): Promise<void> => {
        const newTodos = todos.filter(i => i.id !== id);
        setTodos(newTodos);
        try {
            await fetch(`http://localhost:3001/todos/${id}`, {
                method: 'DELETE'
            })
        } catch (err) {
            console.log(err);
        }
    };

    const setDone = async (id: number): Promise<void> => {
        const newTodos: TodoListType[] = [...todos];
        const deed: TodoListType | undefined = newTodos.find(item => item.id === id);
        if (deed) {
            deed.done = true;
        }
        setTodos(newTodos);
        try {
            await fetch(`http://localhost:3001/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({done: true})
            })
        } catch (err) {
            console.log(err);
        }
    };

    return { addTodos, delTodos, setDone };
};