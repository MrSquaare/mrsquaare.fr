import { createLogger, format, transports } from "winston";

import { LOGGER_LEVEL } from "../constants";

const formatInfo = format.printf(
  ({ level, message, timestamp, metadata: { error, ...metadata } }) => {
    let formatted = `${timestamp} | ${level} | ${message}`;

    if (error) {
      formatted += "\n\n" + (error.stack || error) + "\n";
    }

    if (metadata && Object.keys(metadata).length > 0) {
      formatted += "\n\nMetadata:\n" + JSON.stringify(metadata, null, 2) + "\n";
    }

    return formatted;
  },
);

export const LOGGER = createLogger({
  level: LOGGER_LEVEL,
  format: format.combine(
    format.metadata({ key: "metadata" }),
    format.timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
    formatInfo,
  ),
  transports: [new transports.Console()],
});
