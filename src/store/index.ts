import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  id: string; email: string; firstName: string; lastName: string
  accountTier: string; isAdmin: boolean; emailVerified: boolean
}

interface AuthState {
  user: AuthUser | null; token: string | null; isAuthenticated: boolean
  setAuth: (user: AuthUser, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null, token: null, isAuthenticated: false,
      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => {
        document.cookie = 'valcr_aid=; max-age=0; path=/; samesite=lax'
        set({ user: null, token: null, isAuthenticated: false })
      },
    }),
    { name: 'valcr-auth' } // Same key as valcr-frontend — shared login state
  )
)

export function hasAccess(user: AuthUser | null, tier: string): boolean {
  if (!user) return false
  if (user.isAdmin) return true
  const order = ['free','pro','teams','embed-starter','embed-business','embed-agency']
  return order.indexOf(user.accountTier) >= order.indexOf(tier)
}

interface CalcState {
  recentSlugs: string[]
  setRecent: (slugs: string[]) => void
}

export const useCalcStore = create<CalcState>((set) => ({
  recentSlugs: [],
  setRecent: (slugs) => set({ recentSlugs: slugs.filter(s => s.startsWith('fl-')) }),
}))
