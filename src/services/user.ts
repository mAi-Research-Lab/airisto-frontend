import { api } from "@/lib/api/api";
import { User } from "@/types/user";


export async function currentUser() {
    try {
        const response = await api.get('/user/current');

        return response.data;
    } catch (error) {
        throw error
    }
}

export async function getUserById(userId: string): Promise<User> {
    try {
        const response = await api.get(`/user/${userId}`);

        return response.data;
    } catch (error) {
        throw error
    }
}

export async function getAllUsers(): Promise<User[]> {
    try {
        const response = await api.get('/user');

        return response.data;
    } catch (error) {
        throw error
    }
}

export async function updateUser(user: { name: string, surname: string, phone: string }): Promise<User> {
    try {
        const response = await api.patch(`/user/current`, {
            name: user.name,
            surname: user.surname,
            phone: user.phone
        })

        return response.data;
    } catch (error) {
        throw error
    }

}