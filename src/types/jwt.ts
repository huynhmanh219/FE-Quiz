export interface JwtUserPayload {
    _id: string
    role: 'admin' | 'teacher' | 'client'
  }