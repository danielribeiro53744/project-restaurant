export interface User {
    id: number;
    email: string;
    password: string;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    avatar: string | null;
    role: string;
}