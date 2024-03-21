export interface Post {
    id : string
    title : string,
    content : string, 
    thumbnail : string,
    published : boolean,
    createAt : Date,
    updateAt : Date,
    authorId? : string
} 