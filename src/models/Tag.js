import { Schema, model } from 'mongoose';

const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
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

export default model('Tag', tagSchema);