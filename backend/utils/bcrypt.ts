import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
    const saltRounds = 10;
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (err: any) {
        throw err;
    }
}

export const passwordMatches = async (password: string, hash: string) => {
    try {
        const match = await bcrypt.compare(password, hash);
        return match;
    } catch (err: any) {
        throw err;
    }
}