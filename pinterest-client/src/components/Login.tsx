import { GoogleLogin } from "@react-oauth/google";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { client } from "../utils/client";
import { TUser } from "../types/types";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const credentialResponseDecode = jwtDecode<JwtPayload & TUser>(
            credentialResponse.credential as string
          );
          // SAVING TO THE LOCAL STORAGE
          const { name, sub, picture } = credentialResponseDecode;
          localStorage.setItem(
            "user",
            JSON.stringify(credentialResponseDecode)
          );
          // SAVING TO THE SANITY STUDIO
          try {
            await client.createIfNotExists({
              _id: sub,
              _type: "user",
              username: name,
              avatar: picture,
            });
            navigate("/feeds", { replace: true });
          } catch (error) {
            throw new Error("Error while creating the user in Sanity");
          }
        }}
        onError={() => {
          throw new Error("Login Failed");
        }}
        shape="pill"
        text="signin"
      />
    </div>
  );
}
