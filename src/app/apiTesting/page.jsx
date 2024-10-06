'use client';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../config/firebase-config'; // Use initialized auth
import { deleteUser, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'; // Import necessary auth functions

const Page = () => {
  const [message, setMessage] = useState("loading...");
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  
  // Firestore database testing
  const [users, setUsers] = useState([]);
  const userCollectionsRef = collection(db, "users"); // Gets a particular collection

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(userCollectionsRef); // Fetch documents from Firestore
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };
  
    getUsers(); // Call the function inside useEffect
  }, []); 
  //updating the user
  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id); // Get the specific document
    const newFields = { age: age + 1 }; // Increment age by 1
    await updateDoc(userDoc, newFields); // Update document with new fields
  };
  const deleteUser = async (id) => {
    const userDoc = doc(db,"users", id)
    await deleteDoc(userDoc)

  }
  
  // Fetch message and people list from backend when component mounts
  useEffect(() => {
    fetch("https://trijha-backend-production.up.railway.app/")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        setPeople(data.people);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Sign in with Google and send ID token to the backend
  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        return result.user.getIdToken(); // Get ID token from user credential
      })
      .then((idToken) => {
        return fetch("https://trijha-backend-production.up.railway.app/google-signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }), // Sending the ID token to the backend
        });
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("User signed up via Google:", data);
      })
      .catch((error) => {
        console.error("Error during Google sign-in:", error);
      });
  };

  const createUser = async () => {
    if (!newName || !newAge || newAge <= 0) {
      alert("Please enter a valid name and age.");
      return;
    }

    try {
      await addDoc(userCollectionsRef, { name: newName, age: Number(newAge) });
      setNewName(""); // Clear input fields after user is created
      setNewAge(0); // Reset age input
      alert("User added successfully!");
    } catch (error) {
      console.error("Error adding user: ", error);
      alert("Failed to add user. Please try again.");
    }
  };

  return (
    <div>
      <h1>{message}</h1>
      {people.map((person, index) => (
        <h1 key={index}>{person}</h1>
      ))}

      {/* Button to trigger Google sign-up */}
      <button onClick={signUpWithGoogle}>Sign Up with Google</button>
      <br />
      
      {users.map((user) => (
        <div key={user.id}>
          <h1>Name: {user.name}</h1>
          <h1>Age: {user.age}</h1>
          <button onClick={() => updateUser(user.id, user.age)}>Increase Age</button>{/*Call back function to add arguments */}
          <br />
          <button onClick = {() => deleteUser(user.id)}>Delete User</button>
        </div>
      ))}
      
      <input
        type="text"
        placeholder="Name.."
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age.."
        value={newAge}
        onChange={(e) => setNewAge(Number(e.target.value))} // Convert input to number
      />
      <button onClick={createUser}>Create User</button>
    </div>
  );
};

export default Page;
