"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const NAME_MIN = 2;
const NAME_MAX = 50;
const MSG_MIN = 10;
const MSG_MAX = 2000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

const contactSchema = z.object({
  name: z.string().min(NAME_MIN, "이름은 2~50자로 입력해주세요").max(NAME_MAX, "이름은 2~50자로 입력해주세요"),
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  message: z.string().min(MSG_MIN, "메시지는 10~2000자로 입력해주세요").max(MSG_MAX, "메시지는 10~2000자로 입력해주세요"),
});

export type ContactFormState = { success: boolean; error?: string; errors?: Record<string, string[]> };

/* ── 인메모리 Rate Limiter (서버리스 인스턴스별) ── */
const submissions = new Map<string, number[]>();

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const timestamps = (submissions.get(email) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  timestamps.push(now);
  submissions.set(email, timestamps);
  return false;
}

export async function submitContactForm(_prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const result = contactSchema.safeParse({
    name: (formData.get("name") ?? "") as string,
    email: (formData.get("email") ?? "") as string,
    message: (formData.get("message") ?? "") as string,
  });

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  if (isRateLimited(result.data.email)) {
    return { success: false, error: "너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요." };
  }

  try {
    await prisma.contactInquiry.create({ data: result.data });
    return { success: true };
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return { success: false, error: "문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요." };
  }
}
