const months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

export const getDate = (date: Date) => {
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();

    const hour = date.getHours();
    const minute = date.getMinutes();

    return { year, month, day, hour, minute };
}