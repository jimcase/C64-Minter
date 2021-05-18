export const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const splitBase64 = (
  base64: string | undefined,
  base64Size: number | undefined,
  size: number
) => {
  const chunckArray = [];
  if (base64 && base64Size) {
    // Get num iterations, probably float
    let nChunks = base64Size / size;
    // Get the float part
    const rest = nChunks % 1;

    // Check if there is float part
    let auxIteration = 0;
    if (rest && base64Size >= size) {
      nChunks -= nChunks % 1;
      nChunks += 1;
      auxIteration = 1;
    }
    const base64Length = base64.length;

    let i;
    let o;
    for (i = 0, o = 0; i < nChunks + auxIteration; i += 1, o += size) {
      chunckArray.push(base64.substr(o, size));
    }
    // One more iteration
    if (base64.substr(o, base64Length - o).length > 0) {
      chunckArray.push(base64.substr(o, base64Length - o));
    }
  }

  return chunckArray;
};

export const arrayBufferToString = (buffer: ArrayBuffer): string => {
  return String.fromCharCode.apply(null, Array.from(new Uint8Array(buffer)));
};
export const stringToArrayBuffer = (str: string): ArrayBuffer => {
  const stringLength = str.length;
  const buffer = new ArrayBuffer(stringLength * 2);
  const bufferView = new Uint8Array(buffer);
  for (let i = 0; i < stringLength; i += 1) {
    bufferView[i] = str.charCodeAt(i);
  }
  return buffer;
};
