interface Body {
  [key: string]: string;
}

export default function checkBody(body: Body, keys: string[]): boolean {
  let isValid: boolean = true;

  for (const field of keys) {
    if (!body[field] || body[field] === '') {
      isValid = false;
    }
  }

  return isValid;
}
