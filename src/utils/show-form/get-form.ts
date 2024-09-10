export const getForm = async (formUUID: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/tools/form/form/${formUUID}`;

    const res = await fetch(url, {
      cache: "no-store",
    });

    const contentType = res.headers.get("Content-Type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error("Invalid response type");
    }

    if (res.ok) {
      const data = await res.json();
      return data.data;
    } else {
      throw new Error(`Failed to fetch form: ${res.status} ${res.statusText}`);
    }
  } catch (error: any) {
    if (error.message === "Failed to fetch form: 419 status code 419") {
      return { formClosed: true };
    }
    return { form: null };
  }
};
