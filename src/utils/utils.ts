export const getBase64 = (file: File) => {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// source: https://stackoverflow.com/questions/7033639/split-large-string-in-n-size-chunks-in-javascript
export function splitBase64IntoChunks(
  base64: string | ArrayBuffer | null,
  maxBytes: number
): string[] {
  if (typeof base64 === 'string') {
    const re = new RegExp(`.{1,${maxBytes}}`, 'g');
    const chunks = base64.match(re);

    if (chunks) {
      return chunks;
    }
  }

  return [];
}

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

export const validateText = (txt: string, rgx: string): boolean => {
  const regex = new RegExp(rgx);
  return regex.test(txt);
};
