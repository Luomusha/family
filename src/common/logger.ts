import {createLogger, format, transports} from "winston";

export const logger = createLogger({
  defaultMeta: {service: 'family-service'},
  transports: [
    new transports.File({
      filename: 'combined.log',
      format: format.combine(
          format.timestamp(),
          format.splat(),
          format.json(),
      ),
      level: "warn"
    }),
    new transports.Console({
      format: format.combine(
          format.colorize(),
          format.timestamp(),
          format.splat(),
          format.simple(),
      ),
    }),
  ],
  exitOnError: true,
})
