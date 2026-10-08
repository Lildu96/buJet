export function isValidRecurringDay(checked:boolean, dayOfMonth:string): boolean {
    if (!checked){
            return true;
        }

        const day = Number(dayOfMonth)
        if (!dayOfMonth) {
        return false;
        } else if (day < 1 || day > 31 || !Number.isInteger(day)) {
            return false;
        }

        return true;

}