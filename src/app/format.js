export const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  console.log(date)
  if (dateIsValid(date)) {
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
    const month = mo.charAt(0).toUpperCase() + mo.slice(1)
    return `${month.substr(0,3)}. ${parseInt(da)}, ${ye.toString().substr(0,4)}`
  };
  return dateStr
}
 
export const formatStatus = (status) => {
  switch (status) {
    case "pending":
      return "Pending"
    case "accepted":
      return "Accepted"
    case "refused":
      return "Cancelled"
  }
}

function dateIsValid(date) {
  return date instanceof Date && !isNaN(date);
}