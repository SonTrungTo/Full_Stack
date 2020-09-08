export function ValidateForm(data) {
    let errors = [];
    if (!data.email.endsWith("@gmail.com")) {
        errors.push("Only gmail users are allowed");
    }
    if (!data.email.toLowerCase().startsWith(data.name.toLowerCase())) {
        errors.push("Email address must start with name");
    }
    if (data.name.toLowerCase() === "sonto") {
        errors.push("This username is the boss! You are not him!");
    }

    return errors;
}