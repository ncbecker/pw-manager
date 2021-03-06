import logo from "./logo.svg";
import "./App.css";
import { getPassword } from "./api/passwords";
import { useState } from "react";
import useAsync from "./hooks/useAsync";

function App() {
  const [passwordName, setPasswordName] = useState("");

  const { data, loading, error, doFetch } = useAsync(() =>
    getPassword(passwordName)
  );

  function handleChange(event) {
    setPasswordName(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    doFetch();
    setPasswordName("");
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {loading && <div>Loading...</div>}
        {error && <div>{error.message}</div>}
        {data}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Password Name"
            name="name"
            value={passwordName}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={handleSubmit}>
            Get Password
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
