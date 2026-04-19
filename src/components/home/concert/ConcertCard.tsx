import { TrashIcon, UserFormIcon } from "../../commons/icons";
import Button from "../../commons/button";
import PermissionGuard from "@/components/commons/guard/PermissionGuard";
import { PERMISSION_ROLE } from "@/constants/role";

type Props = {
  name: string;
  description: string;
  totalSeats: number;
  role: "admin" | "user";
  isReserved?: boolean;
  onDelete?: () => void;
  onReserve?: () => void;
  onCancel?: () => void;
};

export default function ConcertCard({
  name,
  description,
  totalSeats,
  role,
  isReserved = false,
  onDelete,
  onReserve,
  onCancel,
}: Props) {
  return (
    <div className="border border-gray-300 rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-text text-xl font-semibold mb-4">{name}</h2>

      <hr className="mb-4 text-gray-200" />

      <p className="text-gray-700 leading-relaxed mb-6 text-sm">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-700 text-lg">
          <UserFormIcon className="w-5 h-5" />
          <span>{totalSeats}</span>
        </div>

        <PermissionGuard
          userRole={role}
          permissionRole={[PERMISSION_ROLE.ADMIN]}
        >
          <Button
            variant="danger"
            onClick={onDelete}
            prefixIcon={<TrashIcon className="w-4 h-4" />}
          >
            Delete
          </Button>
        </PermissionGuard>

        <PermissionGuard
          userRole={role}
          permissionRole={[PERMISSION_ROLE.USER]}
        >
          {isReserved && (
            <Button variant="danger" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </PermissionGuard>

        <PermissionGuard
          userRole={role}
          permissionRole={[PERMISSION_ROLE.USER]}
        >
          {!isReserved && (
            <Button variant="primary" onClick={onReserve} className="bg-text">
              Reserve
            </Button>
          )}
        </PermissionGuard>
      </div>
    </div>
  );
}
