import mongoose, { Schema, Document } from 'mongoose';

export interface ActivityDocument extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  calories: number;
  performedAt: Date;
}

const ActivitySchema = new Schema<ActivityDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number, required: true },
  performedAt: { type: Date, default: Date.now }
});

const Activity = mongoose.model<ActivityDocument>('Activity', ActivitySchema);
export default Activity;
