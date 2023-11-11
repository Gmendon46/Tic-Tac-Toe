import React, { useState } from 'react';

function Player({ initialName, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  const handleEditing = () => {
    setIsEditing((editing) => !editing);
  };

  const handleChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleSave = () => {
    onChangeName(symbol, playerName);
    setIsEditing(false); // Set editing to false after saving
  };

  return (
    <li className={isActive ? 'active' : undefined}>
      {isEditing ? (
        <div>
          <input type="text" value={playerName} placeholder="edit" onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className='player'>
          <span className='player-name'>{playerName}</span>
          <button onClick={handleEditing}>Edit</button>
          <span className='player-symbol'>{symbol}</span>
        </div>
      )}
    </li>
  );
}

export default Player;
