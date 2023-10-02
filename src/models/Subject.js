import { Schema, model} from 'mongoose';

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    topics: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Topic'
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

export default model('Subject', subjectSchema);