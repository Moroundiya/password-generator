import { useState, useRef, useEffect } from 'react';
import './App.css';
import logo from './assets/images/logo.gif';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function App() {
  const [valueIn, setValueIn] = useState(10)
  const [pass, setPass] = useState('');
  const [changeCopy, setchangeCopy] = useState('Copy');
  const [lowerCheck, setlowerCheck] = useState(false);
  const [upperCheck, setupperCheck] = useState(false);
  const [numCheck, setnumCheck] = useState(false);
  const [symbCheck, setsymbCheck] = useState(false);
  const [strength, setstrength] = useState()
  const [colorId, setcolorId] = useState()
  // const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  // const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  // const numbers = '0123456789'
  // const symbols = '!@#$-%^&*_+()'
  let lower = useRef()
  let upper = useRef()
  let num = useRef()
  let symb = useRef()
  let valueBox = useRef()
  let inputElement = useRef()


  function copyText() {
    setchangeCopy('Copied')
    setTimeout(() => {
      setchangeCopy('Copy')
    }, 300);

  }


  function generate() {

    if (strength === 1) {
      setcolorId('poor')
    } else if (strength === 2) {
      setcolorId('fair')
    } else if (strength === 3) {
      setcolorId('good')
    } else if (strength === 4) {
      setcolorId('strong')
    }

    let randomNumber;
    let randomPicks;
    let randomPickslength;
    let randomPassword = '';
    let otherLetters;

    if (lowerCheck) randomPassword += 'abcdefghijklmnopqrstuvwxyz';
    if (upperCheck) randomPassword += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numCheck) randomPassword += '0123456789';
    if (symbCheck) randomPassword += '!@#$-%^&*_+()';

    randomNumber = Math.floor((Math.random() * randomPassword.length));
    randomPicks = randomPassword[randomNumber];
    randomPickslength = randomPicks.length;
    while (randomPickslength < valueIn) {
      otherLetters = randomPassword[Math.floor((Math.random() * randomPassword.length))];
      randomPicks += otherLetters;
      randomPickslength++;
    }
    setPass(randomPicks)

  }

  const listValue = [lowerCheck, upperCheck, numCheck, symbCheck];

  let countValue = listValue.filter(function (value) {
    return value === true;
  }).length

  useEffect(() => {
    setstrength(countValue)
    console.log(strength)
  }, [countValue])


  return (
    <div className='w-full h-full bg-[#319795] flex flex-col items-center justify-center p-3'>
      <div className='bg-white flex flex-col justify-center px-4 pt-3 pb-7 rounded-xl sm:px-10 sm:py-12'>
        <img src={logo} className='w-[130px] block mb-5 mx-auto' alt="" />
        <h1 className='text-[1.45rem] font-semibold text-center'>PASSWORD GENERATOR</h1>
        <p className='text-[#6e6767c0] text-sm text-center leading-tight mb-5'>Ensure online account safety by creating strong and secure passwords.</p>
        <div className='flex items-center w-full'>
          <input type="text" className='border border-[#333333ab] rounded outline-none py-1 px-2 me-2 w-9/12 font-semibold' value={pass} ref={valueBox} />
          <CopyToClipboard text={pass}>
            <div className='flex items-center w-3/12 bg-[#319795] px-2 justify-center rounded-md py-1 text-white cursor-pointer' onClick={copyText}>
              <iconify-icon icon="uiw:copy" className=''></iconify-icon>
              <span className='ms-1 text-sm'>{changeCopy}</span>
            </div>
          </CopyToClipboard>
        </div>
        <p className='text-red-600 text-sm mt-3 text-left'>
          <span className={colorId}>{colorId}</span>
          <meter className={`${colorId} h-[16px] block -mt-1`} min={0} max={4} value={strength} id='meter'></meter>
        </p>
        <button className='bg-[#319795] w-[200px] p-1 rounded text-white mx-auto mt-3 mb-2' onClick={generate}>Generate Password</button>
        <p className='mt-3 text-left'> Password Length:
          <span> {valueIn}</span>
        </p>
        <div className='mt-1 px-2'>
          <input type="range" min={0} max={30} steps={1} className='w-full' value={valueIn} ref={inputElement} onChange={(e) => { setValueIn(e.target.value) }} />
        </div>
        <div className='mt-4 grid grid-cols-2'>
          <div className='flex items-center'>
            <input type="checkbox" className='me-2 w-[20px] h-[20px] cursor-pointer' ref={upper} checked={upperCheck} onClick={(e) => e.target.checked ? setupperCheck(true) : setupperCheck(false)} />
            <label htmlFor="">Uppercase</label>
          </div>
          <div className='flex items-center'>
            <input type="checkbox" className='me-2 w-[20px] h-[20px] cursor-pointer' ref={lower} checked={lowerCheck} onClick={(e) => e.target.checked ? setlowerCheck(true) : setlowerCheck(false)} />
            <label htmlFor="">Lowercase</label>
          </div>
          <div className='flex items-center mt-4'>
            <input type="checkbox" className='me-2 w-[20px] h-[20px] cursor-pointer' ref={num} checked={numCheck} onClick={(e) => e.target.checked ? setnumCheck(true) : setnumCheck(false)} />
            <label htmlFor="">Numbers</label>
          </div>
          <div className='flex items-center mt-4'>
            <input type="checkbox" className='me-2 w-[20px] h-[20px] cursor-pointer' ref={symb} checked={symbCheck} onClick={(e) => e.target.checked ? setsymbCheck(true) : setsymbCheck(false)} />
            <label htmlFor="">Symbols</label>
          </div>
        </div>
      </div>
      <p className='mt-5 text-white'>Designed By Moroundiya 😎</p>
    </div >
  )
}

export default App
