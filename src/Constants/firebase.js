import app from 'firebase';


class Firebase {
    constructor(config) {
        app.initializeApp(config);
        this.auth = app.auth();
    }
    doSignUpUserWithEmailandPassword(email, password){
        return this.auth.createUserWithEmailAndPassword(email, password);
    }
}

export default Firebase;