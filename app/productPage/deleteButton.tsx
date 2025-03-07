// DeleteButton.tsx
import React from "react";

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 border-2 border-red-500 text-red-500 py-2 px-6 rounded-lg hover:bg-red-500 hover:text-white transition duration-300 text-sm md:text-base"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
