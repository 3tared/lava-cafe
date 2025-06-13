// app/employees/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { getEmployeeById } from "@/lib/actions/employees";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PencilIcon } from "lucide-react";

export default async function EmployeeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { success, data: employee } = await getEmployeeById(id);

  if (!success || !employee) {
    notFound();
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "On Leave":
        return "bg-yellow-500";
      case "Inactive":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/dashboard/employees">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Employees
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/employees/${id}/edit`}>
            <PencilIcon className="mr-2 h-4 w-4" />
            Edit Employee
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Employee Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              {employee.imageUrl ? (
                <Image
                  src={employee.imageUrl}
                  alt={employee.name}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="w-48 h-48 rounded-lg bg-gray-200 flex items-center justify-center">
                  <span className="text-5xl font-medium text-gray-600">
                    {employee.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-grow space-y-6">
              <div>
                <h2 className="text-3xl font-bold">{employee.name}</h2>
                <p className="text-lg text-muted-foreground">
                  {employee.position}
                </p>
                <div className="mt-2">
                  <Badge
                    className={getStatusColor(employee.status)}
                    variant="outline"
                  >
                    {employee.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Department
                  </h3>
                  <p>{employee.department?.title || "—"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Start Date
                  </h3>
                  <p>{format(new Date(employee.startDate), "PP")}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Email
                  </h3>
                  <p>{employee.email || "—"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Phone
                  </h3>
                  <p>{employee.phone || "—"}</p>
                </div>
              </div>

              {employee.bio && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Bio
                  </h3>
                  <p className="mt-1">{employee.bio}</p>
                </div>
              )}

              {employee.funFact && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Fun Fact
                  </h3>
                  <p className="mt-1">{employee.funFact}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
