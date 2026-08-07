import mongoose, { Schema, Document } from 'mongoose';

export interface LeaderboardEntryDocument extends Document {
  user: mongoose.Types.ObjectId;
  score: number;
  rank: number;
  updatedAt: Date;
}

const LeaderboardEntrySchema = new Schema<LeaderboardEntryDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const LeaderboardEntry = mongoose.model<LeaderboardEntryDocument>('LeaderboardEntry', LeaderboardEntrySchema);
export default LeaderboardEntry;
