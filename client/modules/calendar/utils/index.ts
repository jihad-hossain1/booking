class CalenderUtils {
    getWeekStart(date: string | Date) {
        const start = new Date(date);
        const day = start.getDay();
        const diff = start.getDate() - day; // Sunday = 0
        start.setDate(diff);
        start.setHours(0, 0, 0, 0);
        return start;
    }

    getWeekDays(currentWeek: string | Date) {
        const weekStart = this.getWeekStart(currentWeek);
        const days = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(weekStart);
            day.setDate(day.getDate() + i);
            days.push(day);
        }
        return days;
    }

    formatTime(dateTime: string | Date) {
        return new Date(dateTime).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }

    getBookingColor(resource: string, resources: string[]) {
        const colors = ["bg-blue-100 border-blue-300 text-blue-800", "bg-green-100 border-green-300 text-green-800", "bg-purple-100 border-purple-300 text-purple-800", "bg-orange-100 border-orange-300 text-orange-800", "bg-pink-100 border-pink-300 text-pink-800"];
        const index = resources.indexOf(resource) % colors.length;
        return colors[index] || colors[0];
    }

    constantWeek () {
        const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return weeks;
    }
}

export default new CalenderUtils();
