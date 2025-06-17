import { useState } from 'react';

function ConfirmEmail() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleConfirm = async (e) => {
    e.preventDefault();

    const res = await fetch('https://vk26fobb99.execute-api.eu-north-1.amazonaws.com/dev/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Email confirmed!');
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  return (
    <form onSubmit={handleConfirm}>
      <h2>Confirm Email</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        placeholder="Confirmation Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <button type="submit">Confirm</button>
      <p>{message}</p>
    </form>
  );
}

export default ConfirmEmail;
