const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    user: [
        {
            name: { type: String },
            email: { type: String },
            number: { type: String },
            address: { type: String },
        }
    ],
    password: { type: String },
    verify: { type: Boolean, default: false },
    type: {
        type: Array,
        default: ["admin", "seller", "buyer"]
    },
    avatar: {type: String}
}, {
    versionKey: false,
    timestamps: true,
})

UserSchema.pre("save", async function (next) {
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next;
});

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


module.exports = mongoose.model("user", UserSchema);