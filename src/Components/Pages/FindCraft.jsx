import { useState } from "react";

export default function FindCraft() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [crafts, setCrafts] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleFindCrafts = () => {
    const demoCrafts = [
      {
        id: 1,
        name: "Paper Flower",
        difficulty: "Easy",
        image:
          "https://images.unsplash.com/photo-1586864387789-628af9feed72",
      },
      {
        id: 2,
        name: "Bottle Lamp",
        difficulty: "Medium",
        image:
          "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
      },
    ];

    setCrafts(demoCrafts);
  };

  return (
    <div className="findcraft-container">
      <h1 className="findcraft-title">Find Craft by Materials</h1>
      <p className="findcraft-subtitle">
        Take a photo or upload an image of materials you have
      </p>

      {/* Upload Section */}
      <div className="upload-box">
        <label className="upload-btn">
          📷 Take Photo
          <input
            type="file"
            accept="image/*"
            capture="environment"
            hidden
            onChange={handleImageChange}
          />
        </label>

        <label className="upload-btn">
          🖼 Upload Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </label>
      </div>

      {/* Image Preview */}
      {preview && (
        <div className="preview-box">
          <img src={preview} alt="Preview" className="preview-img" />
        </div>
      )}

      {/* Action Button */}
      <button
        className="find-btn"
        disabled={!preview}
        onClick={handleFindCrafts}
      >
        Find Crafts
      </button>

      {/* Results */}
      {crafts.length > 0 && (
        <div className="results">
          <h2>Suggested Crafts</h2>

          <div className="card-grid">
            {crafts.map((craft) => (
              <div key={craft.id} className="card">
                <img
                  src={craft.image}
                  alt={craft.name}
                  className="card-img"
                />
                <h3>{craft.name}</h3>
                <p>Difficulty: {craft.difficulty}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
