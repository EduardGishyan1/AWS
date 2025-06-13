import { useState } from "react";

function Message() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    try {
      const res = await fetch("https://hf34zxqkrl.execute-api.eu-north-1.amazonaws.com/dev/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to send message");
      }

      const data = await res.json();
      setResponse(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 500, margin: "0 auto" }}>
      <h2>Send Message to SQS</h2>

      <input
        type="text"
        placeholder="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ display: "block", marginBottom: 12, width: "100%" }}
      />
      <button onClick={sendMessage}>Send</button>

      {response && (
        <div style={{ marginTop: 20, color: "green" }}>
          success
        </div>
      )}
      {error && (
        <div style={{ marginTop: 20, color: "red" }}>
          Error
        </div>
      )}
    </div>
  );
}

export default Message;
