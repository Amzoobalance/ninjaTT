import { createSlice } from "@reduxjs/toolkit"

export interface ModalState {
  isOpen: boolean
}

const initialState: ModalState = {
  isOpen: false,
}
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    hideModal: (state) => {
      state.isOpen = false
    },
    showModal: (state) => {
      state.isOpen = true
    },
  },
})

export default modalSlice.reducer
