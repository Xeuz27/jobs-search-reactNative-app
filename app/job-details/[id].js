import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const jobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const { Data, isLoading, error, reFetch } = useFetch("job-details", {
    job_id: params.id,
  });

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {}

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
            showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {isLoading ? (
                <ActivityIndicator size='large' color={COLORS.primary} />
            ) : error ? (
                <Text>Something Went Wrong</Text>
            ) : Data.length === 0 ? (
                <Text>There is no Data</Text>
            ) : (
                <View style={{padding: SIZES.medium, paddingBottom:100}}>
                    <Company
                     />
                     <JobTabs />
                </View>
            )
            
            }

        </ScrollView>
      </>


    </SafeAreaView>
  );
};

export default jobDetails;
