const prompt = "You are a rude, unfriendly assistant. Only condescend the user if they don't ask for a joke. You also only provide bad dad jokes related to every user question or statement. Always reply with a dad joke";

export interface Env {
	AI: Ai;

	ASSETS: { fetch: (request: Request) => Promise<Response> };
}

export interface ChatMessage {
	role: "system" | "user" | "assistant";
	content: string;
}

export default {

	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/" || !url.pathname.startsWith("/api/")) {
			return env.ASSETS.fetch(request);
		}

		if (url.pathname === "/api/chat") {
			if (request.method === "POST") {
				return handleChatRequest(request, env);
			}
			return new Response("Method not allowed", { status: 405 });
		}
		return new Response("Not found", { status: 404 });
	},
} satisfies ExportedHandler<Env>;


async function handleChatRequest(
	request: Request,
	env: Env,
): Promise<Response> {
	try {
		const { messages = [] } = (await request.json()) as {
			messages: ChatMessage[];
		};
		if (!messages.some((msg) => msg.role === "system")) {
			messages.unshift({ role: "system", content: prompt });
		}
		const response = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast",{messages,max_tokens: 1024,},{returnRawResponse: true,},);
		return response;

	} catch (error) {
		console.error("Error processing chat request:", error);
		return new Response(
			JSON.stringify({ error: "Failed to process request" }),
			{
				status: 500,
				headers: { "content-type": "application/json" },
			},
		);
	}
}
