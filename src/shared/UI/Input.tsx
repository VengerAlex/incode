import React, {FC} from 'react';

interface IInput {
    title: string,
    control: any,
    name: string,
}

const Input: FC<IInput> = ({title, control, name}) => {
    return (
        <div className="input-box">
            <label htmlFor={name}>{title}</label>
            <input
                id={name}
                {...control.register(name, {required: true, minLength: 6})}
                type="text"
            />
        </div>
    );
};

export default Input;