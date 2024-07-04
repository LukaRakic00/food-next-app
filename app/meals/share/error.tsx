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
      <p>Failed to create meal.</p>
    </main>
  );
};

export default Error;
