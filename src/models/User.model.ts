import { model, Schema, SchemaOptions } from 'mongoose';

interface UserDocument extends Document { 
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;   
    salt: string;
    role: string;
}

const options: SchemaOptions = { 
    toJSON: { 
        transform(doc, ret) { 
            delete ret.__id;
            delete ret.__v;
        }
    },
    timestamps: true
}

const userSchema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    phone: {
        type: String
    },
    email: { 
        type: String
    },
    password: {
        type: String
    }, 
    salt: { 
        type: String
    },
    role: { 
        type: String
    }
}, options);

const User = model<UserDocument>('users', userSchema);

export default User;