import { useState } from "react"
import { LoginForm } from "./login-form"
import { useCookies } from "react-cookie"
import "./login.css"

export const LoginModal = () => {
  const [modal, setModalToggle] = useState({
    isOpen: false,
  })
  const [cookies, setCookie, removeCookie] = useCookies(["admin"])

  const logout = async () => {
    await fetch(import.meta.env.VITE_API_LOGOUT_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    })
    removeCookie("admin")
  }

  return (
    <div>
      <div className="button-location">
        {cookies.admin ? (
          <button className="auth-button" onClick={logout}>
            Выйти
          </button>
        ) : (
          <button
            className="auth-button"
            onClick={() => setModalToggle({ isOpen: true })}
          >
            Войти
          </button>
        )}
      </div>
      <div className="auth">
        <div className={`modal ${modal.isOpen ? "open" : "close"}`}>
          <div className="modal-body">
            <div className="button-location">
              <button
                className="close-button"
                onClick={() => setModalToggle({ isOpen: false })}
              >
                ✕
              </button>
            </div>
            <LoginForm
              hide={() => {
                setModalToggle({ isOpen: false })
                setCookie("admin", true)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
