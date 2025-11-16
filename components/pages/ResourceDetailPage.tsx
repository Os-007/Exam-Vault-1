
import React, { useState, useContext } from 'react';
import type { Resource, Comment } from '../../types';
import { AppContext } from '../../App';
import { summarizeContent } from '../../services/geminiService';
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageSquare, Download, BrainCircuit, Loader2, FileText, Notebook } from 'lucide-react';

const ResourceDetailPage: React.FC<{ resource: Resource }> = ({ resource }) => {
  const { user, setView } = useContext(AppContext);
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(resource.comments);

  const handleGenerateSummary = async () => {
    setIsSummarizing(true);
    setSummary('');
    const result = await summarizeContent(resource.contentForAI);
    setSummary(result);
    setIsSummarizing(false);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && user) {
      const comment: Comment = {
        id: `c-${Date.now()}`,
        author: user,
        text: newComment,
        timestamp: new Date().toISOString()
      };
      setComments(prev => [comment, ...prev]);
      setNewComment('');
    }
  };

  const InfoTag: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="bg-slate-100 p-3 rounded-lg">
      <p className="text-xs text-slate-500 font-medium">{label}</p>
      <p className="text-sm text-slate-800 font-semibold">{value}</p>
    </div>
  );

  return (
    <div>
      <button onClick={() => setView('dashboard')} className="flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-800 transition mb-6">
        <ArrowLeft size={20} />
        Back to all resources
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <span className={`flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full ${resource.type === 'Past Paper' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                {resource.type === 'Past Paper' ? <FileText size={16}/> : <Notebook size={16}/>}
                {resource.type}
              </span>
              <span className="text-sm font-bold text-slate-800 px-3 py-1 bg-slate-100 rounded-full">{resource.courseCode}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-slate-900">{resource.title}</h1>
            <p className="text-lg text-slate-600 mt-1">{resource.courseName}</p>
            <p className="text-sm text-slate-500 mt-4">{resource.description}</p>
            
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <InfoTag label="Year" value={resource.year} />
                <InfoTag label="Semester" value={resource.semester} />
                {resource.lecturer && <InfoTag label="Lecturer" value={resource.lecturer} />}
                {resource.examType && <InfoTag label="Exam Type" value={resource.examType} />}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4">AI Summary</h3>
              {!summary && !isSummarizing && (
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                    <BrainCircuit className="mx-auto h-12 w-12 text-slate-400" />
                    <p className="mt-2 text-slate-600">Get a quick overview of this document.</p>
                    <button onClick={handleGenerateSummary} className="mt-4 inline-flex items-center gap-2 bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700 transition">
                        <BrainCircuit size={18} />
                        Generate with Gemini
                    </button>
                </div>
              )}
              {isSummarizing && (
                 <div className="border border-slate-200 rounded-lg p-6 text-center">
                    <Loader2 className="mx-auto h-12 w-12 text-primary-500 animate-spin" />
                    <p className="mt-4 text-slate-600 font-medium">Gemini is thinking...</p>
                    <p className="text-sm text-slate-500">Generating a summary for you.</p>
                </div>
              )}
              {summary && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap font-sans">{summary}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <MessageSquare size={22}/>
                Discussion ({comments.length})
            </h3>
            <form onSubmit={handlePostComment} className="flex gap-4">
              <img src={user?.avatarUrl} alt={user?.name} className="w-10 h-10 rounded-full" />
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-grow px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition"
              />
              <button type="submit" className="bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-700 transition">Post</button>
            </form>
            <div className="mt-6 space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="flex gap-4">
                  <img src={comment.author.avatarUrl} alt={comment.author.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold text-slate-800">{comment.author.name}</p>
                    <p className="text-slate-600">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-24">
                <img src={resource.previewImageUrl} alt={resource.title} className="w-full h-80 object-cover rounded-lg mb-6" />
                
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 p-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition">
                            <ThumbsUp size={18} />
                            <span>{resource.upvotes}</span>
                        </button>
                        <button className="flex items-center gap-2 p-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition">
                            <ThumbsDown size={18} />
                            <span>{resource.downvotes}</span>
                        </button>
                    </div>
                     <a href={resource.fileUrl} download className="flex-grow flex items-center justify-center gap-2 bg-primary-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-700 transition">
                        <Download size={18} />
                        Download
                    </a>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200">
                    <p className="text-sm font-semibold text-slate-800 mb-3">Uploaded by</p>
                    <div className="flex items-center gap-3">
                        <img src={resource.author.avatarUrl} alt={resource.author.name} className="w-12 h-12 rounded-full" />
                        <div>
                            <p className="font-bold text-slate-900">{resource.author.name}</p>
                            <p className="text-xs text-slate-500">Joined on {new Date(resource.author.joinDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetailPage;
