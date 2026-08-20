import html2canvas from "html2canvas";

const SavedAsImage = ({ targetId }) => {
  const handleSaveAsImage = async () => {
    try {
      const element = document.getElementById(targetId);

      if (!element) {
        console.error("Gift element not found");
        return;
      }

      const canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#fff",
        scale: 2,
      });

      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");

      link.download = "BloomWish-Gift.png";
      link.href = image;

      link.click();
    } catch (error) {
      console.error(
        "Unable to save BloomWish gift:",
        error
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleSaveAsImage}
      className="mt-8 px-6 py-3 rounded-full bg-white shadow-md hover:scale-105 transition"
    >
      Save as Image
    </button>
  );
};

export default SavedAsImage;