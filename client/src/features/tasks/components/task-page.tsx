import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { TaskItem } from "./task-Item"
import { TaskForm } from "./task-form"
import { Pagination } from "./pagination"
import { useEffect } from "react"
import { getTasksAsync } from "../task-slice"
import { TaskSorter } from "./task-sorter"
import "./task-page.css"
import { LoginModal } from "../../login/components/login-modal"

export const TaskPage = () => {
  const tasks = useAppSelector((state) => state.tasks.values)
  const currentPage = useAppSelector((state) => state.tasks.currentPage)
  const currentSort = useAppSelector((state) => state.tasks.currentSort)
  const currentSortDirection = useAppSelector(
    (state) => state.tasks.currentSortDirection,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTasksAsync())
  }, [currentPage, currentSort, currentSortDirection])

  return (
    <div className="task-page">
      <LoginModal />
      <TaskForm />
      <TaskSorter />
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      <Pagination />
    </div>
  )
}
