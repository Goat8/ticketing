import mongoose  from "mongoose";

interface TicketAttr {
    title:string;
    price:number;
    userId:string;
}
interface TicketDoc  extends mongoose.Document {
    title:number;
    price:number;
    userId:string;
}

interface TicketModel  extends mongoose.Model<TicketDoc> {
    build(attrs:TicketAttr): TicketDoc
}

const ticketSchema = new mongoose.Schema({
    title:{
        type:String,//global string constructor 
        required:true
    },
    price:{
        type:Number,
        required:true
    },
   
}, {
    toJSON: {
        transform(doc, ret){
            //ret is the object that direct change into json 
            ret.id = ret._id
            delete ret._id
            delete ret.__v
        }
    }
}
)

//Info: what is .statics.build? statics is Object of currently defined statics on this schema. 
ticketSchema.statics.build = (attrs: TicketAttr)=>{
    return new Ticket(attrs)
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema)

export{Ticket}