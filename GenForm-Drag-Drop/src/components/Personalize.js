import { useState, useEffect } from 'react';
import './Personalize.css';

function Personalize({ formJSON }) {
  const [selectedInput, setSelectedInput] = useState('');
  const [css, setCss] = useState({});

  const applyStyles = () => {
    Object.keys(css).forEach(inputName => {
      const elem = document.querySelector(`[name="${inputName}"]`);
      if (elem) {
        elem.style.cssText = css[inputName];
      }
    });
  };

  useEffect(() => {
    applyStyles();
  }, [formJSON, css]);

  useEffect(() => {
    if (formJSON.elems.length === 0) {
      setCss({});
      setSelectedInput('');
    }
  }, [formJSON.elems]);

  const handleCssChange = (elem) => {
    const newCss = elem.target.value;
    setCss({ ...css, [selectedInput]: newCss });
  };

  const PersonalizeStyle = () => {
    if (selectedInput) {
      applyStyles();
    } else {
      console.log("No element selected");
    }
  };

  return (
    <div className="Personalize" style={{ display: 'flex' }}>
      <div id="PersonalizeStyle" style={{ flex: '1', border: '1px solid #ddd', padding: '10px' }}>
        <div id="container_label">
          <label>Select the input</label>
          <select value={selectedInput} onChange={(e) => setSelectedInput(e.target.value)}>
            <option value="">Select an option</option>
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

        <button onClick={PersonalizeStyle}>Apply Style</button>
      </div>
    </div>
  );
}

export default Personalize;
