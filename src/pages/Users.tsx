import IconButton from "../components/IconButton";
import PlusSign from "/plus-svgrepo-com.svg";
import { useEffect, useState } from "react";
import Table from "../components/Table";
import { FormValues } from "../utils/types";
import CreateOrEditModal from "../components/CreateOrEditModal";
import useFetchUsers from "../hooks/useFetchUsers";
const Users = () => {
  const [trigger, setTrigger] = useState<any>();
  const { users, loading, error } = useFetchUsers(trigger);
  const [modalState, setModalState] = useState<"new" | "edit" | undefined>();

  const [formValues, setFormValues] = useState<FormValues>({
    id: users.length + 1,
    fullName: "",
    username: "",
    email: "",
    phoneNr: "",
    address: "",
    city: "",
    zipCode: "",
  });

  useEffect(() => {
    // update the id to the last users id + 1 when modal is opened as new
    if (modalState === "new") {
      setFormValues({
        ...formValues,
        id: users[users.length - 1].id + 1,
      });
    }
    if (!modalState) {
      setFormValues({
        id: users.length + 1,
        fullName: "",
        username: "",
        email: "",
        phoneNr: "",
        address: "",
        city: "",
        zipCode: "",
      });
    }
  }, [modalState]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {modalState && (
        <CreateOrEditModal
          isOpen={!!modalState}
          onClose={setModalState}
          isNew={modalState === "new"}
          formValues={formValues}
          setFormValues={setFormValues}
          setTrigger={setTrigger}
        />
      )}
      <div className="createUserButton">
        <IconButton
          className="redButton"
          iconPath={PlusSign}
          onClick={() => setModalState("new")}
        >
          Create New User
        </IconButton>
      </div>
      <br />
      <Table
        rows={users}
        setModalState={setModalState}
        setFormValues={setFormValues}
        setTrigger={setTrigger}
      />
    </>
  );
};

export default Users;
