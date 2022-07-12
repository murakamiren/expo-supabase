import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import SignIn from "./src/components/signin";
import "react-native-url-polyfill/auto";

export default function App() {
	return (
		<NativeBaseProvider>
			<SignIn />
			<StatusBar style="auto" />
		</NativeBaseProvider>
	);
}
