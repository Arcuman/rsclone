const isUUID = async uuidStr => {
  const pattern =
    '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$';
  if (uuidStr.match(pattern) === null) {
    return false;
  }
  return true;
};

module.exports = {
  isUUID,
};
