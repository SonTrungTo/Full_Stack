export function GetMessages(element) {
    const messages = [];
    if (element.validity.valueMissing) {
        messages.push("Required field!");
    } else if (element.validity.typeMismatch) {
        messages.push(`Invalid type: ${element.type}`);
    }
    return messages;
}