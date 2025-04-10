import {data, LoaderFunction} from "@remix-run/node";
import { requireUser } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
    const user = await requireUser(request);

    return data({
        message: "Welcome!",
        user, // ← DBアクセスなしでここに含まれる
    });
};