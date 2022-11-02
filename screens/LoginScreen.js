import AuthContent from "../components/Auth/AuthContent";
import { useState,useContext } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/Auth";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication Failed",
        "Please check your credentials or try again after some time."
      );
      setIsAuthenticating(false);
    }

  }

  if (isAuthenticating) {
    return <LoadingOverlay message="logging please wait...." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
