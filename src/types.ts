export interface Member {
    id: number
    tid: number
    name: string
    gender: string
    birthday: Date
    avatar: string
}

export interface Tree {
    id: number
    name: string
    cover: string
    note: string
    readonly createdAt?: Date
    readonly updatedAt?: Date
}
