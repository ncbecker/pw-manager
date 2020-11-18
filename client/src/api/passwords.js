export async function getPassword(passwordName) {
  const response = await fetch(`/api/passwords/${passwordName}`);
  const password = response.text();
  return password;
}
