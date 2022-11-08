export interface User {
  id: number,
  username: string,
  created_on: string,
  token: string
}

export interface LoginResponse {
  username: string,
  created_on: string,
}
