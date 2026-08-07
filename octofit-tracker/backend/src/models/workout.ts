import mongoose, { Schema, Document } from 'mongoose';

export interface WorkoutDocument extends Document {
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  createdAt: Date;
}

const WorkoutSchema = new Schema<WorkoutDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  durationMinutes: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Workout = mongoose.model<WorkoutDocument>('Workout', WorkoutSchema);
export default Workout;
