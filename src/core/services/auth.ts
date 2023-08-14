import auth from '@react-native-firebase/auth';

class _AuthService {
    async signInAnonymously() {
        const { user } = await auth().signInAnonymously();
        return user;
    }
    getUid() {
        return auth().currentUser?.uid ?? null;
    }
}

const AuthService = new _AuthService();

export default AuthService;
