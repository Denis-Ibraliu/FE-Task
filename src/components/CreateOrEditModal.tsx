import { useState } from "react";
import IconButton from "./IconButton";
import closeIcon from "/close-circle-svgrepo-com.svg";
import FormItem from "./FormItem";
import { validateForm } from "../utils/validation";
import { FormValues, User } from "../utils/types";

interface CreateOrEditModalProps {
  isOpen: boolean;
  onClose: (value: "new" | "edit" | undefined) => void;
  isNew: boolean;
  formValues: FormValues;
  setFormValues: (form: FormValues) => void;
  setTrigger: (trigger: any) => void;
}

const CreateOrEditModal: React.FC<CreateOrEditModalProps> = ({
  isOpen,
  onClose,
  isNew,
  formValues,
  setFormValues,
  setTrigger,
}) => {
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNr: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const handleFormChange = (field: keyof typeof formValues, value: any) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
    setFormErrors({
      ...formErrors,
      [field]: "",
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { hasError, errorValues } = validateForm(formValues);
    if (hasError) {
      setFormErrors(errorValues);
    } else {
      const body: User = {
        id: formValues.id,
        name: formValues.fullName,
        address: {
          city: formValues.city,
          street: formValues.address,
          zipcode: formValues.zipCode,
        },
        email: formValues.email,
        phone: formValues.phoneNr,
        username: formValues.username,
      };
      try {
        if (isNew) {
          await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
        } else {
          await fetch(`http://localhost:3000/users/${body.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
        }
        setTrigger(Date.now());
        onClose(undefined);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };

  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-name">
            {isNew ? "New User Info" : "Edit User Info"}
          </div>
          <IconButton
            iconPath={closeIcon}
            className="modal-close"
            onClick={() => onClose(undefined)}
          />
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="grid-container">
              <FormItem
                label="Full Name"
                placeholder="John Gonzales"
                value={formValues.fullName}
                onChange={(e) => handleFormChange("fullName", e.target.value)}
                error={formErrors.fullName}
              />
              <FormItem
                label="Address"
                placeholder="Reter 43"
                value={formValues.address}
                onChange={(e) => handleFormChange("address", e.target.value)}
                error={formErrors.address}
              />
              <FormItem
                label="Username"
                placeholder="johngonzales13"
                value={formValues.username}
                onChange={(e) => handleFormChange("username", e.target.value)}
                error={formErrors.username}
              />
              <FormItem
                label="City"
                placeholder="Tirana"
                value={formValues.city}
                onChange={(e) => handleFormChange("city", e.target.value)}
                error={formErrors.city}
              />
              <FormItem
                label="Email"
                placeholder="johngonzales1332@gmail.com"
                value={formValues.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
                error={formErrors.email}
              />
              <FormItem
                label="Zip Code"
                placeholder="1060"
                value={formValues.zipCode}
                onChange={(e) => handleFormChange("zipCode", e.target.value)}
                error={formErrors.zipCode}
              />
              <FormItem
                label="Phone Nr"
                placeholder="+355 69 76 76 654"
                value={formValues.phoneNr}
                onChange={(e) => handleFormChange("phoneNr", e.target.value)}
                error={formErrors.phoneNr}
              />
            </div>
            <div className="saveButtonDiv">
              <IconButton className="redButton" type="submit">
                Save
              </IconButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrEditModal;
