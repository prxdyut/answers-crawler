export default async (imageUrl: string): Promise<string | null> => {
  const removeBackground = (ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (r === 255 && g === 255 && b === 255) {
        data[i + 3] = 0;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  };

  const filterColors = (ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );
    const data = imageData.data;
    const colorsToRemove = ["#e5e5e5", "#f5f5f5", "#dcdcdc", "#d5d5d5"];
    const tolerance = 25;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      for (let j = 0; j < colorsToRemove.length; j++) {
        const color = hexToRgb(colorsToRemove[j]);
        if (
          Math.abs(r - color.r) < tolerance &&
          Math.abs(g - color.g) < tolerance &&
          Math.abs(b - color.b) < tolerance
        ) {
          data[i + 3] = 0;
          break;
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
  };

  const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#/, "");
    const bigint = parseInt(hex, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const img = new Image();
    img.src = URL.createObjectURL(blob);

    return new Promise((resolve, reject) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          removeBackground(ctx);
          filterColors(ctx);
          canvas.toBlob((blob) => {
            const blobUrl = URL.createObjectURL(blob as Blob);
            resolve(blobUrl);
          });
        } else {
          reject(new Error("Failed to get canvas context"));
        }
      };
    });
  } catch (error) {
    console.error("Error loading image:", error);
    return null;
  }
};
