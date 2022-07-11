import { Box, Button, Input, useToast, VStack } from "native-base";
import { useState, VFC } from "react";
import { SafeAreaView } from "react-native";
import { supabase } from "../lib/supabase";

const SignIn: VFC = () => {
	const toast = useToast();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const signInWithEmail = async () => {
		setIsLoading(true);
		const { user, error } = await supabase.auth.signIn({ email, password });

		if (error) {
			toast.show({ description: error.message, duration: 4000 });
		}
		setIsLoading(false);
	};

	return (
		<SafeAreaView>
			<Box alignItems="center">
				<VStack space={4}>
					<Input placeholder="email" w="75%" />
					<Input placeholder="password" w="75%" type="password" />
					<Button colorScheme="green" isLoading={isLoading} onPress={signInWithEmail}>
						signin
					</Button>
				</VStack>
			</Box>
		</SafeAreaView>
	);
};

export default SignIn;
