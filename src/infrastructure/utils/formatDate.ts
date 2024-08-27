export function formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-').map(Number);

    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    return `${months[month - 1]} ${day}, ${year}`;
}


export function getYearFromDate (dateString: string): string {
    const yearMatch = dateString.match(/\d{4}$/);
    return yearMatch ? yearMatch[0] : 'Unknown';
  };