import { SortButton } from "./sort-button"
import "./task-sorter.css"

export const TaskSorter = () => {
  return (
    <div className="sort-group">
      <SortButton sort="id" readableName="ID" />
      <SortButton sort="userName" readableName="Имя" />
      <SortButton sort="userEmail" readableName="Email" />
      <SortButton sort="completed" readableName="Выполнено" />
    </div>
  )
}
