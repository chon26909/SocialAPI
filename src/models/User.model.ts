import { model, Schema, SchemaOptions } from 'mongoose';

interface UserDocument extends Document { 
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;   
    salt: string;
    role: string;
    image: string;
}

const options: SchemaOptions = { 
    toJSON: { 
        transform(doc, ret) { 
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            delete ret.salt;
            delete ret.role;
            delete ret.createdAt;
            delete ret.updatedAt;
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
    },
    image: {
        type: String
    }
}, options);

const User = model<UserDocument>('users', userSchema);

export default User;