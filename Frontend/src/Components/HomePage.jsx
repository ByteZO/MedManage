// Components/HomePage.js
import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="w-full p-6 bg-blue-600 text-white text-center text-2xl font-semibold">
        Welcome to PharmaScout
      </header>
      <main className="flex-grow flex flex-col items-center p-4 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Medicine Inventory & Sales Management</h1>
        <p className="text-lg text-gray-600 max-w-lg text-center">
          Track, audit, and manage all your medicines efficiently. Check your sales reports and make managing your
          inventory easier.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => alert("Navigate to Login or Dashboard")}
        >
          Get Started
        </button>
      </main>
      <footer className="w-full p-4 bg-gray-200 text-center text-sm text-gray-600">
        © 2024 PharmaScout. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
