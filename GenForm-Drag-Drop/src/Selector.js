import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Inputs from './Inputs';

const Selector = ({ elementTypeKey, typeName, addValue }) => {
  const [id, setId] = useState(0)
  const [inputs, setInputs] = useState([])
  const [jsons, setJsons] = useState([])
  useEffect(() => {
    handleAdd()
  }, [inputs])
  useEffect(() => {
    // Called once
    addTypeInput()
    addNameInput()
  }, [])
  function handleAdd() {
    setJsons(prevList => [...prevList, '']);
  }
  const addTypeInput = () => {
    setId((prevId) => {
      setInputs((prevInputs) => [...prevInputs, <Inputs key={elementTypeKey + prevId} id={prevId} name={"type"} value={typeName.toLowerCase()} modifyJson={modifyJson} />])
      return prevId + 1
    });
  }
  const addNameInput = () => {
    setId((prevId) => {
      setInputs((prevInputs) => [...prevInputs, <Inputs key={elementTypeKey + prevId} id={prevId} name={"name"} value={""} modifyJson={modifyJson} />])
      return prevId + 1
    });
  }
  const modifyJson = (id, json) => {
    setJsons((prevJsons) => {
      prevJsons[id] = json
      return prevJsons
    })

  }
  const addingElementToForm = () => {
    let json = '{' + jsons.toString() + '}'
    if (json[json.length - 2] === ',') {
      json = json.slice(0, -2) + json.slice(-1);
    }
    addValue(json)
  }
  const showInputs = () => {
    return inputs.map((input) => {
      return input
    })
  }
  const addInput = () => {
    setInputs((prevInputs) => [...prevInputs, <Inputs key={elementTypeKey + id} id={id} name={""} value={""} modifyJson={modifyJson} />])
    setId((prevId) => {
      return prevId + 1
    });
  }

  return (
    <div key={typeName}>
      <Popup trigger={<button className="button"> {typeName} </button>} modal>
        {close => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"> Choisissez les paramètres </div>
            <div className="content">
            </div>
            <div>
              {showInputs()}
            </div>
            <div className="actions">
              <button onClick={() => addInput()}> Ajouter un champs</button>
              <button className="button" onClick={() => {
                close()
                addingElementToForm()
              }}>
                Valider
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  )
}

export default Selector;