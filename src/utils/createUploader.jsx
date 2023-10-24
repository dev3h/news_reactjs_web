import uploadImage from "./uploadImage";
function uploader(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return uploadImage(loader);
    };
}

export default uploader;
