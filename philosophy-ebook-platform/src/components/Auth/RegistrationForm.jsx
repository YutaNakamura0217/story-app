import React from 'react';

function RegistrationForm() {
  return (
    <form>
      <div>
        <label>I am a:</label>
        <div>
          <input type="radio" id="parent" name="userType" value="parent" defaultChecked /> <label htmlFor="parent">Parent</label>
          <input type="radio" id="teacher" name="userType" value="teacher" /> <label htmlFor="teacher">Teacher</label>
        </div>
      </div>

      <fieldset>
        <legend>Your Information</legend>
        <div>
          <input type="text" placeholder="Full Name" />
        </div>
        <div>
          <input type="email" placeholder="Email" />
        </div>
        <div>
          <input type="password" placeholder="Password" />
        </div>
      </fieldset>

      <fieldset>
        <legend>Child's Information (Optional)</legend>
        <div>
          <input type="text" placeholder="Child's Name" />
        </div>
        <div>
          <select>
            <option value="">Select Age</option>
            {Array.from({ length: 15 }, (_, i) => i + 3).map(age => (
              <option key={age} value={age}>{age}</option>
            ))}
          </select>
        </div>
      </fieldset>

      <div>
        <input type="checkbox" id="terms" /> <label htmlFor="terms">I agree to the <a href="/terms">Terms and Conditions</a></label>
      </div>

      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  );
}

export default RegistrationForm;
