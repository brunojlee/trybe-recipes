import React from 'react';

function NotFoundElement() {
  return (
    <main className="sm:flex">
      <p className="text-4xl font-extrabold text-orange sm:text-5xl">404</p>
      <div className="sm:ml-6">
        <div className="sm:border-l sm:border-gray-200 sm:pl-6">
          <h1
            className="text-4xl font-extrabold text-gray-900 tracking-tight
            sm:text-5xl"
          >
            Page not found
          </h1>
          <p
            className="mt-1 text-base text-gray-500"
          >
            Please check the URL in the address bar and try again.
          </p>
        </div>
      </div>
    </main>
  );
}

export default NotFoundElement;
