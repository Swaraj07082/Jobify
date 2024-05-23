import db from "@/lib/db";
import { Hash } from "crypto";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";

// POST and GET name matters
// every type of request like get post has a body headers etc
// In HTTP, the request body is part of the request message carrying data from the client to the server. It's crucial for methods like POST, PUT, and PATCH, used to create, update, or modify resources. For example, in a POST request to create a user account, user details are in the request body

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
    // const idk = await db.job.findMany();
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

// export const GET = async () => {
//   try {
//     const user = await db.user.findMany();

//     return new NextResponse(JSON.stringify(user), { status: 200 });
//   } catch (error) {
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );
//   }
// };
