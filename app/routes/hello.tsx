import {ActionFunction, data, LoaderFunction, redirect} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { generateCsrfToken, verifyCsrfToken } from "~/utils/csrf.server";

// CSRFを実装するときのサンプルだが実際はCSRFトークンを実装する必要があるのは脆弱生診断を通すためだけ
// これを残してるのは本当にただのサンプルとして残してるだけ
// CSRFトークン発行（セッションに保存 & cookie送信）
export const loader: LoaderFunction = async ({ request }) => {
    const { token, setCookie } = await generateCsrfToken(request);
    console.log("token:", token);

    return data(
        { message: "こんにちは！名前を入力してください", csrfToken: token },
        { headers: { "Set-Cookie": setCookie } }
    );
};

// フォーム送信＆トークン検証
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const submittedToken = formData.get("csrfToken")?.toString() ?? null;
    console.log("submittedToken:", submittedToken);
    const name = formData.get("name");

    await verifyCsrfToken(request, submittedToken);

    // トークンが正しければ処理続行
    console.log("名前:", name);
    return redirect("/thanks");
};

// フロントUI
export default function HelloPage() {
    const { message, csrfToken } = useLoaderData<typeof loader>();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">{message}</h1>
                <Form method="post" className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            名前
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    {/*これ大事*/}
                    <input type="hidden" name="csrfToken" value={csrfToken} />
                    <div>
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            送信
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
