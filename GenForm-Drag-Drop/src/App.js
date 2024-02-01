import React, { useEffect, useState } from 'react'
import GenForm from '@genform/react'
// import { FaCopy } from "react-icons/fa";
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'
import Personalize from './components/Personalize'
import Selector from './Selector'
import './App.css'

import EndPresentation from './EndPresentation'

// const FormElement = ({ id, name, onClick }) => (
//   <div key={id} onClick={() => onClick(id)} style={{ cursor: 'pointer', margin: '5px' }}>
//     {name}
//   </div>
// );

function App() {
  const [formJSON, setFormJSON] = useState({
    elems: [],
    params: { action: '/', method: 'POST' }
  })
  const [selectedElement, setSelectedElement] = useState([])
  const [formElems, setFormElems] = useState([])
  const [formParams, setFormParams] = useState({})
  const availableElements = [
    { id: 0, typeName: 'Button' },
    { id: 1, typeName: 'Checkbox' },
    { id: 2, typeName: 'Color' },
    { id: 3, typeName: 'Date' },
    { id: 4, typeName: 'Datetime-local' },
    { id: 5, typeName: 'Email' },
    { id: 6, typeName: 'File' },
    { id: 7, typeName: 'Hidden' },
    { id: 8, typeName: 'Image' },
    { id: 9, typeName: 'Month' },
    { id: 10, typeName: 'Number' },
    { id: 11, typeName: 'Password' },
    { id: 12, typeName: 'Radio' },
    { id: 13, typeName: 'Range' },
    { id: 14, typeName: 'Reset' },
    { id: 15, typeName: 'Search' },
    { id: 16, typeName: 'Submit' },
    { id: 17, typeName: 'Tel' },
    { id: 18, typeName: 'Text' },
    { id: 19, typeName: 'Time' },
    { id: 20, typeName: 'Url' },
    { id: 21, typeName: 'Week' }
  ]
  const defaultParameters = [{ '"action"': '"/"' }, { '"method"': '"POST"' }]

  useEffect(() => {
    getAllElements()
    setupDefaultParameters()
  }, [])

  const addElementToForm = (json) => {
    setFormElems((prevElems) => [...prevElems, json])
  }

  const convertElementToString = (elems) => {
    let str = '"elems": ['
    str += elems.toString()
    str += ']'
    return str
  }

  const convertParamsToString = (params) => {
    let str = '"params": {'
    Object.keys(params).map((key) => (str += key + ': ' + params[key] + ', '))
    str = str.slice(0, -2) + str.slice(-1) + '}'
    return str
  }

  const clearJson = () => {
    setFormElems([])
    setFormParams([])
    setupDefaultParameters()
  }
  const getAllElements = () => {
    availableElements.map((element) =>
      setSelectedElement((prevElem) => [
        ...prevElem,
        <Selector
          elementTypeKey={element.id * 100}
          typeName={element.typeName}
          addValue={addElementToForm}
        />
      ])
    )
  }

  const setupDefaultParameters = () => {
    defaultParameters.map((param) =>
      setFormParams((prevParams) => ({ ...prevParams, ...param }))
    )
  }

  useEffect(() => {
    const json =
      '{' +
      convertElementToString(formElems) +
      ',' +
      convertParamsToString(formParams) +
      '}'
    setFormJSON(JSON.parse(json))
  }, [formElems, formParams])

  const createForm = () => {
    if (formJSON.elems.length > 0) {
      return <GenForm file={formJSON} />
    }
    return
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <a
          href="https://www.npmjs.com/search?q=%40genform"
          target="_blank"
          rel="noreferrer"
          style={{ height: '64px' }}
        >
          <img
            src="logo192.png"
            alt="Logo GenForm - Lien vers NPM"
            style={{ height: 'inherit' }}
          ></img>
        </a>
        <h1 className="title">GenView</h1>
        <a
          href="https://github.com/GenForm/GenForm"
          target="_blank"
          rel="noreferrer"
          style={{ height: '64px' }}
        >
          <img
            src="github.png"
            alt="Logo GitHub - Lien vers GitHub"
            style={{ height: 'inherit' }}
          ></img>
        </a>
      </div>
      <div className="App" style={{ display: 'flex' }}>
        <div style={{ flex: '1', border: '1px solid #ddd', padding: '10px' }}>
          <h2
            style={{
              marginTop: '0px',
              marginBottom: '10px',
              height: 'fit-content'
            }}
          >
            Form Elements
          </h2>
          <div className="elems-div">
            <div className="elems-grid">
              {selectedElement.map((element, index) => (
                <div key={index}>{element}</div>
              ))}
            </div>
          </div>
          <div
            style={{
              height: '1px',
              borderTop: '1px solid #ccc',
              marginTop: '20px',
              marginBottom: '0px'
            }}
          ></div>
          <Personalize
            formJSON={formJSON}
            style={{ innerWidth: 'fit-content' }}
          />
        </div>

        <div style={{ flex: '1', border: '1px solid #ddd', padding: '10px' }}>
          <h2 style={{ marginTop: '0px', marginBottom: '10px' }}>
            Form Preview
          </h2>
          {createForm()}
        </div>

        <div style={{ flex: '1', border: '1px solid #ddd', padding: '10px' }}>
          <h2 style={{ marginTop: '0px', marginBottom: '10px' }}>Final JSON</h2>
          <JsonView src={formJSON} theme="vscode" />
          {/* Copier le json <FaCopy style={{ cursor: 'pointer' }} onClick={() => {
            copyJson()
          }} />
          {afterCopied()} */}
          <button onClick={() => clearJson()} style={{ cursor: 'pointer' }}>
            Clean JSON
          </button>
          {/* <div>Personnaliser</div> */}
        </div>
      </div>
      <EndPresentation style={{ padding: '0px', margin: '0px' }} />
    </div>
  )
}

export default App
