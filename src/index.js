import express from "express";
import pdf from "html-pdf";
import ejs from "ejs";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  ejs.renderFile(
    "./templates/index.ejs",
    { name: "Render PDF" },
    (err, html) => {
      if (err) {
        return res.status(500).json({ message: "Server Error." });
      }

      const options = {
        format: "A4",

        border: {
          right: "8",
        },
      };

      pdf
        .create(html, options)
        .toFile("./uploads/receipt.pdf", (error, response) => {
          try {
            return res.status(200).json({ message: "PDF Generation: OK" });
          } catch (err) {
            return res.status(500).json({ message: "Failed!" });
            console.log(err);
          }
        });
    }
  );
});

app.get("/download", (req, res) => {
  res.type("pdf");
  res.download("./uploads/report.pdf");
});

app.listen(3333);
