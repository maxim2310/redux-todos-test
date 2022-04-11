
export const getAlbum = (id: number): Promise<Photo[]> => {
  return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
    .then(response => {
      if (!response.ok) {
        return new Error(`ERROR 404`);
      }

      return response.json();
    })
};