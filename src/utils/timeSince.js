export default function timeSince(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const seconds = Math.floor((now - past) / 1000);

    // Define time periods in seconds
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;  // an average month is roughly 30 days
    const year = day * 365; // not accounting for leap years

    if (seconds < minute) return "now";

    let elapsedTime = "";

    const years = Math.floor(seconds / year);
    if (years) elapsedTime += years + "y ";

    const months = Math.floor((seconds % year) / month);
    if (months) elapsedTime += months + "M ";

    const days = Math.floor((seconds % month) / day);
    if (days) elapsedTime += days + "d ";

    const hours = Math.floor((seconds % day) / hour);
    if (hours) elapsedTime += hours + "H ";

    const minutes = Math.floor((seconds % hour) / minute);
    if (minutes) elapsedTime += minutes + "m";

    return elapsedTime.trim();
}
