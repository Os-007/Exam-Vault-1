
import React, { useState } from 'react';
import type { Resource } from '../types';
import { ResourceType, Semester, ExamType } from '../types';
import { X, UploadCloud } from 'lucide-react';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (resource: Omit<Resource, 'id' | 'author' | 'uploadDate' | 'upvotes' | 'downvotes' | 'comments'>) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUpload }) => {
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [type, setType] = useState<ResourceType>(ResourceType.PastPaper);
  const [year, setYear] = useState(new Date().getFullYear());
  const [semester, setSemester] = useState<Semester>(Semester.Fall);
  const [examType, setExamType] = useState<ExamType | undefined>(ExamType.Final);
  const [lecturer, setLecturer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newResource = {
      title,
      courseCode,
      courseName,
      type,
      year,
      semester,
      examType: type === ResourceType.PastPaper ? examType : undefined,
      lecturer: type === ResourceType.PastPaper ? lecturer : undefined,
      description: 'A newly uploaded resource.',
      fileUrl: '#',
      previewImageUrl: `https://picsum.photos/seed/${Date.now()}/400/500`,
      contentForAI: 'This is a placeholder content for the newly uploaded file. In a real application, text would be extracted from the PDF or image file.'
    };
    onUpload(newResource);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">Upload a New Resource</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100">
            <X size={24} className="text-slate-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-600 mb-2">Resource Type</label>
              <select value={type} onChange={e => setType(e.target.value as ResourceType)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition">
                <option value={ResourceType.PastPaper}>Past Paper</option>
                <option value={ResourceType.Notes}>Notes</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-600 mb-2">Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Course Code</label>
              <input type="text" value={courseCode} onChange={e => setCourseCode(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Course Name</label>
              <input type="text" value={courseName} onChange={e => setCourseName(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Year</label>
              <input type="number" value={year} onChange={e => setYear(parseInt(e.target.value, 10))} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Semester</label>
              <select value={semester} onChange={e => setSemester(e.target.value as Semester)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition">
                {Object.values(Semester).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            {type === ResourceType.PastPaper && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">Exam Type</label>
                  <select value={examType} onChange={e => setExamType(e.target.value as ExamType)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition">
                    {Object.values(ExamType).map(et => <option key={et} value={et}>{et}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">Lecturer (Optional)</label>
                  <input type="text" value={lecturer} onChange={e => setLecturer(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition" />
                </div>
              </>
            )}
            <div className="col-span-2 mt-4">
              <label className="block text-sm font-medium text-slate-600 mb-2">File Upload</label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-900/25 px-6 py-10">
                <div className="text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-slate-400" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-slate-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-slate-600">PDF, PNG, JPG up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-slate-100 text-slate-700 font-bold py-2 px-6 rounded-lg hover:bg-slate-200 transition">
              Cancel
            </button>
            <button type="submit" className="bg-primary-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-700 transition">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
