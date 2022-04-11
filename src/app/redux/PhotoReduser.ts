import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAlbum } from "../Api/Album";
import { AppDispatch } from "../store";

type PhotoState = {
  photos: Photo[]
  status: 'Loading' | 'Done' | 'ERROR'
}


const initialState: PhotoState = {
  photos: [],
  status: 'Loading'
}


const slice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setPhotos(state, action: PayloadAction<Photo[]>) {
      state.photos = action.payload
    },
    startLoading(state) {
      state.status = 'Loading'
    },
    finishLoading(state) {
      state.status = 'Done'
    },
    failLoading(state) {
      state.status = 'ERROR'
    },
  }
})


export const {setPhotos, startLoading, finishLoading, failLoading} = slice.actions;
export default slice.reducer;

export const loadAlbum = (id: number) => {
  return (dispatch: AppDispatch) => {
    dispatch(startLoading());

    getAlbum(id)
      .then(response => {
        dispatch(setPhotos(response));
        dispatch(finishLoading());
      })
      .catch(() => dispatch(failLoading()));
  }
}