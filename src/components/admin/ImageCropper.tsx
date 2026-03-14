import { useState, useRef, useCallback } from "react";
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Crop as CropIcon, Loader2, X, Image as ImageIcon } from "lucide-react";

interface ImageCropperProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  aspectRatio?: number;
  label?: string;
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 80 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}

async function getCroppedImg(image: HTMLImageElement, crop: PixelCrop): Promise<Blob> {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width * scaleX;
  canvas.height = crop.height * scaleY;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0, 0,
    canvas.width,
    canvas.height
  );
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), "image/webp", 0.85);
  });
}

const ImageCropper = ({ value, onChange, folder = "images", aspectRatio, label = "Image" }: ImageCropperProps) => {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [uploading, setUploading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImgSrc(reader.result?.toString() || ""));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height, naturalWidth, naturalHeight } = e.currentTarget;
    const ar = aspectRatio || 16 / 9;
    const initialCrop = centerAspectCrop(width, height, ar);
    setCrop(initialCrop);
    // Also set completedCrop so the button is enabled immediately
    const scaleX = naturalWidth / width;
    const scaleY = naturalHeight / height;
    setCompletedCrop({
      unit: "px",
      x: (initialCrop.x! / 100) * width,
      y: (initialCrop.y! / 100) * height,
      width: (initialCrop.width / 100) * width,
      height: (initialCrop.height! / 100) * height,
    });
  }, [aspectRatio]);

  const handleCropAndUpload = async () => {
    if (!imgRef.current || !completedCrop) return;
    setUploading(true);
    try {
      const blob = await getCroppedImg(imgRef.current, completedCrop);
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.webp`;
      const { error } = await supabase.storage.from("media").upload(fileName, blob, {
        contentType: "image/webp",
        upsert: true,
      });
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("media").getPublicUrl(fileName);
      onChange(urlData.publicUrl);
      setImgSrc("");
      setCrop(undefined);
      setCompletedCrop(undefined);
    } catch (err: any) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
    setImgSrc("");
  };

  return (
    <div className="space-y-3">
      <Label className="text-white/70">{label}</Label>

      {/* Current image preview */}
      {value && !imgSrc && (
        <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-white/5">
          <img src={value} alt="Current" className="w-full h-32 object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button size="sm" variant="ghost" onClick={() => inputRef.current?.click()}
              className="text-white hover:bg-white/20 text-xs">
              <Upload className="w-3 h-3 mr-1" />Replace
            </Button>
            <Button size="sm" variant="ghost" onClick={handleRemove}
              className="text-red-400 hover:bg-red-500/20 text-xs">
              <X className="w-3 h-3 mr-1" />Remove
            </Button>
          </div>
        </div>
      )}

      {/* Upload button when no image */}
      {!value && !imgSrc && (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer hover:border-amber-500/40 transition-colors bg-white/5"
        >
          <ImageIcon className="w-8 h-8 text-white/30 mx-auto mb-2" />
          <p className="text-xs text-white/40">Click to select image</p>
        </div>
      )}

      <input ref={inputRef} type="file" accept="image/*" onChange={onSelectFile} className="hidden" />

      {/* Crop area */}
      {imgSrc && (
        <div className="space-y-3">
          <div className="rounded-xl overflow-hidden border border-white/10 bg-black/30 max-h-64 flex items-center justify-center">
            <ReactCrop crop={crop} onChange={(_, c) => setCrop(c)} onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatio} className="max-h-64">
              <img ref={imgRef} src={imgSrc} alt="Crop" onLoad={onImageLoad}
                className="max-h-64 w-auto" />
            </ReactCrop>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleCropAndUpload} disabled={uploading || !completedCrop}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 text-xs">
              {uploading ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <CropIcon className="w-3 h-3 mr-1" />}
              {uploading ? "Uploading..." : "Crop & Upload"}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => { setImgSrc(""); setCrop(undefined); }}
              className="text-white/60 hover:text-white hover:bg-white/10 text-xs">
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
