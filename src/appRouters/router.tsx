import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App";
import TodoList from "../components/todos/TodoList";
import TodoForm from "../components/forms/TodoForm";
import TodoDetail from "../components/todos/TodoDetail";
import { getTodo } from "../api";
import ErrorPage from "../Error";


async function todosLoader() {
    try {
        const response = await fetch('http://localhost:3001/todos');
        return await response.json();
        
    } catch (err) {
        console.log(err);
        return [];
    }
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />} loader={todosLoader}>
            <Route index={true} element={<TodoList />} />
            <Route path='add' element={<TodoForm />}/>
            <Route path=':key' element={<TodoDetail />} loader={getTodo} errorElement={<ErrorPage />}/>
        </Route>
    )
)

export default router;