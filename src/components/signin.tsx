import { Box, Button, Input, useToast, VStack } from "native-base";
import { useState, VFC } from "react";
import { SafeAreaView } from "react-native";
import { supabase } from "../lib/supabase";

const SignIn: VFC = () => {
	const toast = useToast();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const signInWithEmail = async () => {
		setIsLoading(true);
		const { user, error } = await supabase.auth.signIn({ email, password });

		if (error) {
			toast.show({ description: error.message, duration: 4000, bgColor: "error.500" });
			setIsLoading(false);
			return;
		}
		setIsLoading(false);
		console.log(user);
		toast.show({ description: "sign in!", duration: 4000, bgColor: "success.500" });
	};

	const signUpWithEmail = async () => {
		setIsLoading(true);
		const { user, error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			toast.show({ description: error.message, duration: 4000, bgColor: "error.500" });
			setIsLoading(false);
			return;
		}
		setIsLoading(false);
		console.log(user);
		toast.show({ description: "create account!", duration: 4000, bgColor: "success.500" });
	};

	return (
		<SafeAreaView>
			<Box alignItems="center">
				<VStack space={4}>
					<Input placeholder="email" w="75%" autoCapitalize="none" onChangeText={(text) => setEmail(text)} />
					<Input
						placeholder="password"
						w="75%"
						type="password"
						autoCapitalize="none"
						onChangeText={(text) => setPassword(text)}
					/>
					<Button colorScheme="green" isLoading={isLoading} onPress={signInWithEmail}>
						sign in
					</Button>
					<Button colorScheme="blue" isLoading={isLoading} onPress={signUpWithEmail}>
						create account
					</Button>
					{}
				</VStack>
			</Box>
		</SafeAreaView>
	);
};

export default SignIn;
