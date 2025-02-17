import validator from "validator";

export const signupValidator = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (firstName.length < 3 || lastName.length < 3) {
    throw new Error("Please Enter Valid Name");
  }
  if (!firstName || !lastName) {
    throw new Error("Please Enter Name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please Enter Valid Email ID");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Please Enter Strong Password ,Your Password is not Strong"
    );
  }
};
export const validateEditRequest = (req) => {
  const aproveToEdit = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "about",
    "photo",
    "skills",
  ];
  const isValidatedToEdit = Object.keys(req.body).every((key) =>
    aproveToEdit.includes(key)
  );
  return isValidatedToEdit;
};
export const validateChangePasswordRequest = (req) => {
  const allowedToChange = ["currentPassword", "newPassword", "confirmPassword"];
  const isallowedToChange = Object.keys(req.body).every((key) =>
    allowedToChange.includes(key)
  );
  return isallowedToChange;
};
