import express, { response } from "express";
import pdf from "html-pdf";
import ejs from "ejs";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  ejs.renderFile(
    "./templates/index.ejs",
    { name: "Barones = Render PDF" },
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
        .toFile("./uploads/report.pdf", (error, response) => {
          if (!error) {
            return res.json({ message: "PDF Generation: OK" });
          } else {
            return res.json({ message: "Failed!" });
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
