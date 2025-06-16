import React, { useState } from "react";

const API_BASE_URL = "https://vk26fobb99.execute-api.eu-north-1.amazonaws.com/dev";

export function SignUp() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.email,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`User ${data.username} registered successfully!`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (err) {
      setMessage("Network error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Sign Up</button>
      <p>{message}</p>
    </form>
  );
}

export function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setToken(data.idToken);
        setMessage("Login successful!");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (err) {
      setMessage("Network error");
    }
  };

  const COGNITO_DOMAIN = "https://appmy.auth.eu-north-1.amazoncognito.com";
  const CLIENT_ID = "7cp62vi5fjq9if49grdgv6fuf5";
  const REDIRECT_URI = "http://localhost:5173/callback";

  const handleGoogleLogin = () => {
      const url = `${COGNITO_DOMAIN}/oauth2/authorize?` +
        `response_type=code&` +
        `client_id=${CLIENT_ID}&` +
        `redirect_uri=${REDIRECT_URI}&` +
        `identity_provider=Google&` +
        `scope=email openid profile`;

      window.location.href = url;
    };

  return (

    <div style={{display: "flex", justifyContent: "space-between" , width: "30%", alignItems: "center", marginTop: "15px", margin: "auto"}}>
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
      /><br />
      <input
        name="password"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Sign In</button>
      <p>{message}</p>
      {token && (
        <div>
          <br />
          <h4>Your Token (save it for API calls):</h4>
           <br />
          <textarea readOnly rows={15} cols={80} value={token} />
        </div>
      )}
    </form>
  <button style={{height: "40px", width: "120px"}} onClick={handleGoogleLogin}>Google Sign In</button>
    </div>

);
}
