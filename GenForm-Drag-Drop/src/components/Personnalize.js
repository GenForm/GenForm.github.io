import { useState, useEffect } from 'react';
import './Personnalize.css';

function Personnalize({ formJSON }) {
  const [selectedInput, setSelectedInput] = useState('');
  const [css, setCss] = useState({});

  const applyStyles = () => {
    for (const inputName in css) {
      const elem = document.querySelector(`[name="${inputName}"]`);
      if (elem) {
        elem.style.cssText = css[inputName];
      }
    }
  };

  useEffect(() => {
    applyStyles();
  }, [formJSON, css]);

  const handleCssChange = (elem) => {
    const newCss = elem.target.value;
    setCss({ ...css, [selectedInput]: newCss });
  };

  const PersonnalizeStyle = () => {
    if (selectedInput) {
      applyStyles();
    } else {
      console.log("No element selected");
    }
  };

  return (
    <div className="Personnalize">
      <div id="PersonnalizeStyle">
        <div id="container_label">
          <label>Select the input</label>
          <select value={selectedInput} onChange={(e) => setSelectedInput(e.target.value)}>
            {formJSON.elems.map((elem, index) => (
              <option key={index} value={elem.name}>{elem.name}</option>
            ))}
          </select>
        </div>

        <textarea
          placeholder='Enter your CSS here'
          rows={20}
          cols={30}
          value={css[selectedInput] || ''}
          onChange={handleCssChange}
        />

        <button onClick={PersonnalizeStyle}>Apply Style</button>
      </div>
    </div>
  );
}

export default Personnalize;
