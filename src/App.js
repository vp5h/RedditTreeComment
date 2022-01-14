import React from 'react';
import RecursiveTree from './RecursiveTree';
import thread from './thread';

const onSelect = (value) => {
  // You can put whatever here
  alert('you clicked: ' + value.text);
};

function App() {
  return (
    <>
      <RecursiveTree listMeta={thread} onSelectCallback={onSelect} />
    </>
  );
}

export default App;