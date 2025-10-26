// schema/endpoint.js
const fs = require("fs");
const path = require("path");

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Ditss Base API",
    version: "1.0.0",
    description:
      "Dokumentasi resmi untuk Base API Ditss. Semua endpoint publik dan tools tersedia di sini.",
    contact: {
      name: "Ditss Developer",
      url: "https://ditss.biz.id",
      email: "support@ditss.biz.id",
    },
  },
  servers: [
    {
      url: "https://base-api.ditss.biz.id",
      description: "Production Server",
    },
    {
      url: "http://localhost:3000",
      description: "Local Development Server",
    },
  ],
  paths: {},
};

// otomatis scan semua endpoint di folder router/api
try {
  const apiDir = path.join(__dirname, "../router/api");
  const files = fs.readdirSync(apiDir);

  files.forEach((file) => {
    const name = file.replace(".js", "");
    const routePath = `/api/${name}`;
    swaggerDocument.paths[routePath] = {
      get: {
        summary: `GET ${routePath}`,
        description: `Endpoint otomatis untuk ${name}`,
        responses: {
          200: {
            description: "Berhasil mengambil data",
          },
        },
      },
    };
  });
} catch (err) {
  console.error("⚠️ Gagal membaca folder router/api:", err.message);
}

const options = {
  explorer: true,
  customCss: `
    .swagger-ui .topbar { background-color: #007bff; }
    .swagger-ui .topbar .link span { color: white; }
  `,
  customSiteTitle: "Ditss API Playground",
  customfavIcon:
    "https://cdn.ditss.biz.id/assets/logo/ditss-api.png",
};

module.exports = { swaggerDocument, options };
