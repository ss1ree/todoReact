import { createContext, type RefObject } from "react";
import type { TodoListType } from "../types/todoList";

type TodoContextType = {
    titleRef?: RefObject<HTMLInputElement | null>;
    todos?: TodoListType[];
    setTodos?: React.Dispatch<React.SetStateAction<TodoListType[]>>;
};

export const TodoContext = createContext<TodoContextType>({});