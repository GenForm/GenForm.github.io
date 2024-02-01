import React, { useEffect, useState, useCallback } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Inputs from './Inputs';
import './Selector.css';

const Selector = ({ elementTypeKey, typeName, addValue }) => {
  const [id, setId] = useState(0)
  const [inputs, setInputs] = useState([])
  const [jsons, setJsons] = useState([])
  const [actif, setActif] = useState(false)
  useEffect(() => {
    handleAdd()
  }, [inputs])
  useEffect(() => {
    // Called once
    addTypeInput()
    addNameInput()
  }, [])

  const handleKeyPress = useCallback((event) => {
    if (event.ctrlKey && event.key === "Enter" && actif) {
      addInput()
    }
  }, [actif]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress])

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
    setId((prevId) => {
      setInputs((prevInputs) => [...prevInputs, <Inputs key={elementTypeKey + prevId} id={prevId} name={""} value={""} modifyJson={modifyJson} />])
      return prevId + 1
    });
  }

  return (
    <div key={typeName}>
      <Popup trigger={/*<input type={typeName} placeholder={typeName} />*/<button className="button"> {typeName} </button>/**/} modal className='popup-custom' defaultOpen={false} onOpen={() => setActif(true)} onClose={() => {
        setInputs((prevInputs) => {
          setId(0)
          setJsons([])
          return []
        })
        addTypeInput()
        addNameInput()
        setActif(false)
      }}>
        {close => (
          <div className="modal">
            <div className="container">
              <button className="close" onClick={close} style={{ marginBottom: '0px' }}>
                &times;
              </button>
              <h3 className="header" style={{ margin: '0px' }}> Choose Attributes </h3>
            </div>
            <div className="content">
            </div>
            <div style={{ padding: '10px 0px' }}>
              <form id='formAttribute' style={{ overflowY: 'auto', maxHeight: '50vh', padding: '0px 15px' }} onSubmit={(e) => {
                close()
                addingElementToForm()
                e.preventDefault()
              }}>
                {showInputs()}
              </form>
            </div>
            <div className="actions" style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => addInput()}> Add a new attribute </button>
              <button type='submit' form='formAttribute' className="button">
                Validate
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  )
}

export default Selector;