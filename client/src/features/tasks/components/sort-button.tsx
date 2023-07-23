import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectSort } from "../task-slice"
import "./sort-button.css"

type Props = {
  sort: "id" | "userName" | "userEmail" | "completed"
  readableName: string
}

export const SortButton = ({ sort, readableName }: Props) => {
  const dispatch = useAppDispatch()
  const currentSort = useAppSelector((state) => state.tasks.currentSort)
  const currentSortDirection = useAppSelector(
    (state) => state.tasks.currentSortDirection,
  )
  const isCurrentSort = currentSort === sort

  let arrow = ""

  if (isCurrentSort) {
    arrow = currentSortDirection === "asc" ? " ↓" : " ↑"
  }

  const readableSort = `${readableName}${arrow}`
  return (
    <button
      className={`sort-button ${isCurrentSort && "active"}`}
      onClick={(e) => {
        e.preventDefault()
        dispatch(selectSort(sort))
      }}
    >
      {readableSort}
    </button>
  )
}
