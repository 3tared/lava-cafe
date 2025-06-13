// app/employees/components/EmployeeList.tsx
"use client";

import { Employee } from "@/types";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PencilIcon, MoreHorizontal, Trash2 } from "lucide-react";
import { deleteEmployee } from "@/lib/actions/employees";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface EmployeeListProps {
  employees: Employee[];
}

export default function EmployeeList({ employees }: EmployeeListProps) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null
  );

  const handleDeleteClick = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!employeeToDelete) return;

    const { success } = await deleteEmployee(employeeToDelete.id);

    if (success) {
      setIsDeleteDialogOpen(false);
      router.refresh();
    }
  };

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

  if (employees.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No employees found</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {employee.imageUrl ? (
                      <Image
                        src={employee.imageUrl}
                        alt={employee.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xl font-medium text-gray-600">
                          {employee.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <Link
                        href={`/dashboard/employees/${employee.id}`}
                        className="font-medium hover:underline"
                      >
                        {employee.name}
                      </Link>
                      {employee.email && (
                        <p className="text-sm text-muted-foreground">
                          {employee.email}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department?.title || "—"}</TableCell>
                <TableCell>
                  <Badge
                    className={getStatusColor(employee.status)}
                    variant="outline"
                  >
                    {employee.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(employee.startDate), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/employees/${employee.id}`}>
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/employees/${employee.id}/edit`}>
                          <PencilIcon className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteClick(employee)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {employeeToDelete?.name}. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
