import { ApiError, Session } from "@supabase/supabase-js";
import { Box, Button, Text, useToast, VStack } from "native-base";
import { useEffect, useState, VFC } from "react";
import { SafeAreaView } from "react-native";
import { supabase } from "../lib/supabase";

type AccountProps = {
	session: Session;
};

const Account: VFC<AccountProps> = ({ session }) => {
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [userData, setUserData] = useState<any>(null);

	const getUserData = async () => {
		try {
			setIsLoading(true);
			const user = supabase.auth.user();
			if (!user) {
				throw new Error("no user on the session");
			}
			const { data, error, status } = await supabase.from("user").select("name, age").eq("id", user.id).single();
			if (error && status !== 406) {
				throw error;
			}
			if (data) {
				setUserData(data);
			}
		} catch (error) {
			const err = error as ApiError;
			console.log(err);
			toast.show({ description: err.message, duration: 4000, bgColor: "error.500" });
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (session) {
			getUserData();
		}
	}, [session]);

	return (
		<SafeAreaView>
			<Box mx={12}>
				<VStack space={8}>
					<Text fontSize="3xl" fontWeight="bold">
						account info
					</Text>
					{isLoading ? (
						<Text>loading...</Text>
					) : (
						<Box>
							<Text>{userData.name}</Text>
							<Text>{userData.age}</Text>
						</Box>
					)}
					<Button onPress={() => supabase.auth.signOut()}>sign out</Button>
				</VStack>
			</Box>
		</SafeAreaView>
	);
};

export default Account;
