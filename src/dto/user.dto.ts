export type createUserDTO = {
  name: string;
  email: string;
  password: string;
  role: "USER";
  isEmailVerified: false;
};

export type updateUserDTO = {
  name: string;
  email: string;
  password: string;  
};
