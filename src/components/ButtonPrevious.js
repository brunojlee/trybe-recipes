import React from 'react';
import { useHistory } from 'react-router-dom';

function ButtonPrevious() {
  const history = useHistory();
  const goBack = () => history.goBack();

  return (
    <button
      type="button"
      onClick={ goBack }
      className="bg-darkblue text-white m-2 py-1 px-4 rounded"
    >
      <svg
        className="fill-white"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M0 12l9-8v6h15v4h-15v6z" />
      </svg>
    </button>
  );
}

export default ButtonPrevious;
