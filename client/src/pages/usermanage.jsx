
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const [users, setUsers] = useState({ faculty: [], students: [] });
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState('faculty');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const navigate = useNavigate();

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://eventspot-2.onrender.com/uRoute/save');
        const data = await response.json();
        setUsers({
          faculty: data.faculty,
          students: data.students,
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle role selection change
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setSelectedDepartment('All'); // Reset department on role change
  };

  // Back button handler
  const handleBackButtonClick = () => {
    navigate('/admin/dashboard');
  };

  // Extract unique departments from students
  const getDepartments = () => {
    const departments = users.students.map((student) => student.department || 'N/A');
    return ['All', ...new Set(departments)];
  };

  // Filter students by department
  const getFilteredStudents = () => {
    if (selectedDepartment === 'All') return users.students;
    return users.students.filter((student) => student.department === selectedDepartment);
  };

  // Table rendering
  const renderTable = (userList) => {
    return (
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Department</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 ? (
            userList.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-100">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.department || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-2 text-center text-gray-500">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div className="user-management-page p-6 relative">
      <h2 className="text-3xl font-bold">User Management</h2>

      {/* Back Button */}
      <button
        onClick={handleBackButtonClick}
        className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Back to Admin Dashboard
      </button>

      {loading ? (
        <p className="text-gray-500 mt-6">Loading users...</p>
      ) : (
        <div>
          {/* Role Selection */}
          <div className="mb-4 mt-6">
            <label htmlFor="role" className="text-lg font-semibold text-gray-700 mr-4">Select Role:</label>
            <select
              id="role"
              value={selectedRole}
              onChange={handleRoleChange}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="faculty">Faculty</option>
              <option value="students">Students</option>
            </select>
          </div>

          {/* Department Filter for Students */}
          {selectedRole === 'students' && (
            <div className="mb-4">
              <label htmlFor="department" className="text-lg font-semibold text-gray-700 mr-4">Select Department:</label>
              <select
                id="department"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
              >
                {getDepartments().map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Display Table */}
          <div className="user-list mt-4">
            {selectedRole === 'faculty'
              ? renderTable(users.faculty)
              : renderTable(getFilteredStudents())}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
