# CV-Improver: Resume Builder and Optimizer with AI Suggestions

**CV-Improver** is a web application that allows users to create, edit, and export resumes, while optimizing them for Applicant Tracking Systems (ATS) using AI-generated suggestions. The goal of this app is to help users increase their chances of passing through ATS filters by providing both general and personalized improvements based on the content of their resume.

## Features

- **Create and Edit Resumes**: Users can easily create, edit, and manage resumes through an intuitive interface.
- **AI Suggestions**: The app uses OpenAI's GPT model to provide both general and personalized tips to improve resume content and structure, focusing on ATS compatibility.
- **Export Resumes**: Users can export their resumes in PDF format after editing and optimizing them.
- **ATS Optimization**: AI-driven suggestions are designed to enhance keyword relevance, structure, and formatting for better ranking in ATS systems.
- **Personalized Feedback**: Based on specific job descriptions or overall resume content, AI suggestions include grammar improvements, keyword optimization, and content enhancement.

## Technologies Used

- **Frontend**:

  - [React](https://reactjs.org/)
  - [Next.js](https://nextjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Shadcn-UI](https://ui.shadcn.com/)
  - [Tailwind CSS](https://tailwindcss.com/)

- **Backend and Database**:

  - [Supabase](https://supabase.com/) for database and authentication
  - [Drizzle ORM](https://orm.drizzle.team/)

- **AI Integration**:
  - [OpenAI API](https://platform.openai.com/docs/overview) for generating resume improvement suggestions

## How It Works

1. **Resume Creation**: Users start by entering details for their resume using an intuitive drag-and-drop interface, allowing customization of text fields, formatting, and layout.

2. **AI Suggestions**:

   - Users can request general tips or personalized feedback based on job descriptions.
   - Suggestions include keyword optimization for ATS, grammatical corrections, and structure improvements.

3. **Export**: Once the resume is optimized, users can export it in PDF format, ready to be used in job applications.

## Project Setup

### Prerequisites

- Node.js (version 18 or higher)
- Supabase account for database setup
- OpenAI API key for generating AI suggestions

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/DominikKanjuh/FER-bachelor-thesis
   cd FER-bachelor-thesis
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory by copying the `.env.example`
   - Add the following variables:

     ```bash
        DATABASE_URL=
        NEXT_PUBLIC_SUPABASE_URL=
        NEXT_PUBLIC_SUPABASE_ANON_KEY=
        SERVICE_ROLE_KEY=
        PW=
        NEXT_PUBLIC_SITE_URL=
        OPENAI_API_KEY=
     ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open the app in your browser at `http://localhost:3000`.

### Deployment

- You can easily deploy this app using [Vercel](https://vercel.com/) (Next.js's deployment platform) or any other hosting service that supports Next.js.
- Supabase setup and API integration must be configured on the deployed environment.

## AI Suggestions Details

The AI integration is powered by the OpenAI API, specifically configured for providing feedback on:

- **ATS Compatibility**: Ensuring resume format is readable by ATS systems.
- **Keyword Optimization**: Adding industry-specific keywords relevant to job descriptions.
- **Content Enhancement**: Improving job descriptions, making experiences and achievements more impactful.
- **Grammar and Formatting**: Identifying and correcting grammatical mistakes and ensuring proper formatting.

### AI Prompt Configuration

[The prompt used for generating AI](./src/app/api/ai/route.ts) suggestions is located in the following file: `src/app/api/ai/route.ts`

## Full Thesis Paper

You can find [the full bachelor thesis](./paper-HR.pdf), written in Croatian, in the following file:

`./paper-HR.pdf`

The thesis provides an in-depth explanation of the problem, the solution, and the technologies used to develop **CV-Improver**, along with detailed analysis and results.
