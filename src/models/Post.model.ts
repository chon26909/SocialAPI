import  { Schema, Document, SchemaOptions, model } from "mongoose";

interface PostDocument extends Document { 
    text: string;
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
    }
}, options);

const Post = model<PostDocument>('posts', postSchema);

export default Post;