

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // Success/Error message
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Strong password validation regex
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setMessage({ text: 'All fields are required!', type: 'error' });
      return;
    }

    // Password validation
    if (!strongPasswordRegex.test(formData.password)) {
      setMessage({
        text: 'Password must be at least 8 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character.',
        type: 'error',
      });
      return;
    }

    setLoading(true);
    setMessage({ text: '' });

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: 'Registration successful! Redirecting...', type: 'success' });
        setTimeout(() => navigate('/login'), 2000);
        setFormData({ name: '', email: '', password: '' });
      } else {
        setMessage({ text: data.message || 'Registration failed!', type: 'error' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ text: 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Image Section */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-blue-500">
        <img
          src="https://images.unsplash.com/photo-1735370436237-779239d71e8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
          alt="Education"
          className="object-cover w-full h-[100vh]"
        />
      </div>

      {/* Right Side: Registration Form */}
      <div className="flex items-center justify-center w-full lg:w-1/2 bg-gradient-to-br from-blue-100 to-blue-400 p-6">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-blue-600">Register for SchedulifyX</h1>
          <p className="mt-2 text-sm text-center text-gray-600">
            Please fill in the details to create your account.
          </p>

          {/* Show Success or Error Message */}
          {message.text && (
            <div
              className={`mt-4 text-center p-2 rounded ${
                message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleRegister} className="mt-6 space-y-6">
            {/* Name Field */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="peer w-full p-3 text-gray-800 bg-gray-100 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Full Name"
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="peer w-full p-3 text-gray-800 bg-gray-100 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Email Address"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="8"
                className="peer w-full p-3 text-gray-800 bg-gray-100 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Password"
              />
              <p className="mt-1 text-sm text-gray-600">
                Must be 8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 text-white font-bold bg-blue-600 rounded-md shadow-md transition-all ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
