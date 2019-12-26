import app from 'firebase';

class Firebase {
    constructor(config) {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
    }
    doSignUpUserWithEmailandPassword(email, password){
        return this.auth.createUserWithEmailAndPassword(email, password);
    }
    doSignInWithEmailAndPassword(email, password){
        return this.auth.signInWithEmailAndPassword(email, password);
    }
    doLogout = () => {
        console.log('logging user out');
        return this.auth.signOut();
    }
    posts = (type) => {
        return this.db.ref(`discussions/${type}`);
    }
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');
}

export default Firebase;