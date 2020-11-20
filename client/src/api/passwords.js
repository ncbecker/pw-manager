export async function getPassword(passwordName) {
  const response = await fetch(`/api/passwords/${passwordName}`);
  const password = response.text();
  return password;
}

export async function deletePassword(passwordName) {
  await fetch(`/api/passwords/${passwordName}`, {
    method: "DELETE",
  });
}
export async function postPassword(passwordObject) {
  await fetch("/api/passwords", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(passwordObject),
  });
}
