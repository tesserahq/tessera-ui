import * as React from "react";

import { format, formatDistanceToNow } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { enUS } from "date-fns/locale";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const DEFAULT_TIMEZONE = "America/New_York";
const DEFAULT_FORMAT = "MMM dd, yyyy HH:mm:ss";

/**
 * Gets the timezone abbreviation (e.g., "PST", "EST")
 */
function getTimezoneAbbreviation(date: Date, timezone: string): string {
  return formatInTimeZone(date, timezone, "zzz", { locale: enUS });
}

function parseDate(date: string | Date): Date {
  let dateToParse = date;
  if (typeof date === "string") {
    const trimmedDate = date.trim();
    // Check if it doesn't already end with 'z' or 'Z' (UTC indicator)
    if (!/[zZ]$/.test(trimmedDate)) {
      dateToParse = trimmedDate + "Z";
    } else {
      dateToParse = trimmedDate;
    }
  }

  return new Date(dateToParse);
}

/**
 * Get the user's local timezone from the browser
 * @returns The timezone string (e.g., "America/New_York")
 */
function getBrowserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    // Fallback to UTC if timezone detection fails
    return DEFAULT_TIMEZONE;
  }
}

interface DateTimeProps {
  date: string | Date;
  formatStr?: string;
  timezone?: string;
  showTimezone?: boolean;
  className?: string;
}

export function formatDateTime(
  date: string | Date,
  formatStr: string = DEFAULT_FORMAT,
  timezone: string,
  showTimezone: boolean = false
): string {
  let timezoneValue = timezone;
  if (!timezone) {
    timezoneValue = getBrowserTimezone();
  }

  // If date is a string without timezone indicator, add 'Z' to indicate UTC
  const parsedDate = parseDate(date);
  const zonedDate = toZonedTime(parsedDate, timezoneValue);
  const formattedDate = format(zonedDate, formatStr);

  if (showTimezone) {
    return `${formattedDate} (${getTimezoneAbbreviation(
      parsedDate,
      timezoneValue
    )})`;
  }

  return formattedDate;
}

export function getRelativeTime(date: Date): string {
  const parsedDate = parseDate(date);

  return formatDistanceToNow(parsedDate, { addSuffix: true, locale: enUS });
}

export function DateTime({
  date,
  formatStr = DEFAULT_FORMAT,
  timezone,
  showTimezone = false,
  className,
}: DateTimeProps) {
  let timezoneValue = timezone;
  if (!timezone) {
    timezoneValue = getBrowserTimezone();
  }

  const formattedDate = formatDateTime(
    date,
    formatStr,
    timezoneValue ?? DEFAULT_TIMEZONE,
    showTimezone
  );

  const parsedDate = parseDate(date);
  const relativeTime = getRelativeTime(parsedDate);
  const utcFormattedDate = formatInTimeZone(parsedDate, "UTC", DEFAULT_FORMAT, {
    locale: enUS,
  });
  const timezoneFormattedDate = formatInTimeZone(
    parsedDate,
    timezoneValue ?? DEFAULT_TIMEZONE,
    DEFAULT_FORMAT,
    {
      locale: enUS,
    }
  );
  const timestamp = parsedDate.getTime();

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <time className={className}>{formattedDate}</time>
        </TooltipTrigger>
        <TooltipContent className="w-full">
          <div className="d-list">
            <div className="d-item justify-between">
              <div className="d-label">UTC</div>
              <div className="d-content">{utcFormattedDate}</div>
            </div>
            <div className="d-item justify-between">
              <div className="d-label">{timezoneValue}</div>
              <div className="d-content">{timezoneFormattedDate}</div>
            </div>
            <div className="d-item justify-between">
              <div className="d-label">Relative</div>
              <div className="d-content">{relativeTime}</div>
            </div>
            <div className="d-item justify-between">
              <div className="d-label">Timestamp</div>
              <div className="d-content">{timestamp}</div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
