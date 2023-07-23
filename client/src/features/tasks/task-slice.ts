import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface TasksState {
  values: Task[]
  currentPage: number
  currentSort: "userName" | "userEmail" | "completed" | "id"
  currentSortDirection: "asc" | "desc"
  taskCount: number
}

export interface Task extends TaskToCreate {
  id: number
  completed: boolean
  reworkedByAdmin: boolean
}

export interface TaskToCreate {
  userName: string
  userEmail: string
  body: string
}

const initialState: TasksState = {
  values: [],
  currentPage: 1,
  currentSort: "id",
  currentSortDirection: "desc",
  taskCount: 0,
}

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  return parts.length === 2 ? parts.pop()!.split(";").shift() : null
}

const getTasks = async (params: {
  page: TasksState["currentPage"]
  sort?: TasksState["currentSort"]
  direction?: TasksState["currentSortDirection"]
}) => {
  const searchParams = new URLSearchParams()
  searchParams.set("page", params.page.toString())

  if (params.sort) {
    searchParams.set("sort", params.sort.toString())
  }
  if (params.direction) {
    searchParams.set("direction", params.direction.toString())
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_TASKS_URL}?${searchParams.toString()}`,
  )

  return response.json()
}

export const createTaskAsync = createAsyncThunk(
  "tasks/create",
  async (task: TaskToCreate, { getState }) => {
    const { tasks } = getState() as RootState
    if (task.body === "" || task.userEmail === "" || task.userName === "") {
      return alert("Поля не должны быть пустыми")
    }
    await fetch(import.meta.env.VITE_API_TASKS_URL, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    })

    return getTasks({
      page: tasks.currentPage,
      sort: tasks.currentSort,
      direction: tasks.currentSortDirection,
    })
  },
)

export const updateTaskAsync = createAsyncThunk(
  "tasks/update",
  async (task: Task, { getState }) => {
    const { tasks } = getState() as RootState
    if (!getCookie("admin")) {
      return Promise.reject(new Error("Пожалуйста авторизуйтесь"))
    }
    await fetch(`${import.meta.env.VITE_API_TASKS_URL}/${task.id}`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    })

    return getTasks({
      page: tasks.currentPage,
      sort: tasks.currentSort,
      direction: tasks.currentSortDirection,
    })
  },
)

export const getTasksAsync = createAsyncThunk(
  "tasks/get",
  async (_, { getState }) => {
    const { tasks } = getState() as RootState

    return getTasks({
      page: tasks.currentPage,
      sort: tasks.currentSort,
      direction: tasks.currentSortDirection,
    })
  },
)

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    selectPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    selectSort: (
      state,
      action: PayloadAction<"id" | "userEmail" | "userName" | "completed">,
    ) => {
      if (state.currentSort === action.payload) {
        state.currentSortDirection =
          state.currentSortDirection === "asc" ? "desc" : "asc"
      } else {
        state.currentSort = action.payload
        state.currentSortDirection = "asc"
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createTaskAsync.fulfilled, (state, action) => {
      alert("Задача успешно добавлена")
      state.values = action.payload.rows
      state.taskCount = action.payload.count
    })
    builder.addCase(updateTaskAsync.fulfilled, (state, action) => {
      state.values = action.payload.rows
      state.taskCount = action.payload.count
    })
    builder.addCase(getTasksAsync.fulfilled, (state, action) => {
      state.values = action.payload.rows
      state.taskCount = action.payload.count
    })
    builder.addCase(createTaskAsync.rejected, (state, action) => {
      alert(action.error.message)
    })
    builder.addCase(updateTaskAsync.rejected, (state, action) => {
      alert(action.error.message)
    })
    builder.addCase(getTasksAsync.rejected, (state, action) => {
      alert(action.error.message)
    })
  },
})
export const { selectPage, selectSort } = tasksSlice.actions
export default tasksSlice.reducer
