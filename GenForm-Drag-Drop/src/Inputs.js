import React, { useEffect, useState } from 'react'

const Inputs = ({ id, name, value, modifyJson }) => {
  const [inputName, setInputName] = useState(name);
  const [inputValue, setInputValue] = useState(value);
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    checkReservedInput();
  }, [])
  useEffect(() => {
    const transferJson = '"' + inputName + '": "' + inputValue + '"';
    modifyJson(id, transferJson);
  }, [inputName, inputValue])
  const checkReservedInput = () => {
    if (inputName === "type" || inputName === "name") {
      setIsDisabled(true);
    }
  }

  return (
    <div>
      <input type="text" defaultValue={inputName} onChange={e => setInputName(e.target.value.toLowerCase())} disabled={isDisabled} placeholder='Enter an attribute key'></input>
      <input type="text" defaultValue={inputValue} name={inputValue}
        onChange={e => setInputValue(inputName === 'type' ? e.target.value.toLowerCase() : e.target.value)} disabled={inputName === 'type'} placeholder={inputName.length > 0 ? 'Enter ' + inputName + ' value' : ''} />
    </div>
  )
}

export default Inputs;