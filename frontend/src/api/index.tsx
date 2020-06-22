type Response = { data?: any; error?: any };

// @ts-ignore
import CONFIG from "@d33md/config";

async function request(endpoint: string, body?: {}) {
  try {
    const response = await fetch(CONFIG.BACKEND + endpoint, {
      headers: { "Content-Type": "application/json" },
      method: !!body ? "POST" : "GET",
      mode: "cors",
      body: !!body ? JSON.stringify(body) : undefined,
    });
    const json = await response.json();
    return json;
  } catch (e) {
    return { error: e.toString() };
  }
}

export async function fetchPreview(text: string): Promise<Response> {
  const json = await request("/convert", { text: text });
  return json;
}

export function viewUrl(id: string) {
  return CONFIG.BACKEND + "/view/" + id;
}
