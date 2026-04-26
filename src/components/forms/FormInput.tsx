import type { FormInputType } from "../../types/todoList";
import { TodoContext } from "../../context/TodoContext";
import { useContext } from "react";

export default function FormInput(props: FormInputType) {
    const {name, val, changeFunc, type='input', placeholder, sendRef} = props;
    const {titleRef} = useContext(TodoContext);
    return (
        <div className={name}> 
            {
            type === 'input' &&
            <input className={type}
             value={val}
             onChange={e => {
                 changeFunc(e.target.value);
                 if (titleRef) {
                     const reg: RegExp = /^[\wА-ЯЁ]+/i;
                     if (reg.test(e.target.value)) {
                         sendRef?.current?.removeAttribute('disabled');
                     } else {
                         sendRef?.current?.setAttribute('disabled', 'true');
                     }

                 }

             }}
             ref={titleRef ?? undefined}
             placeholder={placeholder ?? ''}
            />
            }
            {type === 'textarea' && 
            <textarea className={type}
             value={val}
             onChange={e => changeFunc(e.target.value)}
            />
            }
        </div> 
    )
}