export default function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white text-center rounded-2xl shadow-xl w-full max-w-lg animate-fadeIn p-5">

        {/* Blue Check Icon */}
        <div className="w-20 h-20 bg-gradient-to-br bg-[#3f547d] rounded-full flex items-center justify-center mx-auto -mt-10 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mt-4">Awesome!</h2>
        <p className="text-gray-600 mt-2">
          Your Account has been created successfully
        </p>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-[#3f547d] text-white font-semibold py-3 rounded-xl shadow hover:opacity-90 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}
