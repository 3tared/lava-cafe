// app/employees/new/page.tsx
import Link from "next/link";
import { getDepartments } from "@/lib/actions/departments";
import EmployeeForm from "../components/EmployeeForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function NewEmployeePage() {
  const { data: departments = [] } = await getDepartments();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/dashboard/employees">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Employees
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Employee</CardTitle>
        </CardHeader>
        <CardContent>
          <EmployeeForm departments={departments} />
        </CardContent>
      </Card>
    </div>
  );
}
