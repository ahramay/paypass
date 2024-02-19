import dayjs from 'dayjs'


const maxPastYears = 50;
// Calculate the maximum past date
export const maxPastDate = dayjs(new Date())
    .subtract(maxPastYears, 'year')
    .startOf('day')
    .toDate();

// Calculate the maximum future date (which is today)
export const maxFutureDate = dayjs(new Date()).startOf('day').toDate();