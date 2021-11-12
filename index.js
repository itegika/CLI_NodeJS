const {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} = require("./contacts");
const { program } = require("commander");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
console.log(argv);

(async () => {
  const { action, id, name, email, phone } = argv;
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log(contacts);
      break;
    case "get":
      const contact = await getContactById(id);
      if (!contact) {
        console.log(`Contact with id=${id} doesn't exists`);
        break;
      }
      console.log(contact);
      break;
    case "add":
      if (!name || !email || !phone) {
        console.log("please, fill contact's name, email and phone");
        break;
      }
      const newContact = await addContact({
        name,
        email,
        phone,
      });
      console.log(newContact);
      break;
    case "remove":
      const contact = await removeContact(id);
      if (!contact) {
        console.log(`Contact list doesn't include any contact with id = ${id}`);
        break;
      }
      console.log(contact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
})();
