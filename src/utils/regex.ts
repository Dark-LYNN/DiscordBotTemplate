export const colorRegex = /^#([0-9A-F]{6})$/i; // Regex For Hex Colors
export const userIdRegex = /^[0-9]+$/; // Regex For DiscordIDs
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regex For Emails
export const isValidImageURL = /\.(jpeg|jpg|gif|png|webp)$/i; // Regex For Images
export const ipAddressRegex = /^(?:\d{1,3}\.){3}\d{1,3}$/; // Regex For IPV4Addresses
export const UuidRegex =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/; // Regex for UUIDs
export const UrlRegex =
  /^(https?:\/\/)?([\w.-]+\.[a-z]{2,5})(:\d{1,5})?(\/.*)?$/i; // Regex for URLs
