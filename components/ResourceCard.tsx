
import React from 'react';
import type { Resource } from '../types';
import { ThumbsUp, MessageSquare, FileText, Notebook } from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
  onSelect: () => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onSelect }) => {
  return (
    <div 
        onClick={onSelect}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
    >
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={resource.previewImageUrl}
          alt={resource.title}
        />
        <div className={`absolute top-3 right-3 flex items-center gap-2 text-xs font-semibold px-2 py-1 rounded-full ${resource.type === 'Past Paper' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
          {resource.type === 'Past Paper' ? <FileText size={14}/> : <Notebook size={14}/>}
          {resource.type}
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm font-bold text-primary-600">{resource.courseCode}</p>
        <h3 className="text-lg font-bold text-slate-800 mt-1 truncate group-hover:text-primary-700 transition">
          {resource.title}
        </h3>
        <p className="text-sm text-slate-500 mt-1">{resource.courseName}</p>
        <div className="flex items-center justify-between mt-4 text-sm text-slate-600">
          <div className="flex items-center gap-1">
            <img src={resource.author.avatarUrl} alt={resource.author.name} className="w-6 h-6 rounded-full" />
            <span>{resource.author.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <ThumbsUp size={16} />
              {resource.upvotes}
            </span>
            <span className="flex items-center gap-1.5">
              <MessageSquare size={16} />
              {resource.comments.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
