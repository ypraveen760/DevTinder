import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema(
  {
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      requied: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "intrested", "accepted", "rejected"],
        message: `status is not a valid type`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.toUserId.equals(connectionRequest.fromUserId)) {
    throw new Error(
      "Invalid Request: Cannot perform this action on your own account"
    );
  }
  next();
});
//compound index
connectionRequestSchema.index({ toUserId: 1, fromUserId: 1 });

const connectionRequest = mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);

export default connectionRequest;
