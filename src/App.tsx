import React from 'react';
import Button, { ButtonColor, ButtonSize } from './components/Button/Button';

function App()  {
  return (
    <div>
      <h1>TEST</h1>
      <Button title={'Button'} color={ButtonColor.RED} size={ButtonSize.LARGE} />
    </div>
  );
}

export default App;
