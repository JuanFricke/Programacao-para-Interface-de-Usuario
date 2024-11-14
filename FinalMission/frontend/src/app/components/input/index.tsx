import './style.css'
interface input {
    text: string,
    value: string,
    label: string,
    type: string
}

export default function Input({text,value,label, type}: input) {
    return (
        <div className='input'>
            <label htmlFor={label}>{text}</label>
            <input className="input-label" type={type} id={type} name={type} value={value} />
        </div>
    );
}
