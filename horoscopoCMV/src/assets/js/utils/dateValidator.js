export function validateDate(dateString) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    if (!regex.test(dateString)) return false;
    
    const [day, month, year] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    
    return (
        date.getDate() === day &&
        date.getMonth() === month - 1 &&
        date.getFullYear() === year
    );
}