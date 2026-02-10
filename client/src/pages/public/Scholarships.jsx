import { Search, GraduationCap, Loader, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getScholarships } from '../../api';

const Scholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const { data } = await getScholarships();
        if (Array.isArray(data)) {
          setScholarships(data);
        } else {
          setScholarships([]);
        }
      } catch (error) {
        console.error("Failed to fetch scholarships", error);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarships();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-[80vh] bg-slate-50">
      <div className="bg-primary py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5 }}
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" alt="University" className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent"></div>
        <div className="container-custom relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4"
          >
            Scholarships & Grants
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Don't let finances hold you back. Discover millions in financial aid.
          </motion.p>
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
        ) : scholarships.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100 -mt-24 relative z-20">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="text-slate-400" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No Scholarships Found</h2>
            <p className="text-slate-500 max-w-md mx-auto">We couldn't find any scholarships available right now. Please check back soon.</p>
          </div>
        ) : (
          <>
            {/* Search & Stats */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12 -mt-24 relative z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-slate-100"
              >
                <div className="relative">
                  <Search size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Search scholarships by name, major, or provider..." className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-lg" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-secondary to-amber-600 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-center items-center text-center"
              >
                <GraduationCap size={40} className="mb-2 opacity-90" />
                <div className="text-3xl font-bold mb-1">{scholarships.length}+</div>
                <div className="text-amber-100 text-sm font-medium">Available Opportunities</div>
              </motion.div>
            </div>

            <motion.div
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
              className="grid md:grid-cols-2 gap-6"
            >
              {scholarships.map((item) => (
                <motion.div
                  key={item._id}
                  variants={fadeInUp}
                  className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-[4rem] -mr-4 -mt-4 z-0 group-hover:bg-blue-100 transition-colors"></div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">{item.category || 'General'}</span>
                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-semibold mb-1">DEADLINE</p>
                        <p className="text-sm font-bold text-slate-700">
                          {item.deadline ? new Date(item.deadline).toLocaleDateString() : 'Ongoing'}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-slate-500 text-sm mb-4">Provided by <span className="font-semibold text-slate-700">{item.provider || 'Sponsor'}</span></p>

                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
                      <div>
                        <p className="text-xs text-slate-400 font-semibold mb-0.5">AWARD AMOUNT</p>
                        <p className="text-2xl font-bold text-secondary">{item.amount}</p>
                      </div>
                      <div className="flex gap-3">
                        <Link to={`/scholarships/${item._id}`} className="btn btn-secondary px-6">View Details</Link>
                      </div>
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

export default Scholarships;
