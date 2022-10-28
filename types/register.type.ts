export interface RegisterRequest {
  username: string;
}

export interface RegisterResponse {
  isSuccessful: boolean;
  reason?: string;
  username?: string;
  token?: string;
}
