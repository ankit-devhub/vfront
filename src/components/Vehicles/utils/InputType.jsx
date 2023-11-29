import React from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function InputType({ label, placeholder, min, max, password, id, name, type, icon, onChange, value , required,setValue}) {

    const [inputType, setInputType] = React.useState(type);
    const inputRef = React.useRef(null)
    return (
        <span className='flex items-center w-full gap-3 p-3 px-5 rounded-lg cursor-text focus-within:bg-slate-200 group bg-slate-100' onClick={()=>{
            inputRef.current.focus();
        }}>
            {
                label && label
            }
            <input ref={inputRef} min={min} max={max} onChange={(e)=> setValue(e.target.value)} type={inputType} value={value} name={name} id={id} placeholder={placeholder} required={required} className='w-full bg-transparent outline-none ' />
            {
                password && <span className=''>
                    {
                        inputType === 'password' ?
                                <FaEye className='cursor-pointer text-slate-500' onClick={() => {
                                   setInputType('text')
                                }} />
                       
                            :
                            <FaEyeSlash className='cursor-pointer text-slate-500' onClick={() => {
                                setInputType('password')
                            }} />
                    }
                </span>
            }
        </span>
    )
}

export default InputType