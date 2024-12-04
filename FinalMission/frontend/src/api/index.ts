const url = `${process.env.NEXT_PUBLIC_API_URL}/api`;

interface LoginParams {
  body: Record<string, unknown>;
  rota: string;
  method?: string
}

export async function Api({ body, rota, method = "GET" }: LoginParams): Promise<any> {
  
  console.log("body: \n", body);
  
  try {
    const res = await fetch(`${url}/${rota}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = await res.json();
    console.log("response: \n", response);

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }

    return await response;
  } catch (error) {
    console.error("error on request: ",error);
    throw error;
  }
}


export async function GetApi(rota : string, id : string): Promise<any> {
  
  try {
    const res = await fetch(`${url}/${rota}/${id}`, {
      method : "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    console.log("response: \n", response);

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }

    return await response;
  } catch (error) {
    console.error("error on request: ",error);
    throw error;
  }
}
