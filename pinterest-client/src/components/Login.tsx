import { GoogleLogin } from "@react-oauth/google";
import { JwtPayload, jwtDecode } from "jwt-decode";

interface MyToken {
  name: string;
  picture: string;
  email: string;
  aud: string;
  email_verified: boolean;
}

export default function Login() {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const credentialResponseDecode = jwtDecode<JwtPayload & MyToken>(
            credentialResponse.credential as string
          );
          console.log(credentialResponseDecode);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}
