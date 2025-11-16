
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  joinDate: string;
  bio: string;
  points: number;
  uploadCount: number;
}

export enum ResourceType {
  PastPaper = 'Past Paper',
  Notes = 'Notes',
}

export enum Semester {
  Fall = 'Fall',
  Spring = 'Spring',
  Summer = 'Summer',
}

export enum ExamType {
    Midterm = 'Midterm',
    Final = 'Final',
    Quiz = 'Quiz',
}

export interface Comment {
  id: string;
  author: User;
  text: string;
  timestamp: string;
}

export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  courseCode: string;
  courseName: string;
  lecturer?: string;
  year: number;
  semester: Semester;
  examType?: ExamType;
  description: string;
  fileUrl: string; // URL to PDF/image
  previewImageUrl: string; // URL for a thumbnail
  author: User;
  uploadDate: string;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  contentForAI: string; // Mock text content for Gemini
}

export interface ForumReply {
  id: string;
  author: User;
  text: string;
  timestamp: string;
  upvotes: number;
}

export interface ForumPost {
  id: string;
  title: string;
  author: User;
  timestamp: string;
  courseCode: string;
  body: string;
  tags: string[];
  upvotes: number;
  replies: ForumReply[];
}
