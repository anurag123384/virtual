import { createContext } from 'react'

// Shared context for auth/user state + customization state.
// Provider is implemented in UserContext.jsx
export const userDataContext = createContext(null)
