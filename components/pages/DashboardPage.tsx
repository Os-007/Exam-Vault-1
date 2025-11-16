
import React, { useState, useContext, useMemo } from 'react';
import { AppContext } from '../../App';
import type { Resource } from '../../types';
import { ResourceType } from '../../types';
import ResourceCard from '../ResourceCard';
import { Search, SlidersHorizontal, FileText, Notebook } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { resources, setView } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<Set<ResourceType>>(new Set());

  const toggleFilter = (filter: ResourceType) => {
    setActiveFilters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(filter)) {
        newSet.delete(filter);
      } else {
        newSet.add(filter);
      }
      return newSet;
    });
  };

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.courseName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = activeFilters.size === 0 || activeFilters.has(resource.type);

      return matchesSearch && matchesFilter;
    });
  }, [resources, searchTerm, activeFilters]);

  return (
    <div>
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Welcome to ExamVault</h1>
        <p className="text-slate-600 mt-2">Find past papers, study notes, and more to ace your exams.</p>
        
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, course code, or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition font-medium">
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>
            <button 
              onClick={() => toggleFilter(ResourceType.PastPaper)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition font-medium ${activeFilters.has(ResourceType.PastPaper) ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              <FileText className="w-5 h-5" />
              <span>Papers</span>
            </button>
            <button 
              onClick={() => toggleFilter(ResourceType.Notes)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition font-medium ${activeFilters.has(ResourceType.Notes) ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              <Notebook className="w-5 h-5" />
              <span>Notes</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredResources.length > 0 ? (
            filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} onSelect={() => setView('resourceDetail', resource.id)} />
            ))
        ) : (
            <div className="col-span-full text-center py-16">
                <p className="text-slate-500">No resources found. Try adjusting your search or filters.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
