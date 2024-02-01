import { useState, useEffect } from 'react'
import './Personalize.css'

function Personalize({ formJSON }) {
  const [selectedInput, setSelectedInput] = useState('')
  const [css, setCss] = useState({})

  const applyStyles = () => {
    Object.keys(css).forEach((inputName) => {
      const elem = document.querySelector(`[name="${inputName}"]`)
      if (elem) {
        elem.style.cssText = css[inputName]
      }
    })
  }

  useEffect(() => {
    applyStyles()
  }, [formJSON, css])

  useEffect(() => {
    if (formJSON.elems.length === 0) {
      setCss({})
      setSelectedInput('defOpt')
    }
  }, [formJSON.elems])

  const handleCssChange = (elem) => {
    const newCss = elem.target.value
    setCss({ ...css, [selectedInput]: newCss })
  }

  const PersonalizeStyle = () => {
    if (selectedInput) {
      applyStyles()
    } else {
      console.log('No element selected')
    }
  }

  return (
    <div
      className="Personalize"
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <div
        id="PersonalizeStyle"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <h2 style={{ marginTop: '0px', marginBottom: '10px' }}>
          Personalize your form
        </h2>
        <select
          value={selectedInput}
          onChange={(e) => setSelectedInput(e.target.value)}
          style={{ marginBottom: '10px' }}
        >
          <option value="defOpt" disabled hidden>
            Select an option
          </option>
          {formJSON.elems.map((elem, index) => (
            <option key={index} value={elem.name}>
              {elem.name}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Enter your CSS here"
          rows={10}
          style={{ width: '100%', marginBottom: '10px', overflow: 'auto' }}
          value={css[selectedInput] || ''}
          onChange={handleCssChange}
        />

        <button onClick={PersonalizeStyle}>Apply Style</button>
      </div>
    </div>
  )
}

export default Personalize
