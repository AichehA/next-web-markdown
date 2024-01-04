/**
 * Transforme le total des minutes en format heures et minutes
 * @param minutes Le total des minutes
 * @returns Les valeurs heures et minutes
 */
const getHoursMinutes = (minutes: string) => {
  let minutesRest = 0;
  let hours = 0;

  if (minutes !== null && minutes !== undefined) {
    let minutesRound = Math.round(Number(minutes));
    minutesRest = minutesRound % 60;
    hours = (minutesRound - minutesRest) / 60;
  }

  return {
    hours,
    minutesRest,
  };
};

/**
 * Retour en format numérique
 * @param minutes Le total des minutes
 * @returns Format XhXX
 */
export const useReadingTimeToNumeric = (minutes: string) => {
  const { hours, minutesRest } = getHoursMinutes(minutes);

  const minutesDisplay = (minutesRest < 10 ? "0" : "") + minutesRest.toString();

  return `${hours}h${minutesDisplay}`;
};

/**
 * Retour en format texte
 * @param minutes Le total des minutes
 * @returns Format X heures et X minutes OU X minutes
 */
export const useReadingTimeToText = (minutes: string) => {
  const { hours, minutesRest } = getHoursMinutes(minutes);

  let result = "";

  if (hours !== 0 && minutesRest !== 0) {
    result = `${hours} heures et ${minutesRest} minutes`;
  } else if (hours === 0 && minutesRest >= 0) {
    result = `${minutesRest} minutes`;
  }

  return result;
};
