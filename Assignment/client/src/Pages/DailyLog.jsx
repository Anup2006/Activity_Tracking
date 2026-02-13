import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity, deleteActivity } from '../redux/activitySlice';
import { ActivityCard } from '../components/ActivityCard';
import { toast } from 'sonner';

export default function DailyLog() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities.activities);

  const [activityName, setActivityName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('Work');
  const [focusedField, setFocusedField] = useState(null);

  // Get today's activities
  const today = new Date().toISOString().split('T')[0];
  const todayActivities = activities.filter(
    (activity) => activity.date === today
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!activityName.trim()) {
      toast.error('Please enter an activity name');
      return;
    }

    if (!duration || parseInt(duration) <= 0) {
      toast.error('Please enter a valid duration');
      return;
    }

    dispatch(
      addActivity({
        name: activityName,
        duration: parseInt(duration),
        category,
        date: today,
      })
    );

    toast.success('Activity added!');
    setActivityName('');
    setDuration('');
    setCategory('Work');
  };

  const handleDelete = (id) => {
    dispatch(deleteActivity(id));
    toast.success('Activity deleted');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl mb-2">Daily Log</h1>
        <p className="text-gray-500 mb-8">
          Track your activities for today
        </p>

        {/* Add Activity Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] mb-8"
        >
          <h2 className="text-xl mb-6">Add New Activity</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Same form UI as before */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Activity Name"
              />

              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Duration (minutes)"
                min="1"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Work">Work</option>
              <option value="Study">Study</option>
              <option value="Exercise">Exercise</option>
              <option value="Break">Break</option>
            </select>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Activity
            </motion.button>
          </form>
        </motion.div>

        {/* Activities List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl mb-4">Today's Activities</h2>

          {todayActivities.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow">
              <p className="text-gray-400">
                No activities logged yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {todayActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onDelete={handleDelete}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
