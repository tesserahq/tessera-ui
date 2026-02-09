export interface User {
  id: string
  email?: string
  username?: string
  avatar_url?: string
  avatar_asset_id?: string
  first_name: string
  last_name: string
  provider?: string
  confirmed_at?: string
  verified: boolean
  verified_at?: string
  external_id?: string
  theme_preference?: string
  created_at: string
  updated_at: string
}

export interface UserUpdate {
  email?: string
  username?: string
  avatar_asset_id?: string
  first_name?: string
  last_name?: string
  provider?: string
  verified?: boolean
  verified_at?: string
  theme_preference?: string
}

export interface UserCreate {
  email?: string
  username?: string
  avatar_url?: string
  avatar_asset_id?: string
  first_name: string
  last_name: string
  provider?: string
  confirmed_at?: string
  verified?: boolean
  verified_at?: string
  theme_preference?: string
}

export interface UserOnboard extends UserCreate {
  external_id: string
}

export interface ApiResponse<T> {
  data: T
}

export interface ApiError {
  detail: string
  status_code: number
}
