'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import api from '../../../lib/axios';
import { useAuthStore } from '../../../store/useAuthStore';
import { useParams, useRouter } from 'next/navigation';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TakeExamPage() {
  const { exam_id } = useParams();
  const { user } = useAuthStore();
  const router = useRouter();
  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchExam();
  }, [exam_id]);

  const fetchExam = async () => {
    try {
      const response = await api.get(`/exams?id=${exam_id}`);
      const foundExam = response.data.find((e: any) => e.id === exam_id);
      if (foundExam) {
        setExam(foundExam);
      }
    } catch (error) {
      console.error('Failed to fetch exam:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (question_id: string, answer: string) => {
    const existing = answers.find(a => a.question_id === question_id);
    if (existing) {
      setAnswers(answers.map(a => a.question_id === question_id ? { ...a, answer } : a));
    } else {
      setAnswers([...answers, { question_id, answer }]);
    }
  };

  const handleSubmit = async () => {
    if (!confirm('Are you sure you want to submit your exam?')) return;
    setSubmitting(true);
    try {
      const response = await api.post(`/results/${exam_id}/submit`, { answers });
      setResult(response.data.result);
    } catch (error) {
      console.error('Failed to submit exam:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <DashboardLayout><div className="p-8">Loading exam...</div></DashboardLayout>;
  if (!exam) return <DashboardLayout><div className="p-8">Exam not found</div></DashboardLayout>;

  if (result) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto mt-12 text-center p-8 border rounded-xl bg-card shadow-sm">
          <CheckCircle2 className={`w-16 h-16 mx-auto mb-4 ${result.status === 'PASS' ? 'text-green-500' : 'text-red-500'}`} />
          <h1 className="text-3xl font-bold mb-2">Exam Submitted</h1>
          <p className="text-lg text-muted-foreground mb-6">You have completed {exam.title}</p>
          
          <div className="bg-muted p-6 rounded-lg mb-8 inline-block">
            <div className="text-sm text-muted-foreground mb-1">Your Score</div>
            <div className="text-4xl font-bold">{result.percentage.toFixed(1)}%</div>
            <div className={`mt-2 font-semibold ${result.status === 'PASS' ? 'text-green-500' : 'text-red-500'}`}>
              {result.status}
            </div>
          </div>

          <div>
            <Link href={`/courses/${exam.course_id}`} className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
              Return to Course
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <Link href={`/courses/${exam.course_id}`} className="p-2 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{exam.title}</h1>
            <p className="text-sm text-muted-foreground">Duration: {exam.duration} minutes • Passing mark: {exam.passing_mark}%</p>
          </div>
        </div>

        <div className="space-y-6">
          {exam.questions?.length === 0 ? (
            <div className="text-center p-12 border bg-card rounded-xl text-muted-foreground">
              This exam has no questions yet.
            </div>
          ) : (
            exam.questions?.map((q: any, index: number) => {
              const options = q.options ? JSON.parse(q.options) : ['True', 'False'];
              const selectedAnswer = answers.find(a => a.question_id === q.id)?.answer;

              return (
                <div key={q.id} className="bg-card border rounded-xl p-6 shadow-sm">
                  <div className="font-medium text-sm text-muted-foreground mb-2">Question {index + 1} ({q.marks} marks)</div>
                  <h3 className="text-lg font-semibold mb-4">{q.question_text}</h3>
                  
                  <div className="space-y-3">
                    {options.map((opt: string, i: number) => (
                      <label key={i} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${selectedAnswer === opt ? 'bg-primary/10 border-primary' : 'hover:bg-muted'}`}>
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={opt}
                          checked={selectedAnswer === opt}
                          onChange={() => handleOptionSelect(q.id, opt)}
                          className="mr-3 w-4 h-4 text-primary focus:ring-primary"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {exam.questions?.length > 0 && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={submitting || answers.length < exam.questions.length}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Exam'}
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
