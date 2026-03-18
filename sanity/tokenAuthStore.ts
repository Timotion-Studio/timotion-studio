import { createClient } from '@sanity/client'
import { BehaviorSubject } from 'rxjs'
import type { AuthStore } from 'sanity'

/**
 * Creates a Sanity AuthStore that authenticates using a server-provided API
 * token instead of requiring interactive OAuth login. Intended for embedded
 * studios already protected by an external auth layer (e.g. Basic Auth).
 */
export function createTokenAuthStore(token: string): AuthStore {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: '2024-01-01',
    useCdn: false,
    token,
  })

  return {
    state: new BehaviorSubject({
      authenticated: true,
      currentUser: {
        id: 'studio-admin',
        name: 'Studio Admin',
        email: 'admin@timotion.studio',
        role: 'administrator',
        roles: [{ name: 'administrator', title: 'Administrator' }],
      },
      client,
    }),
    token: new BehaviorSubject(token),
  }
}
