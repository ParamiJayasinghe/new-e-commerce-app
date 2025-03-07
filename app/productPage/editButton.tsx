import React from "react";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 border-2 border-blue-500 text-blue-500 py-2 px-6 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 text-sm md:text-base"
    >
      Edit
    </button>
  );
};

export default EditButton;
