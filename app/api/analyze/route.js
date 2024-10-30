import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

async function analyzeResumeWithGemini(fileContent, targetJob) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Analyze the following resume for a ${targetJob} position. Provide a comprehensive analysis including:
    1. An overall score out of 10
    2. A brief summary of the resume's strengths and weaknesses
    3. A list of 3-5 key strengths
    4. A list of 3-5 areas for improvement
    5. A list of 3-5 specific recommendations for improving the resume

    Resume content:
    ${fileContent}

    Please format the response as a JSON object with the following structure:
    {
      "overallScore": 0,
      "summary": "...",
      "strengths": ["...", "..."],
      "areasForImprovement": ["...", "..."],
      "recommendations": ["...", "..."]
    }
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const analysisText = response.text();

  return JSON.parse(analysisText);
}

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  const targetJob = formData.get("targetJob");

  if (!file || !targetJob) {
    return NextResponse.json(
      { error: "File and target job are required" },
      { status: 400 }
    );
  }

  if (file.size > 10 * 1024 * 1024) {
    // 10MB limit
    return NextResponse.json(
      { error: "File size exceeds 10MB limit" },
      { status: 400 }
    );
  }

  try {
    const fileContent = await file.text();
    const analysis = await analyzeResumeWithGemini(fileContent, targetJob);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume. Please try again later." },
      { status: 500 }
    );
  }
}
