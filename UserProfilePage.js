import React from 'react';
import { useParams } from 'react-router-dom';

const UserProfilePage = () => {
  const { username } = useParams();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
        <p className="mt-2 text-gray-600">
          Profile for: {username}
        </p>
      </div>
      <div className="text-center py-12">
        <p className="text-gray-600">User profile coming soon...</p>
      </div>
    </div>
  );
};

export default UserProfilePage; 