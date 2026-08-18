import api from "@/lib/axios";

export const login = async ({ username, password }) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  const res = await api.post("/login", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const sendPasswordReset = async ({ username, email }) => {
  const res = await api.post("/send-password", {
    username,
    email,
  });

  return res.data;
};