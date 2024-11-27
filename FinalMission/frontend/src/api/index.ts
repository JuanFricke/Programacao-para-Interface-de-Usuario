const url = `${process.env.NEXT_PUBLIC_API_URL}/api`;

interface LoginParams {
  body: Record<string, unknown>;
  rota: string;
  method?: string
}

export async function Api({ body, rota, method = "GET" }: LoginParams): Promise<any> {
  try {
    const res = await fetch(`${url}/${rota}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
}
