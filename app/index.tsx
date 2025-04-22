import { Redirect } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export default function Index() {
  return (
    <Provider store={store}>
      <Redirect href="/(tabs)" />
    </Provider>
  );
}