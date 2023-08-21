import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

class _AuthService {
    /**
     * Sign in the user anonymously.
     *
     * @returns {Promise<FirebaseAuthTypes.User>} A promise that resolves to the authenticated user.
     */
    async signInAnonymously(): Promise<FirebaseAuthTypes.User> {
        const { user } = await auth().signInAnonymously();
        return user;
    }

    /**
     * Get the UID of the current user if available.
     *
     * @returns {string} The UID of the current user, or an empty string if not available.
     */
    getUid(): string {
        return auth().currentUser?.uid ?? '';
    }
}

const AuthService = new _AuthService();

export default AuthService;
