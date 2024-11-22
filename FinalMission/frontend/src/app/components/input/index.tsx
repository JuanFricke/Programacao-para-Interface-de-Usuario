import { ChangeEvent } from 'react';
import './style.css'
interface input {
    text: string,
    value: string,
    label: string,
    type: string,
    setValue: (value: string) => void
    required?: boolean
}

export default function Input({ text, value, label, type, setValue, required = false }: input) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div className='input'>
            <label htmlFor={label}>{text}</label>
            <input className="input-label" type={type} id={type} name={type} value={value} onChange={handleChange} required={required} />
        </div>
    );
}
