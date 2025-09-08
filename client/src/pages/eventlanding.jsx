import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateEventLanding = () => {
  const navigate = useNavigate();

  return (
  <div className="p-6 min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-md bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Event</h2>
      <p className="mb-6 text-center text-gray-700">
        Choose the type of event to create
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
          onClick={() => navigate('/createevent/technical')}
          className="w-full sm:w-auto bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          Technical Event
        </button>

        {/* Uncomment if Non-Technical button is needed */}
        {/* <button
          onClick={() => navigate('/createevent/non-technical')}
          className="w-full sm:w-auto bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
        >
          Non-Technical Event
        </button> */}
      </div>
    </div>
  </div>
);

};

export default CreateEventLanding;
