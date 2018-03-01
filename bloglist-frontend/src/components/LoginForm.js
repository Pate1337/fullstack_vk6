import React from 'react'

const LoginForm = ({ login, username, password, handleChange }) => {
  return (
    <div>
      <h2>Login to application</h2>

      <form onSubmit={login}>
        <div>
          username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
