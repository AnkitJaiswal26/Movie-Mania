// import { getStorage } from "firebase/storage";
import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyBTbtQrKxzXrUCF2nFOPC8_xR7kQKJdngs",
	authDomain: "moviemania-61383.firebaseapp.com",
	projectId: "moviemania-61383",
	storageBucket: "moviemania-61383.appspot.com",
	messagingSenderId: "345223046315",
	appId: "1:345223046315:web:c197dd1ecd3015c23b43ee",
	measurementId: "G-X31K7D0E89",
};

const firebaseApp  = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
// const storage = getStorage(firebaseApp);
export default storage;
