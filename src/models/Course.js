import { Schema, model } from 'mongoose';

const courseSchema = new Schema(
  {
    subject: {
      type: Schema.Types.ObjectId,
      ref: 'Subject'
    },
    schedule: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Schedule'
      }
    ],
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
      }
    ],
    platform: {
      type: String
    },
    meetingUrl: {
      type: String
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

export default model('Course', courseSchema);