import { Button, Col, Input, Row, Typography } from "antd";
import { useState } from "react";
import { serverBaseUrl } from "../../../settings";

const regexValidations: any = {
  email: {
    regex: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
    msg: "The email provided is not valid!",
  },
  phone: {
    regex: /^[\s()+-]*([0-9][\s()+-]*){6,20}$/,
    msg: "The phone number provided is not valid! Ex(+355679999999)",
  },
};

export const CreateOrEditUser = ({ record, onSuccess }: any) => {
  const isEdit = !!record;
  const [state, setState] = useState(
    isEdit
      ? { ...record }
      : {
          name: "",
          email: "",
          username: "",
          address: {
            street: "",
            city: "",
            zipcode: "",
          },
          phone: "",
          website: "",
        }
  );
  const [errors, setErrors] = useState<any>({});

  const handleChange = (attr: string, value: string) => {
    setState((prev: any) => {
      return { ...prev, [attr]: value };
    });
  };

  const handleNestedProperty = (
    entity: string,
    attr: string,
    value: string
  ) => {
    setState((prev: any) => {
      return { ...prev, [entity]: { ...prev[entity], [attr]: value } };
    });
  };

  const handleValidate = () => {
    const requiredFields = ["name", "username", "email", "phone"];

    const errors: any = {};

    for (let key in state) {
      if (
        state[key] &&
        regexValidations[key] &&
        !regexValidations[key].regex.test(state[key])
      ) {
        errors[key] = regexValidations[key].msg;
      }
      if (requiredFields.includes(key) && !state[key]) {
        errors[key] = "This Field is required!";
      }
    }

    if (Object.keys(errors).length === 0) {
      setErrors({});
      handleSave();
    } else {
      setErrors({ ...errors });
    }
  };

  const handleSave = async () => {
    const url = serverBaseUrl + (isEdit ? `users/${record.id}` : "users");

    try {
      await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      onSuccess();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Row gutter={[16, 16]} justify="start">
        <Col xs={24} md={12}>
          <Typography>
            Full Name <span className="required">*</span>
          </Typography>
          <Input
            value={state.name}
            onChange={(e: any) => {
              handleChange("name", e.target.value);
            }}
          />
          {errors?.name && (
            <Typography className="required">{errors?.name}</Typography>
          )}
        </Col>
        <Col xs={24} md={12}>
          <Typography>Address</Typography>
          <Input
            value={state.address.street}
            onChange={(e: any) => {
              handleNestedProperty("address", "street", e.target.value);
            }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Typography>
            Username <span className="required">*</span>
          </Typography>
          <Input
            value={state.username}
            onChange={(e: any) => {
              handleChange("username", e.target.value);
            }}
          />
          {errors?.username && (
            <Typography className="required">{errors?.username}</Typography>
          )}
        </Col>
        <Col xs={24} md={12}>
          <Typography>City</Typography>
          <Input
            value={state.address.city}
            onChange={(e: any) => {
              handleNestedProperty("address", "city", e.target.value);
            }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Typography>
            Email <span className="required">*</span>
          </Typography>
          <Input
            value={state.email}
            onChange={(e: any) => {
              handleChange("email", e.target.value);
            }}
          />
          {errors?.email && (
            <Typography className="required">{errors?.email}</Typography>
          )}
        </Col>
        <Col xs={24} md={12}>
          <Typography>Zip Code</Typography>
          <Input
            value={state.address.zipcode}
            onChange={(e: any) => {
              handleNestedProperty("address", "zipcode", e.target.value);
            }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Typography>
            Phone Nr <span className="required">*</span>
          </Typography>
          <Input
            value={state.phone}
            onChange={(e: any) => {
              handleChange("phone", e.target.value);
            }}
          />
          {errors?.phone && (
            <Typography className="required">{errors?.phone}</Typography>
          )}
        </Col>
      </Row>
      <Row justify="end" style={{ marginTop: 16 }}>
        <Col>
          <Button onClick={handleValidate} type="primary" danger>
            Save
          </Button>
        </Col>
      </Row>
    </>
  );
};
