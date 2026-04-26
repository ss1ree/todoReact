import { type LoaderFunctionArgs } from "react-router-dom";

export async function getTodo({params}: LoaderFunctionArgs){
    const response = await fetch(`http://localhost:3001/todos/${params.key}`)
    if (!response.ok) {
        throw new Error();
    }
    return await response.json();    
}