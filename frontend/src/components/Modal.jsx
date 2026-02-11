const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute top-[40%] right-[50%] bg-white opacity-50 p-4 rounded-lg z-10 text-right">
            <button
              className="text-black font-semibold hover:text-gray-700 mr-2 cursor-pointer outline-0 border-0 shadow-lg text-[12px]"
              onClick={onClose}
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
