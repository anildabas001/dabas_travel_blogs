import bcrypt from "bcrypt";

export async function encyptPassword (password: string) {
    let saltRounds = parseInt(process.env.SALT_ROUNDS || '10');
    let encryptedPassword = await bcrypt.hash(password, saltRounds);
    return encryptedPassword;
}

export async function comparePassword (hash: string, newPassword: string) {
    let encryptedPassword = await bcrypt.compare(newPassword, hash);
    return encryptedPassword;
}