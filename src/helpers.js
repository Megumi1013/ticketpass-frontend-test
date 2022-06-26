import dayjs from "dayjs"

export const dayjsFormatFromUnix = (timestamp) => {
  return dayjs.unix(timestamp).format("MMMM D, YYYY")
}

export const dayjsFormatToUnix = (date) => {
  return dayjs(date).unix()
}