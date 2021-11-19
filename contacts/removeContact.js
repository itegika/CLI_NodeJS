const updateContacts = require("./updateContacts");
const listContacts = require("./listContacts");

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === Number(id));
  if (idx === -1) {
    return null;
  }
  const contact = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return contact;
};

module.exports = removeContact;
