import axios from "axios";

const Base_Url = "http://localhost:5000/api/";

const Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGM0N2E2NTMwMzNkYWE4Y2MzODIxMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyNjkzMjM3OCwiZXhwIjoxNzI3MTkxNTc4fQ.Dm7NO_kn2nLdFrfxN8ExdoQtPHCqIFBiiVdt8C_7snk";

export const publicRequest = axios.create({
  baseURL: Base_Url,
});

export const userRequest = axios.create({
  baseURL: Base_Url,
  header: { token: `Bearer ${Token}` },
});
