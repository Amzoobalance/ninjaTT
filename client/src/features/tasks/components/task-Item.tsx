import { useState } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { Task, updateTaskAsync } from "../task-slice"
import { BsFillPencilFill } from "react-icons/Bs"
import "./task-item.css"

type Props = {
  task: Task
}

export const TaskItem = ({ task }: Props) => {
  const dispatch = useAppDispatch()
  const [body, setBody] = useState(task.body)
  const hasUnsavedChanges = task.body !== body

  const saveRework = async () => {
    await dispatch(updateTaskAsync({ ...task, body, reworkedByAdmin: true }))
  }
  return (
    <div className="task-item">
      <div className="checkbox">
        <input
          checked={task.completed}
          onChange={() =>
            dispatch(updateTaskAsync({ ...task, completed: !task.completed }))
          }
          type="checkbox"
        />
      </div>
      <div className="task-info">
        <div className="author">
          {task.userName} ({task.userEmail})
        </div>
        <textarea
          className="body"
          value={body}
          rows={4}
          onChange={(e) => setBody(e.target.value)}
        />
        {hasUnsavedChanges ? (
          <button className="save-button" onClick={saveRework}>
            Сохранить
          </button>
        ) : null}
        <div
          title="Отредактированно администратором"
          className={`reworked ${task.reworkedByAdmin ? "show" : "hide"}`}
        >
          <BsFillPencilFill />
        </div>
      </div>
    </div>
  )
}
