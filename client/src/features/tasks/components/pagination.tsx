import { useAppSelector } from "../../../app/hooks"
import { PaginationItem } from "./pagination-item"
import "./pagination.css"

export const Pagination = () => {
  const count = useAppSelector((state) => state.tasks.taskCount)
  const itemList = new Array(Math.ceil(count / 3))
    .fill(null)
    .map((_, index) => <PaginationItem key={index} page={index + 1} />)
  return <div className="pagination">{itemList}</div>
}
