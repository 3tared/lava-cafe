// app/employees/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EmployeeNotFound() {
  return (
    <div className="container mx-auto py-16 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Employee Not Found</h1>
      <p className="text-muted-foreground mb-8">
        The employee you are looking for does not exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/dashboard/employees">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Employees List
        </Link>
      </Button>
    </div>
  );
}
