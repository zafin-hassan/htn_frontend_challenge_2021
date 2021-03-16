import { AlertIcon } from "@chakra-ui/alert";
import { Alert } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Text, VStack } from "@chakra-ui/layout";
import { useContext, useReducer } from "react";
import { login } from "../utils";
import { EventContext } from "./../context/EventContext";

const Auth = () => {
  const { currentState, dispatch } = useContext(EventContext);
  const { username, password, isLoading, error, isLoggedIn } = currentState;
  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "login" });

    try {
      await login({ username, password });
      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };
  return (
    <div
      style={{
        margin: "20px",
        padding: "20px",
      }}
      align="right"
    >
      <div className="login-container">
        {isLoggedIn ? (
          <>
            <h1>Welcome {username}!</h1>
            <Button
              variant="solid"
              color="#F1F1EE"
              backgroundColor="#279CCD"
              width="fit-content"
              onClick={() => dispatch({ type: "logOut" })}
            >
              Log Out
            </Button>
          </>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            <VStack spacing="8px" align="center" width="300px">
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              <Text fontSize="lg">Login to view Private Events!</Text>
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fieldName: "username",
                    payload: e.currentTarget.value,
                  })
                }
              />
              <Input
                type="password"
                placeholder="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fieldName: "password",
                    payload: e.currentTarget.value,
                  })
                }
              />
              <Button
                color="#F1F1EE"
                variant="solid"
                backgroundColor="#279CCD"
                width="fit-content"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
            </VStack>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
