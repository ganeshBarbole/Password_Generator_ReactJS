import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
 const[length,setlength] = useState(8);
 const[numAllowed , setnumAllowed] = useState(false);
 const[charAllowed,setcharAllowed] = useState(false);
 const[password , setpassword] = useState("");

 const passwordGenerator = useCallback(()=>{
   let pass = "";
   let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
   if(numAllowed) str += "0123456789";
   if(charAllowed) str+= "@#%$&";

   for(let i = 1; i <= length ; i++){
    let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
   }
   setpassword(pass);
 },[length,numAllowed,charAllowed])
 
 useEffect(() => {
  passwordGenerator()
 },[length,numAllowed,charAllowed])

 const copy = useCallback(()=>{
  passref.current?.select();
    window.navigator.clipboard.writeText(password)
 },[password]) 

 const passref = useRef(null);

  return (
    <>
    <h1 id="heading">Password Generator</h1>
    <div id = "main" >
      
      <div id = "first">
        <input 
             type='text'
             value={password}
             placeholder='password'
             readOnly
             ref={passref}
             />
        <button 
          onClick={copy}
         >Copy</button>
      </div>

      <div id='second'>
        <div id="L">
        <input
           type="range"
           min={8}
           max={15}
           value={length}
           onChange={(e) => {setlength(e.target.value)}}
         /><label>Length : ({length}) </label>
         </div>

         <div id="N">
         <input
            type = "checkbox"
            defaultChecked = {numAllowed}
            onChange = {() => {setnumAllowed((prev) => !prev )}}
           />
           <label> Numbers </label>
           </div>

           <div id="C">
           <input
              type='checkbox'
              defaultChecked = {charAllowed}
              onChange={()=>{setcharAllowed((prev) => !prev )}}
           />
           <label> Characters </label>
           </div>
      </div>
    </div>
   
    </>
  )
}

export default App
