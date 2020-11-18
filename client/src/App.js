import logo from "./logo.svg";
import "./App.css";
import { getPassword } from "./api/passwords";
import { useEffect, useState } from "react";

function App() {
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      async function pwFetch() {
        setLoading(true);
        const passwordValue = await getPassword("pw4ufork");
        setPassword(passwordValue);
      }
      pwFetch();
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {loading && <div>Loading...</div>}
        {error && <div>{error.message}</div>}
        {password}
      </header>
    </div>
  );
}

export default App;
