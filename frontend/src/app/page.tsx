import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center sm:p-20">
      <main className="flex flex-col gap-8 items-center max-w-2xl">
        <h1 className="text-5xl font-bold text-primary tracking-tight">
          Welcome to LMS
        </h1>
        <p className="text-lg text-muted-foreground">
          A modern full-stack E-Learning Management System. Access courses, watch videos, and take exams seamlessly.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
          <Link
            href="/login"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-primary text-primary-foreground gap-2 hover:bg-primary/90 text-sm sm:text-base h-10 sm:h-12 px-8"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="rounded-full border border-solid border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center text-sm sm:text-base h-10 sm:h-12 px-8"
          >
            Create an Account
          </Link>
        </div>
      </main>
    </div>
  );
}
