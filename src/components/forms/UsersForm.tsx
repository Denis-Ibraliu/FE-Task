import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Modal, Input } from "../ui-components";
import { UsersType } from "../../types";
import { usersFormFields } from "./data";
import { getLatLng } from "../../utils";

import "./UsersForm.scss";

type UsersFormProps = {
  open: boolean;
  onCancel: () => unknown;
  onSubmit: (user: UsersType) => unknown;
  user?: UsersType;
};

type ErrorValidations = Record<string, boolean>;

function UsersForm(props: UsersFormProps) {
  const { open, onCancel, onSubmit, user } = props;

  const [errors, setErrors] = useState<ErrorValidations>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setErrors(
      usersFormFields.reduce(
        (acc, val) => ({
          ...acc,
          [val.field]: user
            ? false
            : val.required === undefined
            ? true
            : val.required,
        }),
        {}
      )
    );
  }, [user]);

  async function onSave() {
    for (const field in errors) {
      if (errors[field]) {
        return;
      }
    }

    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);

    let newUser = {} as UsersType;
    const latLngParams = {
      address: "",
      city: "",
      zipcode: "",
    };

    for (const [field, value] of formData) {
      const userKey = field as keyof UsersType;
      if (field !== "address" && field !== "city" && field !== "zipcode") {
        Object.assign(newUser, { [userKey]: value.toString() });
      } else {
        Object.assign(latLngParams, { [field]: value });
      }
    }

    try {
      await getLatLng(latLngParams).then((r) => {
        newUser["address"] = r;
        if (!user) {
          newUser["company"] = {
            bs: "test",
            catchPhrase: "test",
            name: "test",
          };

          newUser["website"] = "test.com";
        }
      });

      if (!user) {
        await axios.post<UsersType>("/users", newUser).then((r) => {
          newUser = r.data;
        });
      } else {
        await axios.patch<UsersType>(`/users/${user.id}`, newUser).then((r) => {
          newUser = r.data;
        });
      }
    } catch (err) {
      console.log("Error posting user: ", err);
      onCancel();
      return;
    }

    onSubmit({
      ...(user ? user : {}),
      ...newUser,
    });
    onCancel();
  }

  return (
    <Modal
      title={user ? "Edit User" : "New User Info"}
      onCancel={onCancel}
      onSave={onSave}
      open={open}
      className="users-form-container"
    >
      <form ref={formRef} className="users-inner-form">
        {usersFormFields.map((el) => {
          const userKey = el.field as keyof UsersType;
          let defaultValue =
            user?.[userKey] && typeof user?.[userKey] === "string"
              ? user?.[userKey]
              : undefined;

          if (el.field === "address") {
            defaultValue = user?.address.street;
          } else if (el.field === "city") {
            defaultValue = user?.address.city;
          } else if (el.field === "zipcode") {
            defaultValue = user?.address.zipcode;
          }

          return (
            <Input
              {...el}
              onError={() => {
                setErrors((prev) => ({
                  ...prev,
                  [el.field]: true,
                }));
              }}
              onErrorClear={() => {
                if (errors[el.field]) {
                  setErrors((prev) => ({
                    ...prev,
                    [el.field]: false,
                  }));
                }
              }}
              defaultValue={defaultValue}
              key={el.field}
            />
          );
        })}
      </form>
    </Modal>
  );
}

export default UsersForm;
