import { env } from "$env/dynamic/private";
import { signJWT, signinUser } from "$lib/server/utils";
import { fail, type Actions, redirect } from "@sveltejs/kit";
import { string, object } from "zod";
import type { PageServerLoad } from "./$types";

type FormResponse =
    | {
          name: string;
          password: string;
          email: string;
          error: boolean;
          message: string;
          errors:
              | {
                    name: string[] | undefined;
                    email: string[] | undefined;
                    password: string[] | undefined;
                }
              | undefined;
      }
    | undefined;

function getSigninSchema(isAr: boolean = false) {
    const error = {
        name: {
            invalid_type_error: "إدخال غير صحيح",
            required_error: "الإسم مطلوب",
        },
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
        name: string(isAr ? error.name : undefined)
            .min(3, isAr ? error.minError : undefined)
            .max(18, isAr ? error.maxError : undefined),
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
    signinForm: async ({ request, cookies }) => {
        const lang = cookies.get("lang") ?? "en";
        const signinSchema = getSigninSchema(lang === "ar");
        const formData = await request.formData();
        const name = String(formData.get("name"));
        // TODO: add the logic for the email verification
        // TODO: maybe adding quick login and sign in via gmail or facebook...etc.
        const email = String(formData.get("email"));
        const password = String(formData.get("password"));

        const result = signinSchema.safeParse({ name, email, password });

        let response: FormResponse = {
            name,
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

        try {
            const user = await signinUser({ name, email, password });
            if (!user) {
                // TODO: more repust error handling
                response.error = true;
                response.message = "This email is already signed in.";
                return fail(404, response);
            }
            const userJson = JSON.stringify(user);
            const authToken = await signJWT(
                { sub: userJson },
                { exp: "1h" },
                env.JWT_SECRET
            );
            // TODO: change maxAge in the future
            cookies.set("authToken", authToken, {
                httpOnly: true,
                maxAge: 60 * 60,
                sameSite: "strict",
                path: "/",
            });
        } catch (error) {
            // console.log({ signinError: error });

            response.error = true;
            response.message = "User already exist. try another email address.";
            return fail(500, response);
        }

        throw redirect(303, `/${lang}/`);
    },
};
