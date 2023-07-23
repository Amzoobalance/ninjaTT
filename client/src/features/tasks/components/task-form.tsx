import { useState } from "react"
import { createTaskAsync } from "../task-slice"
import validator from "validator"
import { useAppDispatch } from "../../../app/hooks"
import "./task-form.css"

export const TaskForm = () => {
  const dispatch = useAppDispatch()
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [body, setBody] = useState("")

  const createTodo = (event: any) => {
    event.preventDefault()
    const isEmail = validator.isEmail(userEmail)

    if (!userName || !body || !userEmail) {
      return alert("Отсутствуют обязательные поля")
    }

    if (!isEmail) {
      return alert("Email указан неверно")
    }
    dispatch(createTaskAsync({ userName, userEmail, body }))
    setUserName("")
    setUserEmail("")
    setBody("")
  }
  return (
    <form className="task-form">
      <fieldset className="fieldset">
        <legend>Создать задачу</legend>
        <div>
          <div className="input">
            <label className="label" htmlFor="name">
              Имя
            </label>
            <input
              id="name"
              type="text"
              autoComplete="given-name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Петр"
            />
          </div>
          <div className="input">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="test@test.com"
            />
          </div>
          <div className="input">
            <label className="label" htmlFor="body">
              Задача
            </label>
            <input
              id="body"
              type="text"
              onChange={(e) => setBody(e.target.value)}
              value={body}
              placeholder="Купить хлеб..."
            />
          </div>
          <div>
            <button className="confirm-button" onClick={createTodo}>
              Создать
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  )
}
