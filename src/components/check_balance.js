import React, { useState } from 'react';

const ButtonComponent = () => {
  // State to track whether the button was clicked and the value to display
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [displayedValue, setDisplayedValue] = useState('');

  // Event handler for the button click
  const handleClick = () => {
    // Update state to indicate button was clicked and set the value to display
    setIsButtonClicked(true);
    setDisplayedValue('Value to display upon clicking');
  };

  return (
    <div>
      {/* Button with click event */}
      <button onClick={handleClick}>Check Balance</button>
      
      {/* Display the value when the button is clicked */}
      {isButtonClicked && <p>{displayedValue}</p>}
    </div>
  );
};

export default ButtonComponent;
