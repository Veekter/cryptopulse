import { ID, Query } from "node-appwrite"
import { users } from "../appwrite.config"
import { parseStringify } from "../utils"

export const createUser = async (user: CreateUserParams) => {
    try {
        console.log("Trying to create a user...")
        const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name) 
        console.log("Created new user:", {newUser})

        return parseStringify(newUser)
        
    } catch (error: any) {
        if(error && error?.code  === 409) {
            const documents = await users.list([
                Query.equal('email', [user.email])
            ])

            return documents?.users[0]
        }

        console.log(error)
    }
}

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId)

        return parseStringify(user)
    } catch (error) {
        console.log(error)
    }
}