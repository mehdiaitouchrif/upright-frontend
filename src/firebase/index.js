import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyDChKm4aBht67p7CoufSg0Izz8P52unVsI',
	authDomain: 'file-upload-c999d.firebaseapp.com',
	projectId: 'file-upload-c999d',
	storageBucket: 'file-upload-c999d.appspot.com',
	messagingSenderId: '626411852812',
	appId: '1:626411852812:web:a17f0856d29edc4c4a0a29',
}

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()

export { storage, firebase as default }
