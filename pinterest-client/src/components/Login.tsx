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
          const { name, aud, picture } = credentialResponseDecode;
          localStorage.setItem(
            "user",
            JSON.stringify(credentialResponseDecode)
          );
          // SAVING TO THE SANITY STUDIO
          try {
            const createdDoc = await client.createIfNotExists({
              _id: aud,
              _type: "user",
              username: name,
              avatar: picture,
            });
            navigate("/feeds", { replace: true });
            console.log(createdDoc);
          } catch (error) {
            console.log(error);
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        shape="pill"
        text="signin"
      />
    </div>
  );
}
