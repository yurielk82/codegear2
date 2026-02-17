"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

type NoticeCategory = "채용" | "공지" | "뉴스";

export interface NoticeFormData {
  category: NoticeCategory;
  title: string;
  content: string;
  date: string;
  is_published: boolean;
}

interface NoticeFormProps {
  defaultValues?: NoticeFormData;
  onSubmit: (data: NoticeFormData) => void;
  submitLabel: string;
}

export function NoticeForm({
  defaultValues,
  onSubmit,
  submitLabel,
}: NoticeFormProps) {
  const router = useRouter();

  const [category, setCategory] = useState<NoticeCategory>(
    defaultValues?.category ?? "채용"
  );
  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [content, setContent] = useState(defaultValues?.content ?? "");
  const [date, setDate] = useState(
    defaultValues?.date ?? new Date().toISOString().slice(0, 10)
  );
  const [isPublished, setIsPublished] = useState(
    defaultValues?.is_published ?? true
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      window.alert("제목을 입력해 주세요.");
      return;
    }
    if (!content.trim()) {
      window.alert("내용을 입력해 주세요.");
      return;
    }

    onSubmit({ category, title, content, date, is_published: isPublished });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="space-y-6">
          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">분류</Label>
            <Select
              value={category}
              onValueChange={(v) => setCategory(v as NoticeCategory)}
            >
              <SelectTrigger id="category" className="w-full sm:w-[200px]">
                <SelectValue placeholder="분류 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="채용">채용</SelectItem>
                <SelectItem value="공지">공지</SelectItem>
                <SelectItem value="뉴스">뉴스</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="공고 제목을 입력하세요"
              required
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">내용</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="공고 내용을 입력하세요"
              rows={10}
              required
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">등록일</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full sm:w-[200px]"
              required
            />
          </div>

          {/* Published toggle */}
          <div className="flex items-center gap-3">
            <Switch
              id="published"
              checked={isPublished}
              onCheckedChange={setIsPublished}
            />
            <Label htmlFor="published" className="cursor-pointer">
              발행 여부
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-3">
        <Button type="submit">{submitLabel}</Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/notices")}
        >
          취소
        </Button>
      </div>
    </form>
  );
}
