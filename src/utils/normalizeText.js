export default function normalizeText(text = ""){
    if (text === null || text === undefined) return ""
    return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}