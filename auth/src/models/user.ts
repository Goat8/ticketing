import mongoose from 'mongoose';
import { Password } from '../services/password';

interface UserAttr{
    email:string;
    password:string;
}
interface UserDoc extends mongoose.Document{
    email:string;
    password:string;


}
interface UserModel extends mongoose.Model<UserDoc>{
    build(atts:UserAttr): UserDoc
}


const useSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   
}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id
            delete ret._id
            delete ret.password
            delete ret.__v
        }
    }
}
)

useSchema.pre('save', async function(done){ //donot use arrow function as i wont be able to access this(object). 
    if(this.isModified('password')){
        const hash = await Password.toHash(this.get('password'));
        this.set('password', hash);
        done();
    }
})

//Info: what is .statics.build? statics is Object of currently defined statics on this schema. 
useSchema.statics.build = (attrs: UserAttr)=>{
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', useSchema)

const user = User.build({
        email:"msd",
    password:"34234"
})


export {User }