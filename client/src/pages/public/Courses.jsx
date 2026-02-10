import { Search, BookOpen, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getCourses } from '../../api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await getCourses();
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          console.error("Data received is not an array:", data);
          setCourses([]);
        }
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const stagger = {
    initial: {},
    animate: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-[80vh] bg-slate-50">
      {/* Hero */}
      <div className="bg-primary py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5 }}
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" alt="Students learning" className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-primary/90"></div>
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/30">Never Stop Learning</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Explore Our Course Catalog</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">Master in-demand skills with our expert-led, free courses.</p>
          </motion.div>
        </div>
      </div>

      <div className="py-12 container-custom">
        {loading ? (
          <div className="flex justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Loader className="text-primary" size={48} />
            </motion.div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="text-slate-400" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No Courses Available Yet</h2>
            <p className="text-slate-500 max-w-md mx-auto">We are currently curating the best learning content for you. Please check back later for new courses.</p>
          </div>
        ) : (
          <>
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col md:flex-row gap-4 mb-10 bg-white p-4 rounded-xl shadow-lg border border-slate-100 -mt-20 relative z-20"
            >
              <div className="relative flex-1">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="What do you want to learn?" className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <select className="px-4 py-3 border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:border-primary bg-white min-w-[150px]">
                <option>All Categories</option>
                <option>Programming</option>
                <option>Design</option>
                <option>Business</option>
              </select>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {courses.map((course) => (
                <motion.div
                  key={course._id}
                  variants={fadeInUp}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wide">
                      {course.category || 'Education'}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">{course.title}</h3>

                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-medium">{course.skillLevel || 'Beginner'}</span>
                      <span>{course.duration || 'Self-paced'}</span>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 font-bold">{course.rating || 4.5}</span>
                        <span className="text-slate-400 text-xs">({course.studentsEnrolled || 0})</span>
                      </div>
                      <Link to={`/courses/${course._id}`} className="font-semibold text-primary text-sm hover:underline">View Details</Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Courses;
