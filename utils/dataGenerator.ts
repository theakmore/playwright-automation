export function generateRandomEmail(prefix = "akshay") {
  return `${prefix}_${Date.now()}@gmail.com`;
}

export function generateRandomName(prefix = "User") {
  return `${prefix}_${Date.now()}`;
}
