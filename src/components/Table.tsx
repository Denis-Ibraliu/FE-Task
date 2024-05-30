import React, { ButtonHTMLAttributes } from "react";
import { FormValues, User } from "../utils/types";
import IconButton from "./IconButton";
import editIcon from "/edit-pencil-01-svgrepo-com.svg";
import deleteIcon from "/delete-svgrepo-com.svg";

interface TableProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rows: User[];
  setModalState: (value: "new" | "edit" | undefined) => void;
  setFormValues: (form: FormValues) => void;
  setTrigger: (trigger: any) => void;
}

const Table: React.FC<TableProps> = ({
  rows,
  setModalState,
  setFormValues,
  setTrigger,
}) => {
  const handleDeleteUser = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });
      setTrigger(Date.now());
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((user: User) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <div className="actionButtonDiv">
                <IconButton
                  className="actionButton"
                  iconPath={editIcon}
                  onClick={() => {
                    setModalState("edit");
                    setFormValues({
                      id: user.id,
                      fullName: user.name,
                      address: user.address.street,
                      city: user.address.city,
                      email: user.email,
                      phoneNr: user.phone,
                      username: user.username,
                      zipCode: user.address.zipcode,
                    });
                  }}
                />
                <IconButton
                  className="actionButton"
                  iconPath={deleteIcon}
                  onClick={() => handleDeleteUser(user.id)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
