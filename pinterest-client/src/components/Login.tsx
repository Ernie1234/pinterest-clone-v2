import { GoogleLogin } from "@react-oauth/google";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { client } from "../utils/client";
import { TUser } from "../types/types";
// import { useNavigate } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const credentialResponseDecode = jwtDecode<JwtPayload & TUser>(
            credentialResponse.credential as string
          );
          localStorage.setItem(
            "user",
            JSON.stringify(credentialResponseDecode)
          );
          const { name, aud, picture } = credentialResponseDecode;
          const doc = {
            _id: aud,
            _type: "user",
            username: name,
            avatar: picture,
          };
          try {
            const createdDoc = await client.createIfNotExists(doc);
            console.log(createdDoc);
          } catch (error) {
            console.log(error);
          }
          // client.createIfNotExists(doc).then(() => {
          //   navigate("/feeds", { replace: true });
          // });
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
