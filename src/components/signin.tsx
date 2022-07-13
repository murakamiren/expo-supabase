import { Box, Button, Input, Text, useToast, VStack } from "native-base";
import { useState, VFC } from "react";
import { SafeAreaView } from "react-native";
import { supabase } from "../lib/supabase";

const SignIn: VFC = () => {
	const toast = useToast();

	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [userData, setUserData] = useState<any>(null);

	const signInWithEmail = async () => {
		setIsLoading(true);
		const { user, error } = await supabase.auth.signIn({ email, password });

		if (error) {
			toast.show({ description: error.message, duration: 4000, bgColor: "error.500" });
			setIsLoading(false);
			return;
		}
		console.log(user);
		toast.show({ description: "sign in!", duration: 4000, bgColor: "success.500" });
	};

	const signUpWithEmail = async () => {
		if (name === "" || email === "" || password === "") {
			toast.show({ description: "input is null", duration: 4000, bgColor: "error.500" });
			return;
		}
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
		const transferNum = parseInt(age);
		if (isNaN(transferNum)) {
			toast.show({ description: "age number", duration: 4000, bgColor: "error.500" });
			return;
		}

		const { data, error: tableError } = await supabase.from("user").insert([
			{
				id: user?.id,
				name: name,
				age: transferNum,
			},
		]);

		if (tableError) {
			toast.show({ description: tableError.message, duration: 4000, bgColor: "error.500" });
			setIsLoading(false);
			return;
		}
		setName("");
		setAge("");
		setEmail("");
		setPassword("");
		setIsLoading(false);
		setIsLoading(false);
		console.log(user);
		console.log(data);
		setUserData(data);
		toast.show({ description: "create account!", duration: 4000, bgColor: "success.500" });
	};

	return (
		<SafeAreaView>
			<Box alignItems="center" mt={32}>
				<VStack space={4}>
					<Input placeholder="name" w="75%" autoCapitalize="none" value={name} onChangeText={(text) => setName(text)} />
					<Input placeholder="age" w="75%" autoCapitalize="none" value={age} onChangeText={(text) => setAge(text)} />
					<Text fontSize="xs" color="gray.500">
						name and age are not needed when login
					</Text>
					<Input
						placeholder="email"
						w="75%"
						autoCapitalize="none"
						value={email}
						onChangeText={(text) => setEmail(text)}
					/>
					<Input
						placeholder="password"
						w="75%"
						type="password"
						autoCapitalize="none"
						value={password}
						secureTextEntry={true}
						onChangeText={(text) => setPassword(text)}
					/>
					<Button colorScheme="green" isLoading={isLoading} onPress={signInWithEmail}>
						sign in
					</Button>
					<Button colorScheme="blue" isLoading={isLoading} onPress={signUpWithEmail}>
						create account
					</Button>
				</VStack>
			</Box>
		</SafeAreaView>
	);
};

export default SignIn;
