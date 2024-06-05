import { useState, useEffect } from "react";
import axios from "axios";
import { UsersType } from "./types";
import { Table, Button } from "./components/ui-components";
import { UsersForm } from "./components/forms";
import { usersTableColumns } from "./data";
import { EditIcon, DeleteIcon, AddIcon } from "./assets";

import "./App.scss";

function App() {
  const [data, setData] = useState<UsersType[]>([]);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<UsersType>();

  useEffect(() => {
    axios
      .get<UsersType[]>("/users")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("Error getting data: ", err);
      });
  }, []);

  async function onSubmit(user: UsersType) {
    if (editUser) {
      setData((prev) => {
        const index = prev.findIndex(({ id }) => id === user.id);
        if (index === -1) {
          return prev;
        }

        prev[index] = {
          ...prev[index],
          ...user,
        };

        return [...prev];
      });
    } else {
      setData((prev) => prev.concat(user));
    }
  }

  async function onDelete(userId: number) {
    await axios
      .delete(`/users/${userId}`)
      .then(() => {
        setData((prev) => prev.filter((row) => row.id !== userId));
      })
      .catch((err) => {
        console.log("Error deleting user: ", err);
      });
  }

  return (
    <div className="main-users-page">
      <div className="users-controller">
        <Button
          text="Create New User"
          icon={<AddIcon />}
          onClick={() => {
            setUserModalOpen(true);
          }}
        />
      </div>
      <Table
        className="users-table"
        columns={usersTableColumns.concat({
          header: "Actions",
          renderer(data) {
            return (
              <div className="actions-col">
                <div
                  className="action-icon"
                  onClick={() => {
                    setEditUser(data as UsersType);
                    setUserModalOpen(true);
                  }}
                >
                  <EditIcon />
                </div>
                <div
                  className="action-icon"
                  onClick={() => {
                    onDelete(Number(data.id));
                  }}
                >
                  <DeleteIcon />
                </div>
              </div>
            );
          },
        })}
        data={data}
      />
      <UsersForm
        open={userModalOpen}
        user={editUser}
        onSubmit={onSubmit}
        onCancel={() => {
          setUserModalOpen(false);
          if (editUser) {
            setEditUser(undefined);
          }
        }}
      />
    </div>
  );
}

export default App;
