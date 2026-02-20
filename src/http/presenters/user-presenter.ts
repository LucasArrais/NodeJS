import type { User } from "@/@types/prisma/client.js"

type HTTPUser = {
    id: number
    public_id: string
    name: string
    email: string
    photo: string | null
}

export class UserPresenter {
    static toHTTP(user: User): HTTPUser 
    static toHTTP(user: User []): HTTPUser[]
    static toHTTP(input: User | User []): HTTPUser | HTTPUser[] {
        if (Array.isArray(input)) {
            return input.map(user => this.toHTTP(user))

        }
        return {
            id: input.id,
            public_id: input.public_id,
            name: input.name,
            email: input.email,
            photo: input.photo,
        }
    }
} 