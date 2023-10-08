import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const[length , setLength] = useState(15);
  const[charAllowed , setCharAllowed] = useState(false);
  const[numAllowed , setNumberAllowed] = useState(false);
  const[password , setPassword] = useState('');


  const passwordRef = useRef(null)

  const generatePassword = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numAllowed){
      str+="0123456789"
    }
    if(charAllowed){
      str+="!@#$%^&*()_+";
    }
    for(let x=1;x<=length;x++){
      const randomIndx = Math.round(Math.random()*str.length + 1);
      pass+=str.charAt(randomIndx);
    } 
    setPassword(pass)
  },[length, charAllowed, numAllowed]);

    useEffect(()=>{
      generatePassword();
    },[length,charAllowed,numAllowed])


  const copyPasswordToClipBoard = () =>{
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();  
  }
  return (
    <>
      <div className = 'w-full max-w-2xl mx-auto shadow-md rounded-md bg-black text-white p-8 my-12 border border-red-300 overflow-hidden'>
          <h1 className = "text-2xl text-center">Password Generator</h1>
          <div className = 'w-full flex shadow-md mt-5'>
            <input type="text" 
            value = {password}
            placeholder='Password'
            className='outline-none p-2 rounded-l-md w-full text-black'
            readOnly
            ref={passwordRef}
            />
            <button
            className='outline-none bg-blue-700 px-3 py-0.5 rounded-r-md'
            onClick={copyPasswordToClipBoard}>copy</button>
          </div>
          <div className='w-full flex gap-x-6'>
            <div className='gap-x-1 my-8 flex items-center'>
                <input type="range"
                value = {length}
                className='cursor-pointer'
                min={8}
                max={100}
                onChange={(e)=> setLength(e.target.value)}
                />
                <label htmlFor="length">Length : {length}</label>
            </div>
            <div className='gap-x-1 my-4 flex items-center'>
                <input type="checkbox"
                value={charAllowed}
                className='cursor-pointer w-4 h-4'
                onChange={(e)=>setCharAllowed((prev)=>!prev)}
                />
                <label htmlFor="charAllowed">Include Special Characters</label>
            </div>
            <div className='gap-x-1 my-4 flex items-center'>
                <input type="checkbox"
                value={numAllowed}
                className='cursor-pointer w-4 h-4'
                onChange={(e)=>setNumberAllowed((prev)=>!prev)}
                />
                <label htmlFor="setNumberAllowed">Include Numbers</label>
            </div>
          </div>
      </div>
    </>
  )
}

export default App


