import { TextField, Snackbar } from "@mui/material";
import "./App.css";
import React, { useState } from "react";

/** Regex */
const regexNames = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\\- ]+$");
const regexEmail = new RegExp("^[a-zA-Z\\.\\-]+@[a-zA-Z]+\\.[a-z]{2,4}$");
const regexZipCode = new RegExp("^[0-9]{5}$");

/**
 * @param {string} date the birth date
 * @returns the age of the birth date
 */
const calculateAge = (date) => {
  if (!date) {
    throw new Error("Missing parameter date");
  }
  const currentDate = new Date();
  const userBirthDate = new Date(date);

  return (
    currentDate.getFullYear() -
    userBirthDate.getFullYear() -
    (currentDate.getMonth() < userBirthDate.getMonth() ||
    (currentDate.getMonth() === userBirthDate.getMonth() &&
      currentDate.getDate() < userBirthDate.getDate())
      ? 1
      : 0)
  );
};

/**
 * @param {string} date the birth date
 * @returns true if age > 18, else false
 *
 * @see calculateAge
 */
const isAdult = (date) => {
  return calculateAge(date) >= 18;
};

/**
 *
 * @param {object} userData the user's data
 * @returns true if every field of userData are not empty
 *
 * @throws 'Missing parameter userData' if #userData is not correctly formatted
 */
const isCompleted = (userData) => {
  if (!userData) {
    throw new Error("Missing parameter userData");
  }
  return Object.values(userData).every((value) => value !== "");
};

/**
 *
 * @param {object} userDataErrors the userdata's errors
 * @returns true if every field of userDataErrors are empty
 */
const isValid = (userDataErrors) => {
  return Object.values(userDataErrors).every((error) => !error);
};

/**
 *
 * @param {string} zipCode the zip code
 * @returns
 */
const isValidZipCode = (zipCode) => {
  const regexOnlyNumber = new RegExp("^[0-9]+$");
  if (!regexOnlyNumber.test(zipCode)) {
    return "Le code postal ne doit pas contenir de lettre.";
  } else if (zipCode.length < 5) {
    return "Le code postal doit contenir au minimum 5 chiffres.";
  } else if (zipCode.length > 5) {
    return "Le code postal doit contenir au maximum 5 chiffres.";
  }
};

function App() {
  /** Snackbar */
  const [message, setMessage] = useState("Les champs ne sont pas valides.");
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    birthDate: "",
    city: "",
    email: "",
    zipCode: "",
  });

  const [userDataErrors, setUserDataErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    birthDate: "",
    city: "",
    zipCode: "",
  });

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "firstname":
        setUserDataErrors((errors) => ({
          ...errors,
          [fieldName]: regexNames.test(value) ? "" : "Prénom invalide.",
        }));
        break;
      case "lastname":
        setUserDataErrors((errors) => ({
          ...errors,
          [fieldName]: regexNames.test(value) ? "" : "Nom invalide.",
        }));
        break;
      case "email":
        setUserDataErrors((errors) => ({
          ...errors,
          [fieldName]: regexEmail.test(value) ? "" : "Email invalide.",
        }));
        break;
      case "zipCode":
        const error = isValidZipCode(value);
        setUserDataErrors((errors) => ({
          ...errors,
          [fieldName]: error ? error : "",
        }));
        break;
      case "birthDate":
        setUserDataErrors((errors) => ({
          ...errors,
          [fieldName]: isAdult(value)
            ? ""
            : "Vous devez avoir au moins 18 ans.",
        }));
        break;
      default:
        break;
    }
  };

  const setField = (fieldName, value) => {
    setUserData({ ...userData, [fieldName]: value });
    validateField(fieldName, value);
  };

  const submit = () => {
    if (isValid(userDataErrors)) {
      window.localStorage.setItem("user", JSON.stringify(userData));
      setMessage("Utilisateur enregistré avec succès !");
      setOpen(true);
      clean();
    } else {
      setIsSubmitted(true);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clean = () => {};

  return (
    <>
      <form className="form">
        <TextField
          className="input"
          data-testid="firstname"
          label="Prénom"
          variant="outlined"
          value={userData.firstname}
          onChange={(event) => {
            setField("firstname", event.target.value);
          }}
          error={isSubmitted && !!userDataErrors.firstname}
          helperText={
            isSubmitted && userDataErrors.firstname
              ? userDataErrors.firstname
              : ""
          }
        />
        <TextField
          className="input"
          data-testid="lastname"
          label="Nom"
          variant="outlined"
          value={userData.lastname}
          onChange={(event) => {
            setField("lastname", event.target.value);
          }}
          error={isSubmitted && !!userDataErrors.lastname}
          helperText={
            isSubmitted && userDataErrors.lastname
              ? userDataErrors.lastname
              : ""
          }
        />
        <TextField
          type="email"
          className="input"
          data-testid="email"
          label="Email"
          variant="outlined"
          value={userData.email}
          onChange={(event) => {
            setField("email", event.target.value);
          }}
          error={isSubmitted && !!userDataErrors.email}
          helperText={
            isSubmitted && userDataErrors.email ? userDataErrors.email : ""
          }
        />
        <div
          style={{ display: "flex", flexDirection: "row", columnGap: "20px" }}
        >
          <p>Date de naissance :</p>
          <TextField
            type="date"
            label="birth"
            className="input"
            data-testid="birth"
            variant="outlined"
            value={userData.birthDate}
            onChange={(event) => {
              setField("birthDate", event.target.value);
            }}
            error={isSubmitted && !!userDataErrors.birthDate}
            helperText={
              isSubmitted && userDataErrors.birthDate
                ? userDataErrors.birthDate
                : ""
            }
          />
        </div>
        <TextField
          type="text"
          data-testid="city"
          label="Ville"
          variant="outlined"
          value={userData.city}
          onChange={(event) => {
            setField("city", event.target.value);
          }}
        />
        <TextField
          type="text"
          data-testid="zipcode"
          label="Code postal"
          variant="outlined"
          value={userData.zipCode}
          onChange={(event) => {
            setField("zipCode", event.target.value);
          }}
          error={isSubmitted && !!userDataErrors.zipCode}
          helperText={
            isSubmitted && userDataErrors.zipCode ? userDataErrors.zipCode : ""
          }
        />
        <button
          type="button"
          value="Submit"
          data-testid="register"
          className={
            isCompleted(userData) ? "enable button" : "disabled button"
          }
          disabled={!isCompleted(userData)}
          onClick={submit}
        >
          S'enregistrer
        </button>
      </form>
      <Snackbar
        data-testid="snackbar"
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
      />
    </>
  );
}

export default App;
export {
  calculateAge,
  isAdult,
  isCompleted,
  isValid,
  isValidZipCode,
  regexEmail,
  regexNames,
  regexZipCode,
};
