const swaggerUi = require("swagger-ui-express");
const config = require("./config");
const { SwaggerTheme, SwaggerThemeNameEnum } = require("swagger-themes");

const theme = new SwaggerTheme();

// Constants dengan message yang lebih descriptive
const API_CONSTANTS = {
  REQUIRED_QUERY: "Input pertanyaan atau perintah untuk AI",
  REQUIRED_URL: "Masukkan URL target yang valid",
  REQUIRED_PROMPT: "Masukkan instruksi khusus untuk AI",
  SUCCESS_RESPONSE: "Permintaan berhasil diproses",
  ERROR_RESPONSE: "Terjadi kesalahan dalam pemrosesan"
};

// Enhanced options dengan fitur tambahan
const options = {
  customSiteTitle: `${config.options.webName} | API Documentation`,
  customfavIcon: config.options.favicon,
  customJs: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
    // Custom script untuk enhancement
    `
    <script>
      // Auto focus search box
      document.addEventListener('DOMContentLoaded', function() {
        const searchInput = document.querySelector('.swagger-ui .opblock-tag-section input');
        if (searchInput) {
          searchInput.placeholder = '🔍 Cari endpoint...';
          searchInput.focus();
        }
        
        // Add custom header
        const header = document.createElement('div');
        header.innerHTML = '<div style="padding: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; font-weight: bold;">🚀 ${config.options.name} - Powerful AI API</div>';
        document.querySelector('.swagger-ui').prepend(header);
      });
    </script>
    `
  ],
  customCss: `
    ${theme.getBuffer(SwaggerThemeNameEnum.DARK)}
    
    /* Custom Enhancements */
    .topbar { display: none; }
    
    /* Modern Gradient Background */
    .swagger-ui { 
      background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
      min-height: 100vh;
    }
    
    /* Card Styling */
    .opblock { 
      border-radius: 12px !important;
      margin-bottom: 16px !important;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important;
      border: 1px solid #333 !important;
    }
    
    /* Tag Styling */
    .opblock-tag { 
      font-size: 18px !important;
      font-weight: bold !important;
      padding: 15px !important;
      border-left: 4px solid #764ba2 !important;
    }
    
    /* Button Enhancement */
    .btn { 
      border-radius: 8px !important;
      transition: all 0.3s ease !important;
    }
    
    .btn:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3) !important;
    }
    
    /* Response Area */
    .responses-table { 
      border-radius: 8px !important;
    }
    
    /* Parameter Styling */
    .parameters { 
      background: rgba(255,255,255,0.05) !important;
      border-radius: 8px !important;
      padding: 10px !important;
    }
  `,
  swaggerOptions: {
    displayRequestDuration: true,
    persistAuthorization: true,
    docExpansion: 'list',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    defaultModelsExpandDepth: 2,
    defaultModelExpandDepth: 2,
    tryItOutEnabled: true
  }
};

