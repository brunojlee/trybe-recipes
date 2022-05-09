import React from 'react';
import ButtonPrevious from '../components/ButtonPrevious';
import NotFoundElement from '../components/NotFoundElement';

export default function NotFound() {
  return (
    <div
      className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24
      md:grid md:place-items-center lg:px-8"
    >
      <div className="max-w-max mx-auto">
        <NotFoundElement />
      </div>
      <ButtonPrevious />
    </div>
  );
}
