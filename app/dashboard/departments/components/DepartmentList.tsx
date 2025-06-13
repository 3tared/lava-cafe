// app/departments/components/DepartmentList.tsx
"use client";

import { Department } from "@/types";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DepartmentListProps {
  departments: Department[];
}

export default function DepartmentList({ departments }: DepartmentListProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  if (departments.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No departments found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {departments.map((department) => (
        <Card
          key={department.id}
          className="hover:bg-slate-50 transition-colors"
        >
          <CardHeader className="pb-2">
            <CardTitle>{department.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {department.description && (
              <p className="text-sm mb-2">{department.description}</p>
            )}
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>
                Created{" "}
                {formatDistanceToNow(new Date(department.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
