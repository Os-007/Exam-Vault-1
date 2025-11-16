
import { User, Resource, ResourceType, Semester, ExamType, ForumPost } from './types';

export const mockUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex.j@unimy.edu.my',
  avatarUrl: 'https://picsum.photos/seed/alex/100/100',
  joinDate: '2023-01-15T10:00:00Z',
  bio: 'Computer Science student passionate about AI and web development.',
  points: 1250,
  uploadCount: 12,
};

const mockUser2: User = {
  id: 'user-2',
  name: 'Samantha Lee',
  email: 'sam.l@unimy.edu.my',
  avatarUrl: 'https://picsum.photos/seed/sam/100/100',
  joinDate: '2022-08-20T14:30:00Z',
  bio: 'Mechanical Engineering major. I love building things!',
  points: 850,
  uploadCount: 7,
};

export const mockResources: Resource[] = [
  {
    id: 'res-1',
    type: ResourceType.PastPaper,
    title: 'Advanced Algorithms Final Exam',
    courseCode: 'CS450',
    courseName: 'Advanced Algorithms',
    lecturer: 'Dr. Evelyn Reed',
    year: 2023,
    semester: Semester.Fall,
    examType: ExamType.Final,
    description: 'The final exam paper from Fall 2023. Covers dynamic programming, graph algorithms, and NP-completeness.',
    fileUrl: '#',
    previewImageUrl: 'https://picsum.photos/seed/algo-paper/400/500',
    author: mockUser,
    uploadDate: '2024-01-10T09:00:00Z',
    upvotes: 152,
    downvotes: 5,
    comments: [
        { id: 'c-1', author: mockUser2, text: 'This was a lifesaver, thank you!', timestamp: '2024-01-11T12:00:00Z' },
    ],
    contentForAI: `
    Advanced Algorithms Final Exam (CS450) - Fall 2023

    Instructions: Answer all four questions. Total time: 3 hours.

    Question 1: Dynamic Programming (25 points)
    Given a sequence of integers, find the length of the longest increasing subsequence. Provide an algorithm with O(n log n) time complexity.

    Question 2: Graph Algorithms (25 points)
    Consider a weighted, directed graph G = (V, E). Explain Dijkstra's algorithm for finding the shortest path from a single source vertex to all other vertices. Why does it not work for graphs with negative weight edges?

    Question 3: NP-Completeness (25 points)
    Prove that the Vertex Cover problem is NP-Complete. You may assume that the 3-SAT problem is NP-Complete.

    Question 4: Amortized Analysis (25 points)
    Analyze the amortized cost of operations on a dynamic table that doubles in size when it becomes full and halves in size when it is less than a quarter full.
    `
  },
  {
    id: 'res-2',
    type: ResourceType.Notes,
    title: 'Comprehensive Notes on Thermodynamics',
    courseCode: 'ME310',
    courseName: 'Thermodynamics I',
    year: 2024,
    semester: Semester.Spring,
    description: 'Detailed notes covering the first and second laws of thermodynamics, cycles, and entropy. Includes diagrams and example problems.',
    fileUrl: '#',
    previewImageUrl: 'https://picsum.photos/seed/thermo-notes/400/500',
    author: mockUser2,
    uploadDate: '2024-03-22T15:45:00Z',
    upvotes: 210,
    downvotes: 3,
    comments: [],
    contentForAI: `
    Thermodynamics I (ME310) - Chapter Summaries

    Chapter 1: Introduction & Basic Concepts
    - System, surroundings, boundary.
    - Closed, open, and isolated systems.
    - Properties of a system (intensive vs. extensive).
    - State and equilibrium.
    - Processes and cycles.

    Chapter 2: The First Law of Thermodynamics
    - Conservation of energy principle.
    - Energy transfer by heat, work, and mass.
    - First law for a closed system undergoing a cycle: E_in - E_out = dE_system.
    - Specific heats (constant volume and constant pressure).

    Chapter 3: The Second Law of Thermodynamics
    - Introduction to the second law.
    - Kelvin-Planck and Clausius statements.
    - Reversible and irreversible processes.
    - The Carnot cycle: The most efficient cycle operating between two specified temperature limits.

    Chapter 4: Entropy
    - The Clausius inequality.
    - Definition of entropy (S).
    - The increase of entropy principle: S_gen >= 0.
    - Isentropic processes.
    `
  },
    {
    id: 'res-3',
    type: ResourceType.PastPaper,
    title: 'Calculus II Midterm',
    courseCode: 'MATH102',
    courseName: 'Calculus II',
    lecturer: 'Prof. Alan Turing',
    year: 2024,
    semester: Semester.Spring,
    examType: ExamType.Midterm,
    description: 'Midterm exam covering integration techniques and applications of integration.',
    fileUrl: '#',
    previewImageUrl: 'https://picsum.photos/seed/calc-paper/400/500',
    author: mockUser,
    uploadDate: '2024-04-05T11:20:00Z',
    upvotes: 98,
    downvotes: 1,
    comments: [],
    contentForAI: `
    Calculus II Midterm Exam (MATH102) - Spring 2024

    Question 1: Integration by Parts
    Evaluate the integral of x * ln(x) dx.

    Question 2: Trigonometric Integrals
    Evaluate the integral of sin^3(x) * cos^2(x) dx.

    Question 3: Area Between Curves
    Find the area of the region enclosed by the parabolas y = x^2 and y = 2x - x^2.

    Question 4: Volume of Revolution
    Find the volume of the solid obtained by rotating the region bounded by y = sqrt(x), y=0, and x=4 about the x-axis.
    `
  }
];

export const mockForumPosts: ForumPost[] = [
  {
    id: 'post-1',
    title: 'Struggling with Dynamic Programming recurrence relations in CS450',
    author: mockUser,
    timestamp: '2024-05-10T14:00:00Z',
    courseCode: 'CS450',
    body: 'Hey everyone, I\'m having a hard time figuring out how to set up the recurrence relation for the "Longest Common Subsequence" problem. The textbook explanation is a bit confusing. Can anyone share a simpler way to think about it or a good resource?',
    tags: ['query', 'algorithms', 'studying'],
    upvotes: 42,
    replies: [
      { id: 'reply-1-1', author: mockUser2, text: 'I was stuck on this too! The key is to think about the two cases: either the last characters of the strings match, or they don\'t. If they match, you add 1 and solve for the strings without those last characters. If they don\'t, you take the max of the two subproblems where you exclude one of the last characters. Hope that helps!', timestamp: '2024-05-10T14:30:00Z', upvotes: 15 },
      { id: 'reply-1-2', author: mockUser, text: 'That actually makes so much sense. Thank you, Samantha! It\'s much clearer now.', timestamp: '2024-05-10T15:00:00Z', upvotes: 3 },
    ]
  },
  {
    id: 'post-2',
    title: 'Forming a study group for ME310 Thermodynamics Final',
    author: mockUser2,
    timestamp: '2024-05-12T11:25:00Z',
    courseCode: 'ME310',
    body: 'Hi all, the final for Thermo is coming up and I was wondering if anyone wants to form a study group. We could go over past papers and review the key cycles (Carnot, Rankine, etc.). I\'m thinking of booking a room in the library next Tuesday afternoon.',
    tags: ['studying', 'final-exam'],
    upvotes: 68,
    replies: []
  }
];
