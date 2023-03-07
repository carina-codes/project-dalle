import React from 'react';

import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className="grid-item">
      <div className="card-style">
        <img 
          className="card-image" 
          src={photo}
          alt={prompt}
        />
        <div className="card-info">
          <p className="card-prompt">
            {prompt}
          </p>
          <div className="row">
            <div className="col-6">
              <div>
                <p className="card-name">
                  <span className="icon">{name[0]}</span> <span className="card-full-name">{name}</span>
                </p>
              </div>
            </div>
            <div className="col-6 align-right">
              <button type="button" onClick={() => downloadImage(_id, photo)}>
                <img src={download} alt="download" className="download-btn" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;