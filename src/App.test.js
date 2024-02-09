import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  render(<App />);
  fireEvent.change(screen.getByLabelText("Prénom"), {
    target: { value: "Tom" },
  });
  fireEvent.change(screen.getByLabelText("Nom"), {
    target: { value: "Wittke" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "wtom@live.fr" },
  });
  fireEvent.change(screen.getByLabelText("Ville"), {
    target: { value: "Saint-Laurent-du-Var" },
  });
  fireEvent.change(screen.getByLabelText("Code postal"), {
    target: { value: "06700" },
  });
  fireEvent.change(screen.getByLabelText("birth"), {
    target: { value: "2000-03-22" },
  });
});

afterEach(() => {
  window.localStorage.clear();
});

test("check if button is disabled when firstname is empty", () => {
  fireEvent.change(screen.getByLabelText("Prénom"), {
    target: { value: "" },
  });
  const btnRegister = screen.getByTestId("register");
  expect(btnRegister).toBeInTheDocument();
  expect(btnRegister).toBeDisabled();
});

test("check if button is disabled when lastname is empty", () => {
  fireEvent.change(screen.getByLabelText("Nom"), {
    target: { value: "" },
  });
  const btnRegister = screen.getByTestId("register");
  expect(btnRegister).toBeInTheDocument();
  expect(btnRegister).toBeDisabled();
});

test("check if button is disabled when email is empty", () => {
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "" },
  });
  const btnRegister = screen.getByTestId("register");
  expect(btnRegister).toBeInTheDocument();
  expect(btnRegister).toBeDisabled();
});

test("check if button is disabled when city is empty", () => {
  fireEvent.change(screen.getByLabelText("Ville"), {
    target: { value: "" },
  });
  const btnRegister = screen.getByTestId("register");
  expect(btnRegister).toBeInTheDocument();
  expect(btnRegister).toBeDisabled();
});

test("check if button is disabled when firstname is empty", () => {
  fireEvent.change(screen.getByLabelText("Code postal"), {
    target: { value: "" },
  });
  const btnRegister = screen.getByTestId("register");
  expect(btnRegister).toBeInTheDocument();
  expect(btnRegister).toBeDisabled();
});

test("check if button is enable when all inputs are not empty", () => {
  const btnRegister = screen.getByTestId("register");
  expect(btnRegister).toBeInTheDocument();
  expect(btnRegister).toBeEnabled();
});

test("check if user is saved in local storage when valid form is submitted", () => {
  const btnRegister = screen.getByTestId("register");
  fireEvent.click(btnRegister);

  expect(window.localStorage.getItem("user")).toEqual(
    '{"firstname":"Tom","lastname":"Wittke","birthDate":"2000-03-22","city":"Saint-Laurent-du-Var","email":"wtom@live.fr","zipCode":"06700"}'
  );
});

test("check if user is not saved in local storage when invalid form is submitted", () => {
  fireEvent.change(screen.getByLabelText("Prénom"), {
    target: { value: "Tom," },
  });

  const btnRegister = screen.getByTestId("register");
  fireEvent.click(btnRegister);

  expect(window.localStorage.getItem("user")).toBeNull();
});

test("check snackbar display with success message when valid form is submitted", () => {
  const btnRegister = screen.getByTestId("register");
  fireEvent.click(btnRegister);

  const snackbar = screen.getByTestId("snackbar");
  expect(snackbar).toBeInTheDocument();
  expect(snackbar).toHaveTextContent("Utilisateur enregistré avec succès !");
});

test("check if form is cleaned when valid form is submitted", () => {
  const btnRegister = screen.getByTestId("register");
  fireEvent.click(btnRegister);

  expect(btnRegister).toBeDisabled();
});

test("check snackbar is display with error message when invalid form  is submitted", () => {
  fireEvent.change(screen.getByLabelText("Prénom"), {
    target: { value: "Tom," },
  });
  const btnRegister = screen.getByTestId("register");
  fireEvent.click(btnRegister);

  const snackbar = screen.getByTestId("snackbar");
  expect(snackbar).toBeInTheDocument();
  expect(snackbar).toHaveTextContent("Les champs ne sont pas valides.");
});

test("check if error 'Prénom invalide.' is present when invalid firstname", () => {
  fireEvent.change(screen.getByLabelText("Prénom"), {
    target: { value: "Tom," },
  });
  const btnRegister = screen.getByTestId("register");
  fireEvent.click(btnRegister);

  const error = screen.getByText("Prénom invalide.");
  expect(error).toBeInTheDocument();
});

test("check if error 'Nom invalide.' is present when invalid lastname", () => {
  fireEvent.change(screen.getByLabelText("Nom"), {
    target: { value: "Witt/ke" },
  });

  const btnRegister = screen.getByTestId("register");
  fireEvent.click(btnRegister);

  const error = screen.getByText("Nom invalide.");
  expect(error).toBeInTheDocument();
});

test("check if error 'Email invalide.' is present when invalid email", () => {
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "wtomlivefr" },
  });
  const btnRegister = screen.getByTestId("register");
  fireEvent.click(btnRegister);

  const error = screen.getByText("Email invalide.");
  expect(error).toBeInTheDocument();
});

test("check if error 'Vous devez avoir au moins 18 ans.' is present when user is not an adult", () => {
  fireEvent.change(screen.getByLabelText("birth"), {
    target: { value: "2022-03-22" },
  });
  const btnRegister = screen.getByTestId("register");
  fireEvent.click(btnRegister);

  const error = screen.getByText("Vous devez avoir au moins 18 ans.");
  expect(error).toBeInTheDocument();
});

test("check if error 'Le code postal ne doit pas contenir de lettre.' is present when invalid zip code", () => {
  fireEvent.change(screen.getByLabelText("Code postal"), {
    target: { value: "06700a" },
  });
  const btnRegister = screen.getByTestId("register");
  fireEvent.click(btnRegister);

  const error = screen.getByText(
    "Le code postal ne doit pas contenir de lettre."
  );
  expect(error).toBeInTheDocument();
});
