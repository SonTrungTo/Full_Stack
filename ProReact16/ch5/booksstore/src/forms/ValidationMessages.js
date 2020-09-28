export function GetMessages(element) {
    const messages = [];
    if (element.validity.valueMissing) {
        messages.push("Required field!");
    } else if (element.validity.typeMismatch) {
        messages.push(`Invalid type: ${element.type}`);
    } else if (element.validity.patternMismatch) {
        messages.push(`Invalid type: Must be number of 5 digits`);
    }
    return messages;
}