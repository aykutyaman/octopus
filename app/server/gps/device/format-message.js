/**
 * Given a message, it removes spaces
 */
export const formatMessage = message => {
  return message.toLowerCase().replace(/ /g,"");
};
