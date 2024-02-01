import React from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Selector.css';

const EndPresentation = () => {

  return (
    <div>
      <Popup trigger={<button className="button" style={{ background: "#FFFFFF", border: "none", color: "#FFFFFF", padding: '0px', margin: '0px' }}> Fin </button>} modal>
        {close => (
          <div className="modal">
            <div className="actions">
              <h2 style={{ textAlign: "center" }}>Merci d'avoir suivi cette démonstration</h2>
              <p style={{ textAlign: "center" }}>Place aux questions</p>
              <button className="button" onClick={() => {
                close()
              }} style={{ background: "#FFFFFF", border: "none", color: "#FFFFFF" }}>
                Reprendre
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  )
}

export default EndPresentation;