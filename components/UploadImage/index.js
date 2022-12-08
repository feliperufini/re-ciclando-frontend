import { useRef, useEffect } from "react";

export default function UploadImage({
  className = '',
  setImage,
  imagePreview,
  imagePreviewClassName = '',
  onReferenceSet
}) {
  const referenceInput = useRef(null);

  useEffect(() => {
    if (!onReferenceSet) {
      return;
    }

    onReferenceSet(referenceInput?.current);
  }, [referenceInput?.current]);

  const openInputImage = () => {
    referenceInput?.current?.click();
  }

  const onUpdateImage = () => {
    if (!referenceInput?.current?.files?.length) {
      return;
    }

    const file = referenceInput?.current?.files[0];
    getUrlImageState(file);
  }

  const getUrlImageState = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      setImage({
        preview: fileReader.result,
        file
      });
    }
  }

  return (
    <div className={`uploadImagemContainer ${className}`}
      onClick={openInputImage}
    >
      {imagePreview && (
        <div className="imagePreviewContainer">
          <img
            src={imagePreview}
            alt="Imagem"
            className={imagePreviewClassName}
          />
        </div>
      )}

      <input
        type="file"
        className="hidden"
        accept="image/*"
        ref={referenceInput}
        onChange={onUpdateImage}
      />
    </div>
  );
}