import JSZip from "jszip";
import mime from "mime";

/**
 * Base 64 file information (content type and content).
 */
export type Base64FileInfo = {
  base64: string,
  mime: string,
  type: "file" | "directory",
  name: string,
}

/**
 * Base 64 file tree.
 */
export type Base64FileInfoTree = {
  base64?: string,
  mime?: string,
  type: "file" | "directory",
  name: string,
  childrens: Base64FileInfoTree[],
}

/**
 * Downloads the given base64 file by encoding it with the good mime type.
 * 
 * @param file The file to download.
 */
export function downloadBase64(file: Base64FileInfo): void {
  const a = document.createElement("a");
  a.href = "data:" + file.mime + ";base64," + file.base64;
  a.download = file.name
  a.click()
}

export function zipFilesAndDownload(base64files: Base64FileInfoTree[]) {
  const addToZip = (zip: JSZip, item: Base64FileInfoTree) => {
    if (item.type === 'directory') {
      const folder = zip.folder(item.name);
      item.childrens.forEach((child) => addToZip(folder!, child));
    } else if (item.type === 'file') {
      zip.file(item.name + "." + mime.getExtension(item.mime!), item.base64, { base64: true });
    }
  }

  const zip = new JSZip();
  base64files.forEach((item) => addToZip(zip, item));
  zip.generateAsync({ type: 'blob' }).then((blob) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = base64files[0].name + ".zip";
    link.click();
  });
}