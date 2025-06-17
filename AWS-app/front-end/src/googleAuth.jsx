import { useEffect, useState } from "react";
import "./Callback.css";

const BACKEND_URL = "https://vk26fobb99.execute-api.eu-north-1.amazonaws.com/dev/google-auth";

function Callback() {
  const [message, setMessage] = useState("Processing...");
  const [info, setInfo] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) {
      setMessage("No code found in URL.");
      return;
    }

    fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data);
          setMessage("Authentication failed: " + data.error);
        } else {
          console.log(data);
          localStorage.setItem("idToken", data.id_token);
          localStorage.setItem("accessToken", data.access_token);

          setMessage("Login successful! Redirecting...");
          setInfo(
            "Your tokens (idToken and accessToken) have been securely saved in localStorage for use in authenticated API requests."
          );

          setTimeout(() => {
            window.location.href = "/";
          }, 5000);
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("Something went wrong.");
      });
  }, []);

  return (
    <div className="callback-wrapper">
      <div className="callback-box">
        <h2 className="callback-message">{message}</h2>
        {info && <p className="callback-info">{info}</p>}
      </div>
    </div>
  );
}

export default Callback;
