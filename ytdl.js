const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");

// Fungsi untuk mendownload video
async function downloadYouTubeVideo(url, outputDir = "./downloads") {
  try {
    // Validasi URL
    if (!ytdl.validateURL(url)) {
      throw new Error("URL tidak valid.");
    }

    // Ambil info video
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[<>:"/\\|?*]/g, ""); // Format judul
    const outputFile = path.join(outputDir, `${title}.mp4`);

    // Pastikan folder tujuan ada
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Download video
    console.log(`📥 Sedang mendownload: ${title}`);
    ytdl(url, { quality: "highestvideo" })
      .pipe(fs.createWriteStream(outputFile))
      .on("finish", () => {
        console.log(`✅ Download selesai! File disimpan di: ${outputFile}`);
      });
  } catch (err) {
    console.error(`❌ Terjadi kesalahan: ${err.message}`);
  }
}

// Contoh penggunaan
const youtubeURL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Ganti dengan URL video YouTube
downloadYouTubeVideo(youtubeURL);
