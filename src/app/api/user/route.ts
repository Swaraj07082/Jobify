import db from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

const formSchema = z.object({
  username: z
    .string()
    .refine((value) => value.length > 0, {
      message: "Please enter your username",
    })
    .refine((value) => value.length >= 2, {
      message: "Minimum 2 characters required",
    }),
  email: z.string().email().min(1, {
    message: "This field has to be filled.",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password must be at most 32 characters long" })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Password must contain at least one number",
    })
    .refine((value) => /[^A-Za-z0-9]/.test(value), {
      message: "Password must contain at least one special character",
    }),
});

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const { username, email, password } = formSchema.parse(body);

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this Email Already Exists",
        },
        {
          status: 409,
        }
      );
    }

    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this Username Already Exists",
        },
        {
          status: 409,
        }
      );
    }

    const hashedpassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username: username,
        email: email,
        password: hashedpassword,
      },
    });

    const { password: newUserpassowrd, ...rest } = newUser;
    return new NextResponse(
      JSON.stringify({ user: rest, message: "User created successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 400 }
    );
  }
};
