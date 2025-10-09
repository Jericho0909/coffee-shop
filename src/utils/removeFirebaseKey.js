export default function removeFireBaseKey(obj) {
  const { firebaseKey, ...safeData } = obj
  return safeData
}