export const formatDuration = (startTime: string, endTime: string) => {
  if (!startTime || !endTime) return "";

  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationMinutes = (Number(end) - Number(start)) / (1000 * 60);

  if (durationMinutes <= 0) return "Invalid duration";

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (hours === 0) return `${minutes} minutes`;
  if (minutes === 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
  return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minutes`;
};
