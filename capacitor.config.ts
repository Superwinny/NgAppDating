import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'NgAppDating',
  webDir: 'dist/ng-app-dating',
  server: {
    androidScheme: 'https'
  }
};

export default config;
