import { Search, MapPin, Building2, Clock, Loader, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getJobs } from '../../api';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await getJobs();
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-[80vh] bg-slate-50">
      {/* Hero */}
      <div className="relative bg-primary py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5 }}
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" alt="Office" className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-blue-900/80"></div>
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">Kickstart your career with opportunities from top employers worldwide.</p>
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
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100 max-w-4xl mx-auto -mt-20 relative z-20">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="text-slate-400" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No Job Openings</h2>
            <p className="text-slate-500 max-w-md mx-auto">We don't have any job listings matching your search at the moment. Please check back again later.</p>
          </div>
        ) : (
          <>
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col lg:flex-row gap-4 mb-10 bg-white p-5 rounded-xl shadow-md border border-slate-100 -mt-20 relative z-20"
            >
              <div className="relative flex-1">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Job title, keywords, or company" className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <select className="px-4 py-3 border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:border-primary bg-white min-w-[150px]">
                <option>Job Type</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Internship</option>
                <option>Volunteer</option>
              </select>
              <button className="btn btn-primary px-8">Search</button>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Job List */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="flex-1 space-y-4"
              >
                <motion.h2 variants={variants} className="text-xl font-bold text-slate-800 mb-4 px-2">Latest Opportunities ({jobs.length})</motion.h2>
                {jobs.map((job) => (
                  <motion.div
                    key={job._id}
                    variants={variants}
                    className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/30 transition-all group flex flex-col sm:flex-row gap-6"
                  >
                    <div className="w-16 h-16 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 p-2 shrink-0 group-hover:scale-105 transition-transform">
                      {/* Fallback to text if logo fails */}
                      {job.image ? (
                        <img src={job.image} alt={job.company} className="w-full h-full object-contain rounded" />
                      ) : (
                        <div className="bg-gradient-to-br from-blue-100 to-blue-50 w-full h-full rounded flex items-center justify-center text-primary font-bold text-xl">
                          {job.company.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{job.title}</h3>
                          <p className="text-slate-500 font-medium">{job.company}</p>
                        </div>
                        <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded hidden sm:inline-block whitespace-nowrap">
                          {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500">
                        <div className="flex items-center gap-1"><MapPin size={14} /> {job.location}</div>
                        <div className="flex items-center gap-1"><Clock size={14} /> {job.type}</div>
                        <div className="flex items-center gap-1"><Building2 size={14} /> On-site</div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-end gap-4">
                        <Link to={`/jobs/${job._id}`} className="btn btn-secondary text-sm py-2">View Details</Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Sidebar Ad/Promo */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="lg:w-80 space-y-6"
              >
                {/* ... existing sidebar content ... */}
                <div className="bg-blue-900 text-white p-8 rounded-2xl relative overflow-hidden text-center">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-3">Upload Your Resume</h3>
                    <p className="text-blue-100 text-sm mb-6">Let employers find you! Create a profile and showcase your skills.</p>
                    <Link to="/student/register" className="btn bg-white text-primary w-full justify-center">Create Profile</Link>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-4">Top Hiring Sectors</h3>
                  <ul className="space-y-3">
                    {[
                      { name: 'Technology & IT', count: '120+' },
                      { name: 'Marketing & Sales', count: '85+' },
                      { name: 'Education', count: '50+' },
                      { name: 'Design', count: '45+' },
                      { name: 'Finance', count: '30+' },
                    ].map((cat, i) => (
                      <li key={i} className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">{cat.name}</span>
                        <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full text-xs">{cat.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Jobs;
