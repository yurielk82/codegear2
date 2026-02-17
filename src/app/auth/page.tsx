"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Code Gear Admin</CardTitle>
          <p className="text-muted-foreground mt-2">관리자 계정으로 로그인하세요</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm dark:bg-red-950 dark:text-red-400">
              {error === "AccessDenied" ? "관리자 권한이 없는 계정입니다." : "로그인 중 오류가 발생했습니다."}
            </div>
          )}
          <Button onClick={() => signIn("google", { callbackUrl: "/admin" })} className="w-full" size="lg">
            Google로 로그인
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
