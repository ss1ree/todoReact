import type { FormProps, TodoListType } from '../../types/todoList';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import FormInput from './FormInput';
import { useOutletContext } from 'react-router-dom';

const TodoForm = () => {
    const {addTodos, sendRef} = useOutletContext<FormProps>();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const createdAt: Date = new Date();
        const item: TodoListType = {
            title: title,
            desc: desc,
            image: image,
            done: false,
            createdAt: createdAt.toLocaleString(),
            id: createdAt.getTime(),
        }
        addTodos?.(item);
        (e.target as HTMLFormElement).reset();
        handleFormClear();
    }

    const handleFormClear = (): void => {
        setTitle('');
        setDesc('');
        setImage('');
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const cFiles = e.target.files;
        if (cFiles && cFiles.length > 0) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                if (typeof fileReader.result === 'string') {
                    setImage(fileReader.result);
                }
            }
            fileReader.onerror = (err) => {
                console.log(`error: ${err}`)
            }
            fileReader.readAsDataURL(cFiles[0]);
        } else {
            setImage('');
        }
    }

    return (
        <section>
            <h1>Создание нового дела</h1>
            <form action="#" onSubmit={handleFormSubmit}>
                <div className="field">
                    <label className="label">Зaгoлoвoк</label> 
                    <FormInput
                    name='control'
                    val={title}
                    changeFunc={setTitle}
                    sendRef={sendRef}
                    />
                </div> 
                <div className="field"> 
                    <label className="label">Пpимeчaниe</label> 
                    <FormInput
                    name='control'
                    val={desc}
                    changeFunc={setDesc}
                    type='textarea'
                    />
                </div>
                <div className="field"> 
                    <div className="file">
                        <label className="file-label"> 
                            <input className="file-input" 
                                type="file" accept="image/*"
                                onChange={handleImageChange}
                            /> 
                            <span className="file-cta"> 
                                <span className="file-label"> 
                                    Графическая иллюстрация ... 
                                </span> 
                            </span> 
                        </label> 
                    </div> 
                </div> 
                <div className="field is-grouped is-grouped-right"> 
                    <div className="control"> 
                        <input type="reset" 
                            className="button is-warning is-light" 
                            value="Сброс" /> 
                    </div> 
                    <div className="control"> 
                        <button type="submit"
                        className="button is-primary"
                        ref={sendRef}
                        disabled={true}
                        >
                            Создать
                        </button>
                    </div> 
                </div> 
            </form>
        </section>
    )
}

export default TodoForm