import { useState } from "react"
import "./login.css"

type Props = {
  hide: () => any
}

export const LoginForm = ({ hide }: Props) => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const sign = async () => {
    const response = await fetch(import.meta.env.VITE_API_LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ login, password }),
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    })
    if (!(await response.json()).success) {
      return alert("Неверные данные")
    }
    setLogin("")
    setPassword("")
    hide()
  }

  return (
    <div className="login-input">
      <input
        className="input"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        type="text"
        placeholder="Логин"
      />
      <input
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Пароль"
      />
      <div className="button">
        <button className="confirm-button" onClick={sign}>
          Войти
        </button>
      </div>
    </div>
  )
}
