import React, { useState } from 'react';

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg p-8 z-50">
        <button className="absolute top-0 right-0 p-2" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700 hover:text-gray-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

function App() {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const handleButtonClick1 = () => {
    setShowModal1(true);
  };

  const handleButtonClick2 = () => {
    setShowModal2(true);
  };

  const handleCloseModal = () => {
    setShowModal1(false);
    setShowModal2(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleButtonClick1}
      >
        Open Modal 1
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleButtonClick2}
      >
        Open Modal 2
      </button>

      {showModal1 && (
        <Modal onClose={handleCloseModal}>
          {/* Content for Modal 1 */}
          <h2 className="text-xl font-bold mb-4">Modal 1</h2>
          <p>This is the content of Modal 1.</p>
        </Modal>
      )}

      {showModal2 && (
        <Modal onClose={handleCloseModal}>
          {/* Content for Modal 2 */}
          <h2 className="text-xl font-bold mb-4">Modal 2</h2>
          <p>This is the content of Modal 2.</p>
        </Modal>
      )}
    </div>
  );
}

export default App;
