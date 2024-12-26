import React from 'react';

interface IndexProps {
  // Add props here if needed
}

const Index: React.FC<IndexProps> = () => {
  // Add state and effects here if needed
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Your App</h1>
        <p className="text-xl text-gray-600">Start building something amazing!</p>
      </div>
    </div>
  );
};

export default Index;