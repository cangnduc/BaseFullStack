import * as React from "react";
import { cn } from "@/lib/utils";

const Skeleton = ({ className }) => <div className={cn("animate-pulse bg-gray-300", className)} />;

const SkeletonTable = React.forwardRef(({ className, rows = 5, columns = 5 }, ref) => (
  <div className="relative w-full overflow-auto">
    <table ref={ref} className={cn("w-full caption-bottom text-sm", className)}>
      <thead>
        <tr>
          {[...Array(columns)].map((_, index) => (
            <th key={index} className="h-12 px-4 align-middle font-medium">
              <Skeleton className="h-4 w-full" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(rows)].map((_, rowIndex) => (
          <tr key={rowIndex} className="border-b transition-colors hover:bg-muted/50">
            {[...Array(columns)].map((_, colIndex) => (
              <td key={colIndex} className="p-4 align-middle">
                <Skeleton className="h-4 w-full" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
));

SkeletonTable.displayName = "SkeletonTable";

export default SkeletonTable;
