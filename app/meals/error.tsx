'use client'; 

import React from 'react';

interface ErrorProps {
  error: {
    message: string;
  };
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Filed to fetch meal data. Please try again later.</p>
    </main>
  );
};

export default Error;
