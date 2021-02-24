import mongoose from "mongoose"
import passportLocalMongoose from "passport-local-mongoose"

const UserSchema = mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    user_type: {type: String, required: true},
    points:{
        attendance :{type: Number, min: 1, max :5},
        late_coming :{type: Number, min: -5, max :0},
        reason :{type: String},
        behavior :{type: Number, min: 1, max :5},
        work :{type: Number, min: 1, max :5},
        culture :{type: Number, min: 1, max :5}
    }
})
UserSchema.plugin(passportLocalMongoose);



UserSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', UserSchema)