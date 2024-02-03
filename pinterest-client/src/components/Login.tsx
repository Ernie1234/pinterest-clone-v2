import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

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
      Login
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const credentialResponseDecode = jwtDecode<MyToken>(
            credentialResponse.credential
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
