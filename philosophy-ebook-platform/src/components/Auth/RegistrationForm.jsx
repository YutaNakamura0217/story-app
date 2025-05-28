import React from 'react';

function RegistrationForm() {
  return (
    <form className="space-y-6">
      {/* User Type Selection */}
      <fieldset className="mb-6">
        <legend className="text-base font-medium text-gray-900 mb-2">I am a:</legend>
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <input
              id="parent"
              name="userType"
              type="radio"
              value="parent"
              defaultChecked
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label htmlFor="parent" className="ml-2 block text-sm font-medium text-gray-700">
              Parent
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="teacher"
              name="userType"
              type="radio"
              value="teacher"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label htmlFor="teacher" className="ml-2 block text-sm font-medium text-gray-700">
              Teacher
            </label>
          </div>
        </div>
      </fieldset>

      {/* Your Information Section */}
      <fieldset className="mb-6">
        <legend className="text-base font-medium text-gray-900 mb-2">Your Information</legend>
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="sr-only">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>
      </fieldset>

      {/* Child's Information Section (Optional) */}
      <fieldset className="mb-6">
        <legend className="text-base font-medium text-gray-900 mb-2">Child's Information (Optional)</legend>
        <div className="space-y-4">
          <div>
            <label htmlFor="childName" className="sr-only">Child's Name</label>
            <input
              id="childName"
              name="childName"
              type="text"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Child's Name"
            />
          </div>
          <div>
            <label htmlFor="childAge" className="sr-only">Select Age</label>
            <select
              id="childAge"
              name="childAge"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select Age</option>
              {Array.from({ length: 15 }, (_, i) => i + 3).map(age => (
                <option key={age} value={age}>{age}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      {/* Terms and Conditions */}
      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          required
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
          I agree to the <a href="/terms" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">Terms and Conditions</a>
        </label>
      </div>

      {/* Register Button */}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </div>
    </form>
  );
}

export default RegistrationForm;
