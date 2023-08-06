const mongoos = require("mongoose");

const InviteCodeSchema = new mongoos.Schema({
    _id: String,
    fullCode: String,
    status: String,
    email: String
},
{
  timestamps: true // Enables automatic generation of 'createdAt' and 'updatedAt' fields
}
);

module.exports = mongoos.model("InviteCode", InviteCodeSchema);
