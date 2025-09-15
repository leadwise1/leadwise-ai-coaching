'use server'

import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';

// This is a simple mock implementation that streams back a response
// In a real application, this would connect to an AI service like OpenAI or Anthropic
export async function POST(req: NextRequest) {
  try {
    const { jobDescription, userProfile } = await req.json();
    
    // Validate input
    if (!jobDescription) {
      return NextResponse.json({ error: 'Job description is required' }, { status: 400 });
    }

    // Create a readable stream to simulate streaming response
    const encoder = new TextEncoder();
    let counter = 0;

    // Determine what type of content to generate based on the request
    const isResume = jobDescription.includes('create a tailored resume');
    
    // Prepare mock responses
    const resumeContent = `
# JOHN DOE
Frontend Developer | john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe

## PROFESSIONAL SUMMARY
Frontend Developer with 6 years of experience specializing in React, TypeScript, and Next.js. Proven track record of developing responsive, high-performance web applications with modern frontend tools and best practices.

## SKILLS
- **Languages**: TypeScript, JavaScript, HTML5, CSS3
- **Frameworks/Libraries**: React, Next.js, Redux
- **State Management**: Redux, Context API
- **UI/UX**: Responsive Design, Material UI, Tailwind CSS
- **Performance Optimization**: Code splitting, Lazy loading, Bundle optimization
- **Tools**: Git, Webpack, Jest, React Testing Library

## EXPERIENCE

### SENIOR FRONTEND DEVELOPER
**Tech Solutions Inc.** | 2020-Present
- Led development of responsive web applications using React and Next.js, improving user engagement by 35%
- Implemented TypeScript across legacy codebase, reducing bugs by 40% and improving code maintainability
- Optimized application performance, reducing load time by 60% through code splitting and lazy loading
- Mentored junior developers and conducted code reviews to ensure code quality and best practices
- Collaborated with backend team to design and integrate RESTful APIs and GraphQL endpoints

### FRONTEND DEVELOPER
**WebApp Co.** | 2018-2020
- Developed and maintained multiple React applications with Redux state management
- Created reusable component libraries that reduced development time by 25%
- Implemented responsive designs ensuring cross-browser compatibility
- Participated in Agile development processes, including daily stand-ups and sprint planning

### JUNIOR DEVELOPER
**StartUp Ltd.** | 2016-2018
- Assisted in frontend development using JavaScript and jQuery
- Converted design mockups to functional web interfaces
- Collaborated with designers to implement UI improvements
- Gained initial experience with React and modern JavaScript

## EDUCATION
**Bachelor of Science in Computer Science**
Tech University | 2016
`;

    const coverLetterContent = `
John Doe
Frontend Developer
(555) 123-4567
john.doe@email.com
linkedin.com/in/johndoe

[Current Date]

Hiring Manager
TechCorp
123 Tech Lane
San Francisco, CA 94105

Dear Hiring Manager,

I am writing to express my interest in the Senior Frontend Developer position at TechCorp. With 6 years of experience in frontend development, specializing in React, Next.js, and TypeScript, I am confident that my skills and expertise align perfectly with the requirements outlined in your job posting.

Throughout my career, I have focused on building responsive, high-performance web applications that deliver exceptional user experiences. In my current role as Senior Frontend Developer at Tech Solutions Inc., I have:

- Led the development of multiple React/Next.js applications, improving user engagement metrics by 35%
- Implemented TypeScript across a legacy JavaScript codebase, reducing bugs by 40%
- Optimized application performance through code splitting and lazy loading techniques, resulting in a 60% reduction in load time
- Mentored junior developers and established coding standards and best practices

Your requirement for 5+ years of JavaScript/TypeScript experience and 3+ years of React experience is a perfect match for my background. I am particularly excited about the opportunity to work with your team on optimizing applications for maximum speed and scalability, as this has been a key focus area in my recent work.

I am passionate about writing clean, maintainable code and staying current with the latest frontend technologies and best practices. I believe my combination of technical skills, leadership experience, and collaborative approach would make me a valuable addition to your team.

I would welcome the opportunity to discuss how my background and skills would benefit TechCorp. Thank you for considering my application, and I look forward to speaking with you soon.

Sincerely,

John Doe
`;

    const content = isResume ? resumeContent : coverLetterContent;
    
    // Create a stream of the content, word by word with delays
    const stream = new ReadableStream({
      async start(controller) {
        const words = content.split(' ');
        
        for (const word of words) {
          // Add the word to the stream
          controller.enqueue(encoder.encode(word + ' '));
          
          // Add a small delay between words to simulate typing/generation
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        controller.close();
      }
    });

    return new Response(stream);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}