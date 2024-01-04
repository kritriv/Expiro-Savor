const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "Username must be required!" })
    .trim()
    .min(4, { message: "Username must be at least 4 characters." })
    .max(16, { message: "Username cannot be more than 16 characters." }),

  email: z
    .string({ required_error: "Email must be required!" })
    .email({ message: "Invalid email format!" }),

  password: z
    .string({ required_error: "Password must be required!" })
    .min(6, { message: "Password must be at least 6 characters." })
    .max(12, { message: "Password cannot be more than 12 characters." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/, {
      message: "Password must have at least 1 of each: lowercase, uppercase, number, and special character.",
    }),

  role: z
    .string()
    .refine(
      (value) => ["admin", "user", "donar"].includes(value.toLowerCase()),
      {
        message: "Invalid role provided!",
      }
    )
    .optional(),
});

const signinSchema = z.object({
  email: z
    .string({ required_error: "Email must be required!" })
    .email({ message: "Invalid email format!" }),

  password: z
    .string({ required_error: "Password must be required!" })
    .min(6, { message: "Password must be at least 6 characters." })
    .max(12, { message: "Password cannot be more than 12 characters." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/, {
      message: "Password must have at least 1 of each: lowercase, uppercase, number, and special character.",
    }),

});

module.exports = {signupSchema, signinSchema};
