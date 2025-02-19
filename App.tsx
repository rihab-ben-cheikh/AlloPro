import { ThemeProvider } from "@shopify/restyle";
import { theme } from "./restyle";
import AuthNavigator from "./navigators/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
