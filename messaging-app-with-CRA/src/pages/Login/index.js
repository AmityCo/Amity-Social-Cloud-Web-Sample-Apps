import React from "react";
import "./index.css";

import { Amity } from "../../components/Amity";

export function Login({ onConnect = () => {} }) {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formdata = Object.fromEntries(new FormData(e.target));
    onConnect(formdata.username, "persistent" in formdata);
  };

  return (
    <div className="Login">
      <div className="Modal">
        <Amity />

        <h1>Connect with your favorite people</h1>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="username"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            required
          />
          <button>Continue</button>

          <label>
            <input type="checkbox" name="persistent" value="true" />
            {"Keep me signed in"}
          </label>
        </form>
      </div>
    </div>
  );
}
