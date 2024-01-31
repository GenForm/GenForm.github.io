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
    <div className="Personalize" style={{ display: 'flex', justifyContent: 'center' }}>
      <div id="PersonalizeStyle" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ddd', padding: '10px', width: '300px' }}>
        <h2 style={{ marginTop: "0px", marginBottom: '10px' }}>Personalize your form</h2>
        <select value={selectedInput} onChange={(e) => setSelectedInput(e.target.value)} style={{ marginBottom: '10px' }}>
          <option value="">Select an option</option>
          {formJSON.elems.map((elem, index) => (
            <option key={index} value={elem.name}>{elem.name}</option>
          ))}
        </select>

        <textarea
          placeholder='Enter your CSS here'
          rows={20}
          cols={30}
          style={{ width: '100%', marginBottom: '10px' }}
          value={css[selectedInput] || ''}
          onChange={handleCssChange}
        />

        <button onClick={PersonalizeStyle}>Apply Style</button>
      </div>
    </div>
  );
}

export default Personalize;
