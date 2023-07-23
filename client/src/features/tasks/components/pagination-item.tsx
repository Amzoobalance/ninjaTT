import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectPage } from "../task-slice"
import "./pagination-item.css"

type Props = {
  page: number
}
export const PaginationItem = ({ page }: Props) => {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector((state) => state.tasks.currentPage)

  return (
    <div
      className={`pagination-item ${currentPage === page && "active"}`}
      onClick={() => dispatch(selectPage(page))}
    >
      {page}
    </div>
  )
}
