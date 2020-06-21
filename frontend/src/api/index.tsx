type Response = { data?: any; error?: any };

export async function fetchPreview(text: string): Promise<Response> {
  console.log(text);
  return {
    data: {
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  };
}
