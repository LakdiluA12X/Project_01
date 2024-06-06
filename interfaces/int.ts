export interface Project extends Document {
    company: string,
    country: String,
    state: String,
    credits: number,
}

export interface User extends Document {
    name: string;
    role: string;
    credits: number;
}