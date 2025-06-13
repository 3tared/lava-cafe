// app/employees/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import { getEmployees } from "@/lib/actions/employees";
import { Employee } from "@/types";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmployeeList from "@/components/EmployeeList/EmployeeList";

export default async function EmployeesPage() {
  const { success, data: employees, error } = await getEmployees();

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Employees</CardTitle>
          <Button asChild>
            <Link href="/dashboard/employees/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Employee
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading employees...</div>}>
            {success && employees ? (
              <EmployeeList employees={employees as Employee[]} />
            ) : (
              <div className="flex flex-col items-center justify-center p-8">
                <p className="text-muted-foreground">
                  {error || "Failed to load employees"}
                </p>
              </div>
            )}
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
