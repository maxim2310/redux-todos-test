import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loadAlbum } from "../redux/PhotoReduser";
import './AlbumPage.scss'

export const AlbumsPage = () => {
  const [id, setId] = useState<string | number>('')

  const dispatch = useAppDispatch();
  const photos = useAppSelector(state => state.photos.photos)

  const onSubmitGetPhotos = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loadAlbum(+id))
    setId('')
  }

  return (
    <>
      <h1>Please fill in a value from 1 to 100 and press enter or press the button</h1>
      <form 
        onSubmit={onSubmitGetPhotos}
        className='form-for-photo'
      >
        <input 
          className="input is-primary App__input" 
          type="text" 
          placeholder="Set album #"
          value={id}
          onChange={(e) => {
            if (+e.target.value < 100) {
              setId(+e.target.value)
            }
          }}
        />
        <button 
          className="button is-rounded"
          type="submit"
        >
            Load album
        </button>
      </form>
      <div className="album" >
        <div className="album__container">
          {
            photos.map(photo => (
              <div className="album__card" key={photo.id}>
                <img className="card__img" src={photo.url} alt={photo.title} />
                <p className="card__text">{photo.title}</p>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}