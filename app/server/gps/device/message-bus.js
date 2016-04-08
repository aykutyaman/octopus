export const messageBus = ({messageMap, data, formatMessage}) => {
  // XXX: test message that does not exist!
  messageMap[formatMessage(data.message)](data);
};
