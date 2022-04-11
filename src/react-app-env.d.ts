/// <reference types="react-scripts" />


interface Todo {
  "id": number,
  "userId": number,
  "completed": boolean,
  "title": string,
}

interface Photo {
  "albumId": number,
  "id": number,
  "title": string,
  "url": string,
  "thumbnailUrl"?: string,
}
