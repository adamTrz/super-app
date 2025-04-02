import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import SplashScreen from './components/SplashScreen';
import ErrorBoundary from './components/ErrorBoundary';
import {Text, View} from 'react-native';

// const AuthProvider = React.lazy(() => import('auth/AuthProvider'));
// const SignInScreen = React.lazy(() => import('auth/SignInScreen'));

const App = () => {
  return (
    <View>
      <Text>BOOKING HOME SHOULD BE HERE....</Text>
    </View>
    // <NavigationContainer>
    //   <MainNavigator />
    // </NavigationContainer>
    // // <ErrorBoundary name="AuthProvider">
    //   {/* <React.Suspense fallback={<SplashScreen />}>
    //     <AuthProvider>
    //       {(authData: {isSignout: boolean; isLoading: boolean}) => {
    //         if (authData.isLoading) {
    //           return <SplashScreen />;
    //         }

    //         if (authData.isSignout) {
    //           return (
    //             <React.Suspense fallback={<SplashScreen />}>
    //               <SignInScreen />
    //             </React.Suspense>
    //           );
    //         } */}
    //   // return (
    //   // );
    //   {/* }} */}
    //   {/* </AuthProvider>
    //   </React.Suspense> */}
    // // </ErrorBoundary>
  );
};

export default App;
