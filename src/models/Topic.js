import { Schema, model } from 'mongoose';

const topicSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    isFinished: {
      type: Boolean,
      required: true
    },
    resources: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Resource'
      }
    ],
    referencedUser: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model('Topic', topicSchema);