export const request = async (API, type, data) => {
  console.log(data);
  return await fetch(API,{
    method: type,
    headers: {
      "Content-Type": "application/json",
      },
    credentials: "include",
    body: JSON.stringify(data)
  });
} 