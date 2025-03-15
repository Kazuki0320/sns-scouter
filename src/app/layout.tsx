"use client";

import Form from "@/components/Form";
import { useRouter } from "next/navigation";
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/start");
  };
  return (
    <html lang="en">
          <main className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-3xl font-bold mb-6 text-blue-500">SNSスカウター</h1>
            <Form onSubmit={handleSubmit} />
          </main>
        <p>root layout</p>
        {children}
    </html>
  );
}