// Enhanced Swagger Document dengan metadata lengkap
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: config.options.name,
    description: `
# ${config.options.name}

${config.options.description}

## 🚀 Fitur Utama

- **AI Chat Interface** - Berinteraksi dengan berbagai model AI
- **Real-time Processing** - Pemrosesan data secara real-time
- **RESTful API** - Standar API yang mudah diintegrasikan

## 📚 Kategori API

- **AI** - Endpoint untuk Artificial Intelligence
- **Downloader** - Tools download konten (coming soon)
- **Tools** - Utilities tambahan (coming soon)

## 🔐 Authentication

API ini menggunakan sistem autentikasi sederhana. Hubungi developer untuk mendapatkan akses.

**Developer**: ${config.options.developer}
    `,
    version: "1.0.0",
    contact: {
      name: "API Support",
      email: "support@example.com",
      url: "https://github.com/your-repo"
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT"
    },
    "x-logo": {
      url: config.options.favicon,
      backgroundColor: "#FFFFFF",
      altText: config.options.name
    }
  },
  servers: [
    {
      url: config.host.BASE_URL,
      description: "Production Server"
    },
    {
      url: "http://localhost:3000",
      description: "Development Server"
    }
  ],
  tags: [
    {
      name: "AI",
      description: "🤖 Endpoint untuk Artificial Intelligence dan Machine Learning",
      "x-icon": "🤖"
    },
    {
      name: "Downloader",
      description: "📥 Tools download konten dari berbagai platform",
      "x-icon": "📥"
    },
    {
      name: "Tools",
      description: "🛠️ Utilities dan tools pendukung",
      "x-icon": "🛠️"
    }
  ],
  paths: {
    "/api/ai/chatgpt": {
      get: {
        tags: ["AI"],
        summary: "💬 Chat dengan GPT AI",
        description: "Berinteraksi dengan model GPT untuk percakapan natural",
        parameters: [
          {
            in: "query",
            name: "query",
            schema: {
              type: "string",
              minLength: 1,
              maxLength: 1000
            },
            required: true,
            description: API_CONSTANTS.REQUIRED_QUERY,
            example: "Apa itu artificial intelligence?"
          }
        ],
        responses: {
          200: {
            description: API_CONSTANTS.SUCCESS_RESPONSE,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: true
                    },
                    developer: {
                      type: "string",
                      example: config.options.developer
                    },
                    timestamp: {
                      type: "string",
                      format: "date-time",
                      example: new Date().toISOString()
                    },
                    execution_time: {
                      type: "number",
                      example: 1.23
                    },
                    result: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Halo! Saya AI assistant. Ada yang bisa saya bantu?"
                        },
                        tokens_used: {
                          type: "number",
                          example: 150
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: API_CONSTANTS.ERROR_RESPONSE,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: false
                    },
                    error: {
                      type: "string",
                      example: "Parameter query diperlukan"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/ai/gptlogic": {
      get: {
        tags: ["AI"],
        summary: "🧠 GPT dengan Logic Processing",
        description: "GPT dengan kemampuan pemrosesan logika dan instruksi khusus",
        parameters: [
          {
            in: "query",
            name: "query",
            schema: {
              type: "string",
              minLength: 1
            },
            required: true,
            description: API_CONSTANTS.REQUIRED_QUERY,
            example: "Jelaskan konsep blockchain"
          },
          {
            in: "query",
            name: "prompt",
            schema: {
              type: "string",
              enum: ["analisis", "ringkas", "jelaskan", "terjemahkan"]
            },
            required: true,
            description: API_CONSTANTS.REQUIRED_PROMPT,
            example: "jelaskan"
          }
        ],
        responses: {
          200: {
            description: API_CONSTANTS.SUCCESS_RESPONSE,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: true
                    },
                    developer: {
                      type: "string",
                      example: config.options.developer
                    },
                    timestamp: {
                      type: "string",
                      format: "date-time"
                    },
                    execution_time: {
                      type: "number",
                      example: 2.45
                    },
                    result: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Blockchain adalah teknologi ledger terdistribusi..."
                        },
                        prompt_type: {
                          type: "string",
                          example: "jelaskan"
                        },
                        complexity: {
                          type: "string",
                          enum: ["low", "medium", "high"],
                          example: "medium"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          status: {
            type: "boolean",
            example: false
          },
          error: {
            type: "string",
            example: "Error message description"
          },
          code: {
            type: "integer",
            example: 400
          }
        }
      },
      SuccessResponse: {
        type: "object",
        properties: {
          status: {
            type: "boolean",
            example: true
          },
          developer: {
            type: "string"
          },
          timestamp: {
            type: "string",
            format: "date-time"
          },
          execution_time: {
            type: "number"
          }
        }
      }
    }
  },
  "x-metadata": {
    generated: new Date().toISOString(),
    version: "2.0",
    author: config.options.developer
  }
};

module.exports = { swaggerDocument, options };
