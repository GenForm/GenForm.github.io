import React, { useEffect, useState } from 'react'
import GenForm from '@genform/react'
// import { FaCopy } from "react-icons/fa";
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'
// import Personalize from './components/Personnalize';
import Selector from './Selector'
import './App.css';

// const FormElement = ({ id, name, onClick }) => (
//   <div key={id} onClick={() => onClick(id)} style={{ cursor: 'pointer', margin: '5px' }}>
//     {name}
//   </div>
// );

function App() {
  const [formJSON, setFormJSON] = useState({ elems: [], params: { action: "/", method: "POST" } });
  const [selectedElement, setSelectedElement] = useState([]);
  const [formElems, setFormElems] = useState([]);
  const [formParams, setFormParams] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const availableElements = [
    { id: 1, typeName: 'Text' },
    { id: 2, typeName: 'Range' },
    { id: 3, typeName: 'Checkbox' },
    { id: 4, typeName: 'Radio' },
    { id: 6, typeName: 'Textarea' },
    { id: 7, typeName: 'Custom' }
  ];
  const defaultParameters = [
    { '"action"': '"/"' },
    { '"method"': '"POST"' }
  ];

  useEffect(() => {
    getAllElements();
    setupDefaultParameters();
  }, []);

  const addElementToForm = (json) => {
    setFormElems((prevElems) => [...prevElems, json])
  };

  const convertElementToString = (elems) => {
    let str = '"elems": [';
    str += elems.toString();
    str += ']';
    return str;
  }

  const convertParamsToString = (params) => {
    let str = '"params": {';
    Object.keys(params).map((key) => (
      str += key + ": " + params[key] + ", "
    ))
    str = str.slice(0, -2) + str.slice(-1) + '}';
    return str;
  }

  const assembleJson = () => {
    const json = '{' + convertElementToString(formElems) + ',' + convertParamsToString(formParams) + '}'
    return JSON.parse(json);
  }

  const copyJson = () => {
    navigator.clipboard.writeText(assembleJson());
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000)
  }

  const afterCopied = () => {
    if (isCopied) {
      return "Copié!"
    } else {
      return ""
    }
  }
  const clearJson = () => {
    setFormElems([])
    setFormParams([])
    setupDefaultParameters()
  }
  const getAllElements = () => {
    availableElements.map((element) => (
      setSelectedElement((prevElem) => [...prevElem, <Selector elementTypeKey={element.id * 100} typeName={element.typeName} addValue={addElementToForm} />])
    ))
  }

  const setupDefaultParameters = () => {
    defaultParameters.map((param) => (
      setFormParams((prevParams) => ({ ...prevParams, ...param }))
    ))
  }

  useEffect(() => {
    const json = '{' + convertElementToString(formElems) + ',' + convertParamsToString(formParams) + '}'
    setFormJSON(JSON.parse(json));
  }, [formElems, formParams]);

  const createForm = () => {
    if (formJSON.elems.length > 0) {
      return (
        <GenForm file={formJSON} />
      )
    }
    return;
  }

  return (
    <div>
      <h1 className="title">GenForm</h1>
      <div className="App" style={{ display: 'flex' }}>
        <div style={{ flex: '1', border: '1px solid #ddd', padding: '10px' }}>
          <h2>Form Elements</h2>
          {selectedElement.map((element, index) => (
            <div key={index}>
              {element}
            </div>
          ))}
        </div>

        <div style={{ flex: '1', border: '1px solid #ddd', padding: '10px' }}>
          <h2>Aperçu formulaire</h2>
          {createForm()}
        </div>

        <div style={{ flex: '1', border: '1px solid #ddd', padding: '10px' }}>
          <h2>Json Souhaité :</h2>
          <JsonView src={formJSON} theme='vscode' />
          {/* Copier le json <FaCopy style={{ cursor: 'pointer' }} onClick={() => {
            copyJson()
          }} />
          {afterCopied()} */}
          <div onClick={() => clearJson()} style={{ cursor: 'pointer' }}>Vider le Json</div>
          {/* <div>Personnaliser</div> */}
        </div>
      </div>
      {/* <Personalize formElements={formElems} /> */}
    </div>
  );
}

export default App;
