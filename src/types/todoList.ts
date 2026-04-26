export type TodoListType = {
    title: string;
    desc?: string;
    image: string;
    done: boolean;
    createdAt: string;
    id: number;
}

export type ListProps = {
    todos?: TodoListType[] | [];
    setDone?: (key: number) => void;
    delTodos?: (key: number) => void;
    firstIncompleteTaskId?: number | undefined;
    firstIncompleteTaskRef?: React.RefObject<HTMLTableDataCellElement | null>;
}

export type FormProps = {
    addTodos?: (item: TodoListType) => void;
    sendRef?: React.RefObject<HTMLButtonElement | null>;
}

export type FormInputType = {
    name: string;
    val: string;
    type?: string;
    placeholder?: string;
    sendRef?: React.RefObject<HTMLButtonElement | null>;
    changeFunc: (e:string) => void;
}