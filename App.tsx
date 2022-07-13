import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import SignIn from "./src/components/signin";
import "react-native-url-polyfill/auto";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./src/lib/supabase";
import Account from "./src/components/account";

export default function App() {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		setSession(supabase.auth.session());

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	});
	return (
		<NativeBaseProvider>
			{session && session.user ? <Account session={session} /> : <SignIn />}
			<StatusBar style="auto" />
		</NativeBaseProvider>
	);
}
