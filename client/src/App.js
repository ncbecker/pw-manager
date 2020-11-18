import logo from "./logo.svg";
import "./App.css";
import { getPassword } from "./api/passwords";
import { useEffect, useState } from "react";

function App() {
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function pwFetch() {
      setLoading(true);
      const passwordValue = await getPassword("pw4ufork");
      setPassword(passwordValue);
      setLoading(false);
    }
    pwFetch();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {loading && <div>Loading...</div>}
        {password}
      </header>
    </div>
  );
}

export default App;
