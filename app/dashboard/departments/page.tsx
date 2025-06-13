// app/departments/page.tsx
import { Suspense } from "react";
import { getDepartments } from "@/lib/actions/departments";
import { Department } from "@/types";
import DepartmentList from "./components/DepartmentList";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateDepartmentForm from "./components/CreateDepartmentForm";

export default async function DepartmentsPage() {
  const { success, data: departments, error } = await getDepartments();

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading departments...</div>}>
                {success && departments ? (
                  <DepartmentList departments={departments as Department[]} />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8">
                    <p className="text-muted-foreground">
                      {error || "Failed to load departments"}
                    </p>
                  </div>
                )}
              </Suspense>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Add Department
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CreateDepartmentForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
