import  { Schema, Document, SchemaOptions, model } from "mongoose";

interface PostDocument extends Document { 
    text: string;
    author: string;
    tags: string[];
    picture_name: string
}

const options: SchemaOptions = { 
    toJSON: { 
        transform(doc, ret) { 
            delete ret._id;
            delete ret.__v;
            delete ret.updatedAt;
        }
    },
    timestamps: true
}

const postSchema = new Schema({
    text: {
        type: String
    },
    author: { 
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    tags: {
        type: [String]
    },
    picture_name: { 
        type: String
    } 
}, options);

const Post = model<PostDocument>('posts', postSchema);

export default Post;