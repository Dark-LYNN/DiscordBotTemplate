export const colorRegex = /^#([0-9A-F]{6})$/i;                                                                                                // Regex For Hex Colors
export const userIdRegex = /^[0-9]+$/;                                                                                                        // Regex For DiscordIDs
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;                                                                 // Regex For Emails
export const isValidImageURL = /\.(jpeg|jpg|gif|png|webp)$/i;                                                                                 // Regex For Images
export const ipAddressRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;    // Regex For IPAddresses
export const UuidRegex = /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/;                                 // Regex For UUID's
export const UrlRegex = /^(https?:\/\/)?([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5})(:[0-9]{1,5})?(\/.*)?$/;                                  // Regex For URL's