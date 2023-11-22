import { env } from "$env/dynamic/private";
import { loginUser, signJWT } from "$lib/server/utils";

import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { object, string } from "zod";

type FormResponse =
    | {
          password: string;
          email: string;
          error: boolean;
          message: string;
          errors:
              | {
                    email: string[] | undefined;
                    password: string[] | undefined;
                }
              | undefined;
      }
    | undefined;

function getSigninSchema(isAr: boolean = false) {
    const error = {
        email: {
            invalid_type_error: "إدخال غير صحيح",
            required_error: "البريد الإلكتروني مطلوب",
        },
        emailMessage: {
            message: "أدخل بريداإلكترونيا صحيحا",
        },
        password: {
            invalid_type_error: "إدخال غير صحيح",
            required_error: "الرمز السري مطلوب",
        },
        minError: {
            message: "عدد الحروف قليل",
        },
        maxError: {
            message: "عدد الحروف كبير جدا",
        },
    };
    const signinSchema = object({
        email: string(isAr ? error.email : undefined)
            .email(isAr ? error.emailMessage : undefined)
            .min(4, isAr ? error.minError : undefined)
            .max(40, isAr ? error.maxError : undefined),
        password: string(isAr ? error.password : undefined)
            .min(8, isAr ? error.minError : undefined)
            .max(40, isAr ? error.maxError : undefined),
    });
    return signinSchema;
}

export const load: PageServerLoad = async ({ cookies }) => {
    const authToken = cookies.get("authToken");
    // TODO: make language dynamic
    if (authToken) throw redirect(303, "/en/");
};

export const actions: Actions = {
    loginForm: async ({ request, cookies }) => {
        const lang = cookies.get("lang") ?? "en";
        const signinSchema = getSigninSchema(lang === "ar");
        const data = await request.formData();
        const email = String(data.get("email"));
        const password = String(data.get("password"));

        const result = signinSchema.safeParse({ email, password });

        let response: FormResponse = {
            password,
            email,
            error: false,
            errors: undefined,
            message: "",
        };
        if (!result.success) {
            // @ts-ignore
            response.errors = result.error.flatten().fieldErrors;
            return fail(403, response);
        }

        const user = await loginUser({ email, password });
        if (!user) {
            response.error = true;
            response.message = "Invalid username or password.";
            return fail(404, response);
        }

        try {
            const userJson = JSON.stringify(user);
            // TODO: change expiration time
            let authToken = await signJWT(
                { sub: userJson },
                { exp: "1h" },
                env.JWT_SECRET
            );
            // TODO: change maxAge in future to month or so
            cookies.set("authToken", authToken, {
                maxAge: 60 * 60,
                httpOnly: true,
                sameSite: "strict",
                path: "/",
            });
        } catch (error) {
            // console.log({ loginError: error });

            response.error = true;
            response.message = "Something went wrong!!!";
            return fail(400, response);
        }

        throw redirect(303, `/${lang}/`);
    },
};
