const mongoosed = require("mongoose");

var UseredSchema = new mongoosed.Schema(
    {
      email: String,
      first_name: String,
      last_name: String,
      password: String,
      client: String,
      clients: [{ type: mongoosed.Schema.Types.ObjectId, ref: "Client" }],
      s3location: String,
      avatarType: String,
      avatarSettings: {
        type: String,
        default:
          '{"AvatarType":"HalfBody","UserScale":1.0,"AvatarHead":"Default","LeftArmScale":0.0,"RightArmScale":0.0,"UserGender":"Male","PlayerShirt":"Blue1","AvatarFullBodyType":"Suit2"}',
      },
      fullBodyAvatar: { type: String, default: "" },
      salt: String,
      hasToken: Boolean,
      emailVerified: Boolean,
      hasPic: Boolean,
      role: String,
      hasSizes: Boolean,
      profilePic: String,
      picExtension: String,
      token: String,
      passwordResetToken: { type: String, default: "" },
      passwordResetTimeStamp: String,
      tz: String,
      recentFiles: Array,
      featuresSupported: Array,
      drives: [{ type: mongoosed.Schema.Types.ObjectId, ref: "Drive" }],
      recoveryCodes: Array,
      mfaEnabled: Boolean,
      mfaSecret: String,
      recentTotpCodes: { type: Array, default: [] },
      prevPasswords: [{ type: mongoosed.Schema.Types.ObjectId, ref: "PreviousPassword" }],
      userDevices: [{ type: mongoosed.Schema.Types.ObjectId, ref: "UserDevice" }],
      userTeams: [{ type: mongoosed.Schema.Types.ObjectId, ref: "Team" }],
    },
    { collection: "user" }
  );

module.exports = mongoosed.model("Usered", UseredSchema);
