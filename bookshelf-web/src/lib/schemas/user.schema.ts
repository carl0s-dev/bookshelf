import zod from "zod";

export type FormState =
  | {
      message: string;
    }
  | {
      error: string;
      message: string;
      data?: {
        username?: string;
        password?: string;
      };
    }
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      data?: {
        username?: string;
        password?: string;
      };
      message?: string;
    }
  | undefined;

const USERNAME_MESSAGE =
  "O nome de usuário deve ter de 3 a 36 caracteres alfanúmericos.";
const PASSWORD_MESSAGE = "A senha deve ter de 8 a 256 caracteres.";

const UserSchema = zod.object({
  username: zod
    .string()
    .min(3, USERNAME_MESSAGE)
    .max(36, USERNAME_MESSAGE)
    .regex(/^[a-zA-Z0-9]*$/g, USERNAME_MESSAGE),
  password: zod.string().min(8, PASSWORD_MESSAGE).max(256, PASSWORD_MESSAGE),
});

export { UserSchema };
