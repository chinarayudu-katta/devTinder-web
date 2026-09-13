import {useState} from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
      const [firstName, setFirstName] = useState(user.firstName);
      const [lastName, setLastName] = useState(user.lastName);
      const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
      const [age, setAge] = useState(user.age);
      const [gender, setGender] = useState(user.gender);
      const [about, setAbout] = useState(user.about);
      const dispatch = useDispatch();  
      const [error, setError] = useState("");
      const [showToast, setShowToast] = useState(false);
    
      const saveProfile = async() => {
        setError("")
        try{
const payload = {
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about
        };

        const res = await axios.patch(
            BASE_URL + "/profile/edit",
            payload,
            {
                withCredentials: true
            });
            console.log("Profile updated successfully", res.data);
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(()=> {
              showToast(false)
            }, 3000)
        }catch(err){
    setError(
        err.response.data 
    );
        }
      }

  return (
    <>
    <div className="flex justify-center my-10">
    <div className="flex justify-center mx-10">
    <div className="card bg-base-300 w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title justify-center">Edit Profile</h2>
    <div>
    <fieldset className="fieldset">
      <legend className="label-text">First Name: </legend>
      <input 
        type="text"
        className="input"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)} />
    </fieldset>
    <fieldset className="fieldset">
      <legend className="label-text">Last Name: </legend>
      <input 
        type="text"
        className="input"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)} />
    </fieldset>
    <fieldset className="fieldset">
      <legend className="label-text">Photo URL: </legend>
      <input 
        type="text"
        className="input"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)} />
    </fieldset>
    <fieldset className="fieldset">
      <legend className="label-text">Age: </legend>
      <input 
        type="number"
        className="input"
        value={age}
        onChange={(e) => setAge(e.target.value)} />
    </fieldset>
    <fieldset className="fieldset">
      <legend className="label-text">Gender: </legend>
      <select 
        className="select"
        value={gender}
        onChange={(e) => setGender(e.target.value)} >
        <option value="">Select Gender</option>
        <option value="male">male</option>
        <option value="female">female</option>
        <option value="other">other</option>
      </select>
    </fieldset>
    <fieldset className="fieldset">
      <legend className="label-text">About: </legend>
      <textarea 
        className="textarea"
        value={about}
        onChange={(e) => setAbout(e.target.value)} />
    </fieldset>
    </div>
    <p className="text-error">{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={saveProfile}>
        Save Profile
      </button>
    </div>

    </div>
    </div>
    </div>
    <UserCard user={{firstName, lastName, photoUrl, age, gender, about}} />
    </div>
  {showToast && (
  <div className="toast toast-top toast-center">
   <div className="alert alert-success">
    <span>Profile save successfully.</span>
  </div>
  </div>
)}
    </>
    )
}

export default EditProfile
