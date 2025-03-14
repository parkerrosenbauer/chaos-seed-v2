export function cleanName(name: string) {
  return name
    .replace(/[^a-zA-Z\s]/g, '')
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
