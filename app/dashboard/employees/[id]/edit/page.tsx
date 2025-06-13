// app/employees/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getEmployeeById } from "@/lib/actions/employees";
import { getDepartments } from "@/lib/actions/departments";
import EmployeeForm from "../../components/EmployeeForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function EditEmployeePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const [employeeResponse, departmentsResponse] = await Promise.all([
    getEmployeeById(id),
    getDepartments(),
  ]);

  if (!employeeResponse.success || !employeeResponse.data) {
    notFound();
  }

  const departments = departmentsResponse.success
    ? departmentsResponse.data
    : [];

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href={`/dashboard/employees/${id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Employee Details
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Edit Employee: {employeeResponse.data.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmployeeForm
            initialData={{
              ...employeeResponse.data,
              department: employeeResponse.data.department || undefined,
              status: employeeResponse.data.status as
                | "Active"
                | "On Leave"
                | "Inactive",
            }}
            departments={departments || []}
            isEditing={true}
          />
        </CardContent>
      </Card>
    </div>
  );
}
