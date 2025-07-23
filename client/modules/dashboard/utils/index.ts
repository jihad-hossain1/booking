const getBookingStatus = (startTime: Date | string, endTime: Date | string) => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "ongoing";
  return "past";
};

const getStatusBadge = (status: string) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
  switch (status) {
    case "upcoming":
      return `${baseClasses} bg-blue-100 text-blue-800`;
    case "ongoing":
      return `${baseClasses} bg-green-100 text-green-800`;
    case "past":
      return `${baseClasses} bg-gray-100 text-gray-800`;
    default:
      return baseClasses;
  }
};

const formatDateTime = (dateTime: Date | string) => {
  return new Date(dateTime).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export { getBookingStatus, getStatusBadge, formatDateTime };
