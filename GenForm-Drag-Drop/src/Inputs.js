import React, { useEffect, useState } from 'react'

const Inputs = ({ id, name, value, modifyJson }) => {
  const [inputName, setInputName] = useState(name)
  const [inputValue, setInputValue] = useState(value)
  const [isDisabled, setIsDisabled] = useState(false)
  const validAttributes = [
    'accept',
    'alt',
    'autocapitalize',
    'autocomplete',
    'autofocus',
    'capture',
    'checked',
    'dirname',
    'disabled',
    'form',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'height',
    'label',
    'list',
    'max',
    'maxlength',
    'min',
    'minlength',
    'multiple',
    'options',
    'pattern',
    'placeholder',
    'popovertarget',
    'popovertargetaction',
    'readonly',
    'required',
    'size',
    'src',
    'step',
    'value',
    'width'
  ]
  useEffect(() => {
    checkReservedInput()
  }, [])
  useEffect(() => {
    const transferJson = '"' + inputName + '": "' + inputValue + '"'
    modifyJson(id, transferJson)
  }, [inputName, inputValue])
  const checkReservedInput = () => {
    if (inputName === 'type' || inputName === 'name') {
      setIsDisabled(true)
    }
  }

  const textOrSelect = () => {
    if (isDisabled) {
      return (
        <input
          type="text"
          defaultValue={inputName}
          onChange={(e) => setInputName(e.target.value.toLowerCase())}
          disabled={isDisabled}
          placeholder="Enter an attribute key"
          required
          style={{ width: '170px' }}
        ></input>
      )
    } else {
      return (
        <>
          <select
            defaultValue=""
            onChange={(e) => setInputName(e.target.value.toLowerCase())}
            required
            style={{
              width: '170px',
              paddingBlock: '1px',
              paddingInline: '2px',
              borderWidth: '2px',
              boxSizing: 'unset'
            }}
          >
            <option value="" disabled hidden>
              Choose an attribute key
            </option>
            {validAttributes.map((attribute) => {
              return <option key={attribute}>{attribute}</option>
            })}
          </select>
        </>
      )
    }
  }

  const textOrNumber = () => {
    if (
      [
        'min',
        'max',
        'minlength',
        'maxlength',
        'size',
        'step',
        'width',
        'height'
      ].includes(inputName)
    ) {
      return (
        <input
          type="number"
          defaultValue={inputValue}
          name={inputValue}
          style={{ width: '170px' }}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={
            inputName.length > 0 ? 'Enter ' + inputName + ' value' : ''
          }
          required
        />
      )
    } else {
      return (
        <input
          type="text"
          defaultValue={inputValue}
          name={inputValue}
          style={{ width: '170px' }}
          onChange={(e) => {
            setInputValue(
              inputName === 'type'
                ? e.target.value.toLowerCase()
                : e.target.value
            )
          }}
          disabled={inputName === 'type'}
          placeholder={
            inputName.length > 0 ? 'Enter ' + inputName + ' value' : ''
          }
          required
          pattern={(inputName === 'required' || inputName === 'disabled') ? '^(true|false)$' : '^[A-Za-z0-9 \-\_]+$'}
        />
      )
    }
  }

  return (
    <div>
      {textOrSelect()}
      {textOrNumber()}
    </div>
  )
}

export default Inputs
