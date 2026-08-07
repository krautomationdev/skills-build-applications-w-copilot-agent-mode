import mongoose, { Schema, Document } from 'mongoose';

export interface TeamDocument extends Document {
  name: string;
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const TeamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

const Team = mongoose.model<TeamDocument>('Team', TeamSchema);
export default Team;
