import React, { useState } from 'react';

const AuthForm = ({ mode = 'login' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
    const body = mode === 'login'
      ? { email, password }
      : { email, password, firstName, lastName, userType: 'donor', profile: {} };

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (!res.ok) return setError(data.error);

      localStorage.setItem('token', data.token);
      alert(`${mode === 'login' ? 'Logged in' : 'Registered'} successfully!`);
      // redirect to dashboard or home page
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #ccc', borderRadius: 10 }}>
      <h2>{mode === 'login' ? 'Sign In' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        {mode === 'register' && (
          <>
            <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
            <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
          </>
        )}
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">{mode === 'login' ? 'Sign In' : 'Sign Up'}</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AuthForm;
