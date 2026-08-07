import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Workout from '../models/workout';
import LeaderboardEntry from '../models/leaderboard';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      LeaderboardEntry.deleteMany({})
    ]);

    const users = await User.create([
      { name: 'Ava Morgan', email: 'ava.morgan@octofit.com', passwordHash: 'hashed-password-1', role: 'user' },
      { name: 'Noah Patel', email: 'noah.patel@octofit.com', passwordHash: 'hashed-password-2', role: 'user' },
      { name: 'Mia Chen', email: 'mia.chen@octofit.com', passwordHash: 'hashed-password-3', role: 'admin' }
    ]);

    const workouts = await Workout.create([
      { name: 'Morning Burn', description: 'A fast-paced cardio circuit to kickstart the day.', difficulty: 'beginner', durationMinutes: 25 },
      { name: 'Strength Surge', description: 'A compound strength routine for full-body power gains.', difficulty: 'intermediate', durationMinutes: 45 },
      { name: 'Endurance Builder', description: 'Long-form endurance training to improve stamina.', difficulty: 'advanced', durationMinutes: 60 }
    ]);

    const teams = await Team.create([
      { name: 'Team Phoenix', members: [users[0]._id, users[1]._id] },
      { name: 'Team Summit', members: [users[2]._id] }
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'Running', durationMinutes: 30, calories: 320, performedAt: new Date() },
      { user: users[1]._id, type: 'Cycling', durationMinutes: 45, calories: 420, performedAt: new Date() },
      { user: users[2]._id, type: 'Weight Training', durationMinutes: 50, calories: 500, performedAt: new Date() }
    ]);

    await LeaderboardEntry.create([
      { user: users[2]._id, score: 9750, rank: 1 },
      { user: users[0]._id, score: 8600, rank: 2 },
      { user: users[1]._id, score: 7800, rank: 3 }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
