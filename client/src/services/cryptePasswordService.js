const bcrypt = require('bcryptjs');

export const cryptePassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(password, " -> ", hashedPassword);
    return hashedPassword;
}
