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
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  console.log(clientId);
  return (
    <div>
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
