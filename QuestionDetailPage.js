import React from 'react';
import { useParams } from 'react-router-dom';

const QuestionDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Question Details</h1>
        <p className="mt-2 text-gray-600">
          Question ID: {id}
        </p>
      </div>
      <div className="text-center py-12">
        <p className="text-gray-600">Question details coming soon...</p>
      </div>
    </div>
  );
};

export default QuestionDetailPage; 