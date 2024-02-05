import { hashPassword, passwordMatches } from "../utils/bcrypt";

describe("Test ./utils functions", () => {
    describe("test hashPassoword", () => {
        test("It should hash the password", async () => {
            const password = "password";
            const hashedPassword = await hashPassword(password);

            expect(hashedPassword).toBeDefined();
            expect(hashedPassword).not.toEqual(password);
        });

        test("The hashed passwords should be different", async () => {
            const password1 = "password1";
            const password2 = "password2";

            const hashedPassword1 = await hashPassword(password1);
            const hashedPassword2 = await hashPassword(password2);

            expect(hashedPassword1).not.toEqual(hashedPassword2);
        })

        test("The hashed passwords should be the different", async () => {
            const password1 = "password";
            const password2 = "password";

            const hashedPassword1 = await hashPassword(password1);
            const hashedPassword2 = await hashPassword(password2);

            expect(hashedPassword1).not.toEqual(hashedPassword2);
        })
    });

    describe("test passwordMatches", () => {
        test('It should return true for a match', async () => {
            const password = "passoword";
            const hashedPassword = await hashPassword(password);
            const isMatch = await passwordMatches(password, hashedPassword);

            expect(isMatch).toBe(true);
        });

        test("It should return false if passoword passed is not the hashed one", async () => {
            const password = "passoword";
            const wrong_password = "wrong_password";
            const hashedPassword = await hashPassword(password);
            const isMatch = await passwordMatches(wrong_password, hashedPassword);

            expect(isMatch).toBe(false);
        });
    });
});

