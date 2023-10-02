import { Schema, model } from 'mongoose';

const scheduleSchema = new Schema(
  {
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    duration: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model('Schedule', scheduleSchema);