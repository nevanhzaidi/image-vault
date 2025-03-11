import React from 'react';
import { ToastContainer } from 'react-toastify';
import ImageUploader from './component/ImageUploader';

function App() {
  return (
    <div className="App">
      <ImageUploader />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
