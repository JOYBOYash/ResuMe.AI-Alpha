import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ResumeAI - Personalized Resume Analysis",
  description: "Get AI-powered insights to improve your resume",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl flex mx-auto gap-2 items-center py-4 px-4 sm:px-6 lg:px-8">
            <img src="/resume.png" className="w-10 h-16"></img>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900">
                Resu<span className="text-indigo-600">Me.</span>AI
              </h1>
              <h2>Give your Resume a Glow Up!</h2>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              © 2024 Resu<span className="text-indigo-600">Me.</span>AI All
              rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
